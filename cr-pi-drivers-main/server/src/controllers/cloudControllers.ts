const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;
const cloudinary = require("cloudinary").v2;
const streamifier = require ("streamifier");


cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
});

export const cloudController = async (img: Buffer) => {
  try{
    // const imageStream = streamifier.createReadStream(img);
    // console.log("cloud controller: ", imageStream);
    // const cloudInfo = await cloudinary.uploader.upload(imageStream, {
    //   folder: "uploads",
    // });
    //console.log("cloud controller: ", img);
    // const cloudInfo = await cloudinary.uploader.upload_stream(
    //   {
    //     folder: "drivers"
    //   },
    //   function(error : any, result : any) {
    //       console.log("toca esto?",error, result);
    //   }
    // );
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "drivers"
        },
        function(error: any, result: any) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    streamifier.createReadStream(img).pipe(uploadStream);
  });
    // return cloudInfo;
  }catch(error){
    console.log(error);
    throw error;
  }
};
