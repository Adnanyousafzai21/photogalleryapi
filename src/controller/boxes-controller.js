import { Box } from "../modle/boxes-model.js";

// Create a new box
const createBox = async (req, res) => {
    try {
        const { name, isPrivate } = req.body;
        const newBox = new Box({
            // user: userId,
            name,
            isPrivate: isPrivate || false
        });

        const savedBox = await newBox.save();

        res.status(201).json(savedBox);
    } catch (error) {
        console.error('Error creating box:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getBoxesByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const boxes = await Box.find({ user: userId });

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
        const { name, isPrivate } = req.body;

        const updatedBox = await Box.findByIdAndUpdate(boxId, { name, isPrivate }, { new: true });

        if (!updatedBox) {
            return res.status(404).json({ message: 'Box not found' });
        }

        res.status(200).json(updatedBox);
    } catch (error) {
        console.error('Error updating box:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteBoxById = async (req, res) => {
    try {
        const boxId = req.params.boxId;

        const deletedBox = await Box.findByIdAndDelete(boxId);

        if (!deletedBox) {
            return res.status(404).json({ message: 'Box not found' });
        }

        res.status(200).json({ message: 'Box deleted successfully' });
    } catch (error) {
        console.error('Error deleting box:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { createBox, getBoxesByUser, getBoxById, updateBoxById, deleteBoxById };
