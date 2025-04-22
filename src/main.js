import express from 'express'
import sequelize_instance from './config/database.js';
import userRouter from './routes/auth.js';
import feedRouter from './routes/feed.js';
import adminRouter from './routes/admin.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
export const app = express()
const port = 3000

// middle wares
app.use(express.json())
app.use(errorHandler)
// Auth routes
app.use('/api' ,userRouter)
app.use('/api' ,feedRouter)
app.use('/api' , adminRouter)




// DB operations
sequelize_instance.sync({ alter: true }).then(() => console.log('Model is synced'))
sequelize_instance.authenticate()
  .then(() => console.log('✅ DB connected'))
  .catch(err => console.error('❌ DB error:', err));







// Express App
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
