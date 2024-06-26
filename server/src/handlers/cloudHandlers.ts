import { cloudController } from "../controllers/cloudControllers";

export const cloudHandler = async (img: Buffer) => {
  try {
    const cloudInfo = await cloudController(img);
    return cloudInfo;
  } catch (error) {
    throw error;
  }
};
