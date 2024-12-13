import { Db, MongoClient, WithId, Document } from 'mongodb';

export const mongoInitialize = async (): Promise<Db> => {
    try {
        var client = new MongoClient(process.env.MONGO_URL as string);
        console.log(client);
        await client.connect();

        const database = client.db("expense-tracker");
        return database;
    } catch (error) {
        throw new Error(JSON.stringify("can't connect to database"));
    }
}

export type Response = WithId<Document>[];

