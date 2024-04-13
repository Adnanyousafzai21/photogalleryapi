import mongoose from "mongoose";

const boxSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    boxName: {
        type: String,
        required: true
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }]
}, { timestamps: true });

const Box = mongoose.model('Box', boxSchema);
export default Box