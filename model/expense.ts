import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema

//todo: refactor id generation
const ExpenseSchema = new Schema<string>(
    {
        _id: { type: String, require: true }, //default: v4()
        title: { type: String, require: true },
        category: { type: String, require: true },
        spentDate: { type: Date, require: false },
        amount: { type: Number, require: true },
        createdDate: { type: Date, default: new Date() },
        description: { type: String, require: false }
    }
);

export const ExpenseModel = mongoose.models.Expenses || mongoose.model("Expenses", ExpenseSchema);

//export type ExpenseResponse = Document<ExpenseSchema>