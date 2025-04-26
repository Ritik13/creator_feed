const express = require('express')
const sequelize_instance = require('./config/database');
const creatorRouter = require('./modules/creator/routes');
const transactionRouter = require('./modules/transaction/transaction.route');
const payoutRouter = require('./modules/payout/payout.route');
const redis = require('./config/redis');
const adminRouter = require('./modules/admin/admin.routes');
const qRouter = require('./modules/q_health/q.route');
const app = express()
app.use(express.json());
app.use('/api' , creatorRouter)
app.use('/api' , transactionRouter)
app.use('/api' , payoutRouter)
app.use('/api' , adminRouter)
app.use('/api' , qRouter)



// DB operations
sequelize_instance.sync({ alter: true }).then(() => console.log('Model is synced'))
sequelize_instance.authenticate()
  .then(() => console.log('✅ DB connected'))
  .catch(err => console.error('❌ DB error:', err));


module.exports  = app
