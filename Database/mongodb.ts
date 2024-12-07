import { Db, MongoClient, WithId, Document } from 'mongodb';

export const mongoInitialize = async (): Promise<Db> => { // 
    try {
        var client = new MongoClient(process.env.MONGO_URL as string);
        await client.connect();

        const database = client.db("expense-tracker");
        return database;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export type Response = WithId<Document>[];

