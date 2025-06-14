import mongoose from "mongoose";
mongoose.set('strictQuery', false)

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    name: String,
    passwordHash: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

userSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString(),
            delete returnedObject._id
            delete returnedObject.passwordHash
            delete returnedObject.__v
        }
 })

 const User = mongoose.model('User', userSchema)

 export default User