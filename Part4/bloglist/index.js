import express from 'express'
import mongoose from 'mongoose'
import config from './utils/config.js'
import blogRouter from './controllers/blogs.js'
import middleware from './utils/middleware.js'
import logger from './utils/logger.js'

const app = express()

logger.info('connecting to', config.Mongourl)
mongoose.connect(config.Mongourl).then( () => {
    logger.info('connected to MongoDB')
})
.catch ( (error) => {
    logger.error('error connection to MongoDB', error.message)
})
app.use(express.json())

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})