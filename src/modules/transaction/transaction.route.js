const express = require('express');
const {createTransaction, getAllTransactionsForCreator} = require('./transaction.controller');
const transactionRouter = express.Router();
// getAllTransactions , getAllTransactions , getAllTransactions , deleteTransactionById
transactionRouter.post('/transaction', createTransaction);
// transactionRouter.get('/transaction' , getAllTransactions);
transactionRouter.get('/transaction/:id' , getAllTransactionsForCreator);
// transactionRouter.patch('/transaction/:id', getAllTransactions);
// transactionRouter.delete('/transaction/:id', deleteTransactionById);


module.exports = transactionRouter
