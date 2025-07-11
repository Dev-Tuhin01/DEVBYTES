import ImageKit from "imagekit";
import  dotenv  from "dotenv";

dotenv.config();

// Runtime safety check
const publicKey = process.env.IMAGE_KIT_PUBLIC_KEY;
const privateKey = process.env.IMAGE_KIT_PRIVATE_KEY;
const urlEndpoint = process.env.IMAGE_KIT_URL;


if (!publicKey || !privateKey || !urlEndpoint) {
  throw new Error("❌ Missing ImageKit environment variables");
}

const imageKit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export default imageKit;
