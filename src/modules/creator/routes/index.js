const express = require('express');
const creatorRouter = express.Router();
const {createCreator , getAllCreators , getCreatorById , updateCreatorById , deleteCreatorById} = require('../controller/creator.controller')

creatorRouter.post('/creator', createCreator);
creatorRouter.get('/creator' , getAllCreators);
creatorRouter.get('/creator/:id' , getCreatorById);
creatorRouter.patch('/creator/:id', updateCreatorById);
creatorRouter.delete('/creator/:id', deleteCreatorById);


module.exports = creatorRouter
