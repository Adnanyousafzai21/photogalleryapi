// imageModel.js
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    imageUrls: {
        type: String,
        required: true
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    box: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Box',
        required: [true , "box is required"]
    }
}, { timestamps: true });

const Image = mongoose.model('Image', imageSchema);
export default Image;
