import 'express-session'
declare module 'express-session' {
  interface SessionData {
    nowInMinutes: number
    user: string
  }
}

