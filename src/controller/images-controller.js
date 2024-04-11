import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { Image } from "../modle/images-model.js";

const uploadImage = async (req, res) => {
    try {
        const { isPrivate, imageUrl, box } = req.body
        console.log("uploadimage controller hited")
        const userId = req.user._id;
        console.log("image url",imageUrl)
        const newImage = new Image({
            user: userId,
            imageUrl: imageUrl,
            isPrivate: isPrivate || false,
            box: box
        });
        const savedImage = await newImage.save();

        res.status(201).json(savedImage);
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllImages = async (req, res) => {
    try {
        const images = await Image.find().populate('user', 'name').populate('box', 'name').exec();

        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getImagesByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const images = await Image.find({ user: userId }).populate('box', 'name').exec();

        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images by user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const deleteAllImages = async (req, res) => {
    try {
        await Image.deleteMany({});
        res.status(200).json({ message: 'All images deleted successfully.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to delete all images.' });
    }
};

export { uploadImage, getAllImages, getImagesByUser, deleteAllImages }