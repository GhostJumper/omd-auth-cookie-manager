import { Request, Response, Router } from "express"
import { body, validationResult } from "express-validator"
import AuthCookieService from "../service/authCookie/AuthCookieService"
import BotService from "../service/bot/BotService"
import { IBot } from "../service/database/entity/Bot"

const botRouter = Router()

const botValidator = [
    body('username')
        .exists()
        .withMessage('Username is required')
        .isString()
        .withMessage('Username must be a string')
        .isLength({ min: 1, max: 100 })
        .withMessage('Username must be between 1 and 100 characters long'),

    body('password')
        .exists()
        .withMessage('Password is required')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 10, max: 100 })
        .withMessage('Password must be between 10 and 100 characters long'),

    body('email')
        .exists()
        .withMessage('Email is required')
        .isString()
        .withMessage('Email must be a string')
        .isLength({ min: 5, max: 100 })
        .withMessage('Email must be between 5 and 100 characters long')
        .isEmail()
        .withMessage('Email must be a valid email address')
]

botRouter.post("/", botValidator, async (req: Request, res: Response) => {

    const validation = validationResult(req)

    if (!validation.isEmpty()) {
        const firstError = validation.array()[0]
        res.status(400).json({ error: firstError?.msg })
        return
    }

    try {
        const bot = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }

        const createdBot = await BotService.createBot(bot)
        res.json({ createdBot })

    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }


})

export default botRouter