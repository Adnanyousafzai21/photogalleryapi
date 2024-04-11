import mongoose from "mongoose";

const boxSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    name: {
        type: String,
        required: true
    },
    isPrivate: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Box = mongoose.model('Box', boxSchema);
export { Box };
