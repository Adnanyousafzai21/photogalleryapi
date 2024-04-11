import mongoose from "mongoose";
const imageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    box: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Box'
    }
}, { timestamps: true });

const Image = mongoose.model('Image', imageSchema);
export {Image}