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
    cookie: ICookie
}

interface BotDocument extends IBot, Document {

}

interface BotModel extends Model<BotDocument> {
    findByUsername: (username: string) => Promise<BotDocument>
    findOldestCookie: () => Promise<BotDocument>
}

const BotSchema = new Schema<BotDocument>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cookie: {
        authCookie: { type: String, required: true },
        expires: { type: Date, required: true },
        lastUsed: { type: Date, required: true }
    }
})

BotSchema.statics.findByUsername = async function (username: string): Promise<BotDocument> {
    return this.findOne({ username })
}

BotSchema.statics.findOldestCookie = async function (): Promise<BotDocument> {
    return this.findOne({}, {}, { sort: { 'cookie.lastUsed': 1 } })
}

const Bot = model<BotDocument, BotModel>('bots', BotSchema)

export { Bot, BotDocument, IBot}