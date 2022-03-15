import  { Request, Response, Router } from "express"
import AuthCookieService from "../service/authCookie/AuthCookieService"
import { Bot } from "../service/database/entity/Bot"

const authCookieRouter = Router()

authCookieRouter.get("/", async (req: Request, res: Response) => {
    try {
        const oldestCookie = await AuthCookieService.getOldestAuthCookie()
        res.json({oldestCookie})

    } catch (error: any) {
        res.status(404).json({error: error.message})
    }

})

authCookieRouter.delete("/", async (req: Request, res: Response) => {
    try {
        const bot = AuthCookieService.removeAuthCookie(await Bot.findByUsername(req.body.username))
        res.json({bot})
    } catch (error: any) {
        res.status(404).json({error: error.message})
    }
})

authCookieRouter.get("/pollnewcookie", async (req: Request, res: Response) => {
    try {
        const bot = await AuthCookieService.pollNewAuthCookie(await Bot.findByUsername(req.body.username))
        res.json({bot})
    } catch (error: any) {
        res.status(404).json({error: error.message})
    }
})

export default authCookieRouter