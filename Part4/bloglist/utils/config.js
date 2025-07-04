import { config } from "dotenv";
config()
const PORT = process.env.PORT;
const Mongourl = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI

export default {PORT, Mongourl}