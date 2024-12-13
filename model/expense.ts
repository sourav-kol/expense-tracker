import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema

const ExpenseSchema = new Schema(
    {
        _id: { type: Number, require: true },
        title: { type: String, require: true },
        category: { type: String, require: true },
        spentDate: { type: Date, require: false },
        amount: { type: Number, require: true },
        createdDate: { type: Date, default: new Date() },
        description: { type: String, require: false }
    }
);

export const Expense =  mongoose.models.Expenses ||mongoose.model("Expenses", ExpenseSchema);

//export type ExpenseResponse = Document<ExpenseSchema>