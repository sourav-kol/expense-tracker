import mongoose from 'mongoose';

export const mongoInitialize = async () => {

    mongoose.connect(process.env.MONGO_URL as string, {
    })
        .then(db => {
            console.log("connected to DB!!!");
            //return db;
        })
        .catch(err => {
            throw new Error(JSON.stringify("can't connect to database"));
        });

} 
