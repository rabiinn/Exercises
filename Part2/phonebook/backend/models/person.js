import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log(`Connecting to ${url}`);

mongoose.connect(url).then( result => {
    console.log('Connected to MongoDB');
})
.catch(error => {
    console.log("Error occured while connecting to MongoDB",error.message);
})

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: 5,
      required: true
    },
    number: {
      type: String,
      minLength: 8,
      validate: {
        validator: function(v) {
          return /^(\d{2,3})-(\d+)$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number! Format should be XXX-YYYYYY`
      },
      required: true
    }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema);

export default Person;
