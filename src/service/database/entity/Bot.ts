import { model, Schema, Model, Document } from 'mongoose'

interface ICookie {
    authCookie: string
    expires: Date
    lastUsed: Date
}

interface IBot {
    username: string
    password: string
    email: string
    cookie?: ICookie
}

interface BotDocument extends IBot, Document {
    addCookie: (cookie: ICookie) => Promise<BotDocument>
}

interface BotModel extends Model<BotDocument> {
    createBot: (bot: IBot) => Promise<BotDocument>

    findByUsername: (username: string) => Promise<BotDocument>
    findOldestCookieBot: () => Promise<BotDocument>
}

const BotSchema = new Schema<BotDocument>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cookie: {
        type: {
            authCookie: { type: String, required: true },
            expires: { type: Date, required: true },
            lastUsed: { type: Date, required: true }
        },
        required: false
    }
})

BotSchema.statics.createBot = async function (bot: IBot): Promise<BotDocument> {
    return this.create({
        username: bot.username,
        password: bot.password,
        email: bot.email
    })
}

BotSchema.methods.addCookie = async function (cookie: ICookie): Promise<BotDocument> {
    return this.updateOne({
        $set: {
            cookie: {
                authCookie: cookie.authCookie,
                expires: cookie.expires,
                lastUsed: cookie.lastUsed
            }
        }
    })
}

BotSchema.statics.findByUsername = async function (username: string): Promise<BotDocument> {
    return this.findOne({ username })
}

BotSchema.statics.findOldestCookieBot = async function (): Promise<BotDocument> {
    return await this.findOne({}, {}, { sort: { 'cookie.lastUsed': 1 } })
}

const Bot = model<BotDocument, BotModel>('bots', BotSchema)

export { Bot, BotDocument, IBot, ICookie }