import { Schema, model } from "mongoose";

const messageCollectionName = 'messages'

export const messageSchema = new Schema({
    userName: { type: String, required: true },
    message: { type:String, required: true}
});

export const MessageModel = model(messageCollectionName, messageSchema);