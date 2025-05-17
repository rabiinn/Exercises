import mongoose from "mongoose"

if(process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3];
const num = process.argv[4];
const url = `mongodb+srv://rabinadk00:${password}@cluster0.xzxqhkq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact',contactSchema);

const contact = new Contact({
    name: `${name}`,
    number: `${num}`
    
})

contact.save().then(result => {
    console.log(`Added ${contact.name} number ${contact.number} to phonebook`);
    // mongoose.connection.close()
})
Contact.find({}).then( result => {
    result.forEach(cont => {
        console.log(cont);
    })
    mongoose.connection.close();
})