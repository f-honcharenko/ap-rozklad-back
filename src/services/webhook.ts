import express from 'express';

const webhook = express.Router();

webhook.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        return next(Promise.resolve({ data: {}, status:200 }));
    }catch (error) {
        return next(error);
    } 
});

export default webhook

