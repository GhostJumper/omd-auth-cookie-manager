import { IBot, Bot } from "../database/entity/Bot";


export default class BotService {


    static async createBot(bot: IBot): Promise<IBot> {

        const usernameExists = await Bot.exists({ username: bot.username })
        if (usernameExists)
            throw new Error('Bot with username already exists')

        const emailExists = await Bot.exists({ email: bot.email })
        if (emailExists)
            throw new Error('Bot with email already exists')

        return Bot.createBot(bot)
    }

}