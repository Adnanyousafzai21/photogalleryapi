
import Image from "../modle/images-model.js";

const uploadImage = async (req, res) => {
    try {
        const { isPrivate, imageUrls, box } = req.body;
        const userId = req.user._id;

        const savedImages = await Promise.all(imageUrls.map(async (imageUrl) => {
            const newImage = new Image({
                user: userId,
                imageUrls: imageUrl, 
                isPrivate: isPrivate || false,
                box: box
            });
            return await newImage.save();
        }));

        res.status(201).json({message:"images upladed sucessfully", savedImages});
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: error.message, message: "Internal server error" });
    }
};

const getImagesByBoxId = async (req, res) => {
    try {
        const boxId = req.params.boxId;
        const images = await Image.find({ box: boxId }).populate('user', 'fullname');
        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images by box ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const updateImagePrivacy = async (req, res) => {
    try {
      const imageId = req.params.imageId;
      const { isPrivate } = req.body;
  
      // Assuming you have a mongoose model for images named Image
      const updatedImage = await Image.findByIdAndUpdate(
        imageId,
        { isPrivate },
        { new: true }
      );
  
      if (!updatedImage) {
        return res.status(404).json({ message: 'Image not found' });
      }
  
      res.status(200).json(updatedImage);
    } catch (error) {
      console.error('Error updating image privacy:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  





const getAllImages = async (req, res) => {
    try {
        const images = await Image.find().populate('user', 'fullname');


        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getImagesByUser = async (req, res) => {
    try {
        const userId = req.user._id;

        const images = await Image.find({ user: userId }).populate("user","fullname").populate('box', 'name').exec();

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

export { uploadImage, getAllImages, getImagesByUser, deleteAllImages , getImagesByBoxId, updateImagePrivacy}