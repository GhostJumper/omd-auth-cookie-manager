import mongoose from 'mongoose'
import { Bot, BotDocument, ICookie } from '../database/entity/Bot'

export default class AuthCookieService {

    static async getOldestAuthCookie(): Promise<string> {
        const cookie = await Bot.findOldestCookie()

        if (!cookie)
            throw new Error('No oldest Cookie available')
    
        return cookie?.authCookie
    
    }

    static async addAuthCookie(bot: BotDocument, cookie: ICookie): Promise<BotDocument> {
        return bot.addCookie(cookie)
    }
    
    /*
    static async pollAuthCookie(bot: Bot): Promise<BotDocument> {
        
    }
    */

}