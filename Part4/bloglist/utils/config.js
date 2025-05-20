import { config } from "dotenv";
config()
const PORT = process.env.PORT;
const Mongourl = process.env.MONGODB_URI

export default {PORT, Mongourl}