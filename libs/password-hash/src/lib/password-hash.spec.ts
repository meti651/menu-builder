import { passwordHash } from './password-hash'

describe('passwordHash', () => {
  it('should work', () => {
    expect(passwordHash()).toEqual('password-hash')
  })
})
