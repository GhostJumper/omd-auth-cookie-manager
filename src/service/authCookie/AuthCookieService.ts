import { Bot, BotDocument, ICookie } from '../database/entity/Bot'
var basic = require('basic-authorization-header')
var axios = require('axios')
const debug = require('debug')('AuthCookieService')

export default class AuthCookieService {

    static async getOldestAuthCookie(): Promise<string> {
        const bot = await Bot.findOldestCookieBot()
        const cookie = bot?.cookie

        if (cookie && cookie.expires.getTime() < Date.now()) {
            this.pollNewAuthCookie(bot)
            return this.getOldestAuthCookie()
        }

        if (!cookie)
            throw new Error('No Cookie available')

        //This just updates the lastUsed time
        this.addAuthCookie(bot, {
            authCookie: cookie.authCookie,
            expires: cookie.expires,
            lastUsed: new Date(Date.now())
        })

        return cookie?.authCookie

    }

    static async addAuthCookie(bot: BotDocument, cookie: ICookie): Promise<BotDocument> {
        return bot.addCookie(cookie)
    }

    static async removeAuthCookie(bot: BotDocument): Promise<BotDocument> {
        await bot.removeCookie()
        return Bot.findByUsername(bot.username)
    }


    static async pollNewAuthCookie(bot: BotDocument): Promise<BotDocument> {

        var config = {
            method: 'get',
            url: 'https://api.vrchat.cloud/api/1/auth/user',
            headers: {
                'Authorization': basic(bot.username, bot.password)
            }
        }

        const response = await axios(config)
        const result = response.headers['set-cookie'][0]

        const cookie = result.split(';')[0].trim().replace('auth=', '')
        const expires = new Date(Date.parse(result.split(';')[3].trim().replace('Expires=', '')))

        await this.addAuthCookie(bot, {
            authCookie: cookie,
            expires: expires,
            lastUsed: new Date(Date.now())
        })

        return Bot.findByUsername(bot.username)
    }

}