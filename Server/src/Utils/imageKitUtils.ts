import { url } from "inspector";
import imageKit from "../Config/imageKit.ts";
import fs from "fs";
import { inflate } from "zlib";

const saveImage = async (thumbnail:Express.Multer.File)=>{
  const imgBuffer = fs.readFileSync(thumbnail?.path);
        const ikResponse = await imageKit.upload({
          file: imgBuffer,
          fileName: thumbnail.originalname + Date.now(),
          folder: "/blogs"
        });

        return imageKit.url({
          path: ikResponse.filePath,
          transformation: [
            {
              quality: "auto"
            }, {
              format:"webp"
            }, {
              width: "1280"
            }
          ]
        })
}


export default saveImage;