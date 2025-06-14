import User from "../models/user.js";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
const loginRouter = Router()


loginRouter.post('/', async (request, response, next) => {
    try{
        const { username, password} = request.body
        const user = await User.findOne({username})

        const correctPassword = user === null? false: bcrypt.compare(password, user.passwordHash)

        if(!(correctPassword && username)){
            return response.status(401).json({ Error: "Username or password invalid"})
        }

        const tokenForUser = {
            username: user.username,
            id: user._id
        }
        const token = jwt.sign(tokenForUser,process.env.SECRET)
        response.status(201).send({token, username: user.username, name: user.name})
    }
    catch(error){
        next(error)
    }
})

export default loginRouter