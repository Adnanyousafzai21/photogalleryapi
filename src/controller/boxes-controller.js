import Box from "../modle/boxes-model.js";
import Image from "../modle/images-model.js";

const createBox = async (req, res) => {
    try {
        const userId= req.user._id
        const {boxName, isPrivate } = req.body;
        const newBox = new Box({
            user: userId,
            boxName,
            isPrivate: isPrivate || false
        });

        const savedBox = await newBox.save();

        res.status(201).send({message:"boxe created successfully", savedBox});
    } catch (error) {
        console.error('Error creating box:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const getBoxesByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const boxes = await Box.find({ "user": userId }).populate({
            path: 'user',
            select: 'fullname isPrivate'
        });

        res.status(200).json(boxes);
    } catch (error) {
        console.error('Error fetching boxes:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const getBoxById = async (req, res) => {
    try {
        const boxId = req.params.boxId;
        const box = await Box.findById(boxId);

        if (!box) {
            return res.status(404).json({ message: 'Box not found' });
        }

        res.status(200).json(box);
    } catch (error) {
        console.error('Error fetching box:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateBoxById = async (req, res) => {
    try {
        const boxId = req.params.boxId;
        const { isPrivate } = req.body; 

        const updatedBox = await Box.findByIdAndUpdate(boxId, { isPrivate }, { new: true });
        const updateImages = await Image.updateMany({ box: boxId }, { isPrivate });

        if (!updatedBox) {
            return res.status(404).json({ message: 'Box not found' });
        }

        res.status(200).send({message:"updated box privacy", updatedBox});
    } catch (error) {
        console.error('Error updating box:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const deleteBoxById = async (req, res) => {
    try {
        const boxId = req.params.boxId;

        console.log("box id is here",boxId)
        const deleteImages = await Image.deleteMany({ box: boxId });
        const deletedBox = await Box.findByIdAndDelete(boxId);

        if (!deletedBox) {
            return res.status(404).json({ message: 'Box not found' });
        }

        res.status(201).json({ message: 'Box & images of the box deleted successfully' });
    } catch (error) {
        console.error('Error deleting box:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export { createBox, getBoxesByUser, getBoxById, updateBoxById, deleteBoxById };
