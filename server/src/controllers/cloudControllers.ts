const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
});

export const cloudController = async (img: Buffer) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "drivers",
        },
        function (error: any, result: any) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      streamifier.createReadStream(img).pipe(uploadStream);
    });
  } catch (error) {
    throw error;
  }
};
