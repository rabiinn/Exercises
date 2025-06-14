import User from "../models/user.js";
import { response, Router } from "express";
import bcrypt from 'bcrypt'
const userRouter = Router()

userRouter.get('/', async (request, response, next) => {
    try{
        const users = await User.find({}).populate('blogs', {title: 1, author: 1, id: 1, url: 1})
        response.status(200).json(users)
    }
    catch(error){
        next(error)
    }
})

userRouter.post('/', async (request, response, next) => {
    const { username, password, name} = request.body
    if(username.length < 3 || password.length < 3){
        return response.status(400).json({error: `Username and password are expected to be at least 3 characters long`})
    }

    try{
        const allUsers = await User.find({})
        const usernames = allUsers.map(user => user.username)
        if(usernames.includes(username)){
            return response.status(400).json({error: `Usernames are expected to be unique`})
        }
        
        const SaltRounds = 10
        const passwordHash =  await bcrypt.hash(password,SaltRounds)

        const newUser = new User({
            username,
            name,
            passwordHash
        })

        const savedUser =  await newUser.save()
        response.status(201).json(savedUser)
    }
    catch(error){
        next(error)
    }
})

export default userRouter