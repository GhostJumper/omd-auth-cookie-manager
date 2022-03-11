import  { Request, Response, Router } from "express"
import AuthCookieService from "../service/authCookie/AuthCookieService"

const authCookieRouter = Router()

authCookieRouter.get("/", async (req: Request, res: Response) => {
    try {
        const oldestCookie = await AuthCookieService.getOldestAuthCookie()
        res.json({oldestCookie})

    } catch (error: any) {
        res.status(404).json({error: error.message})
    }

})

export default authCookieRouter