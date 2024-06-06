import bcrypt from 'bcrypt'
import { IHasher } from '../../domain/infra/criptography/IHasher'

export class EncryptAdapter implements IHasher {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
