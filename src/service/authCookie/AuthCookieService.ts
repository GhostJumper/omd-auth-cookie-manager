import mongoose from 'mongoose'
import { Bot } from '../database/entity/Bot'

export default class AuthCookieService {

    static async getOldestAuthCookie(): Promise<string> {
        const bot = await Bot.findOldestCookie()

        if (!bot)
            throw new Error('No oldest Cookie available')
    
        return bot?.cookie?.authCookie

    }

}