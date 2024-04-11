import { v2 as cloudinary } from "cloudinary"
import fs from "fs"




 
// cloudinary.config({ 
//   cloud_name: 'dhpyyn3tq', 
//   api_key: '725217132995781', 
//   api_secret: '6Ppsn0xIc6CmtGRjMz7SBchMbrQ' 
// });

const uploadOnCloudinary = async (imgLocalPath) => {
    try {
    
        if (!imgLocalPath) return null

        console.log("before cloudinary  ", imgLocalPath)
        const response = await cloudinary.uploader.upload(imgLocalPath, {
            resource_type: "auto"
        })
             console.log("after cluodinary", response)
        fs.unlinkSync(imgLocalPath)
        return response;

    } catch (error) {
        fs.unlinkSync(imgLocalPath)
        return null;
    }
}



export { uploadOnCloudinary }