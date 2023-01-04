import prisma from '../../prisma/prisma'
import { authorize } from '../security'
import { Request, Response } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import * as redis from 'redis'

const redisClient = redis.createClient({
  disableOfflineQueue: true
})

const maxWrongAttemptsByIPperDay = 100
const maxConsecutiveFailsByUsernameAndIP = 10

export const limiterSlowBruteByIP = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'login_fail_ip_per_day',
  points: maxWrongAttemptsByIPperDay,
  duration: 60 * 60 * 24,
  blockDuration: 60 * 60 * 24 // Block for 1 day, if 100 wrong attempts per day
})

export const limiterConsecutiveFailsByUsernameAndIP = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'login_fail_consecutive_username_and_ip',
  points: maxConsecutiveFailsByUsernameAndIP,
  duration: 60 * 60 * 24 * 90, // Store number for 90 days since first fail
  blockDuration: 60 * 60 // Block for 1 hour
})

export const getUsernameIPkey = (username: String, ip: String) => `${username}_${ip}`

export async function loginRoute(req: Request, res: Response): Promise<void> {
  const ipAddr = req.ip
  const usernameIPkey = getUsernameIPkey(req.body.email, ipAddr)

  const [resUsernameAndIP, resSlowByIP] = await Promise.all([
    limiterConsecutiveFailsByUsernameAndIP.get(usernameIPkey),
    limiterSlowBruteByIP.get(ipAddr)
  ])

  let retrySecs = 0

  if (resSlowByIP !== null && resSlowByIP.consumedPoints > maxWrongAttemptsByIPperDay) {
    retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1
  } else if (resUsernameAndIP !== null && resUsernameAndIP.consumedPoints > maxConsecutiveFailsByUsernameAndIP) {
    retrySecs = Math.round(resUsernameAndIP.msBeforeNext / 1000) || 1
  }

  if (retrySecs > 0) {
    res.set('Retry-After', String(retrySecs))
    res.status(429).send('Too Many Requests')
  } else {
    const user = authorize(req.body.email, req.body.password)
    if (!user.isLoggedIn) {
      // Consume 1 point from limiters on wrong attempt and block if limits reached
      try {
        const promises = [limiterSlowBruteByIP.consume(ipAddr)]
        if (user.exists) {
          // Count failed attempts by Username + IP only for registered users
          promises.push(limiterConsecutiveFailsByUsernameAndIP.consume(usernameIPkey))
        }

        await Promise.all(promises)

        res.status(400).end('email or password is wrong')
      } catch (rlRejected: any) {
        if (rlRejected instanceof Error) {
          throw rlRejected
        } else {
          res.set('Retry-After', String(Math.round(rlRejected.msBeforeNext / 1000)) || '1')
          res.status(429).send('Too Many Requests')
        }
      }
    }

    if (user.isLoggedIn) {
      if (resUsernameAndIP !== null && resUsernameAndIP.consumedPoints > 0) {
        await limiterConsecutiveFailsByUsernameAndIP.delete(usernameIPkey)
      }
      req.session!.user = res.end('authorized')
    }
  }
}

export const isAuthorized = async (req: Request, res: Response) => {
  if (req.session == null) {
    return false
  }
  const user = await prisma.user.findUnique({
    where: {
      id: req.session.user
    }
  })
  if (user) {
    return true
  }
  return false
}
