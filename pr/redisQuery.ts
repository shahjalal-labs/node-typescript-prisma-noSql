import generateOTP from "../src/helpers/generateOtp";
import redisClient from "../src/helpers/redis";

export const redisQuery = async () => {
  const otp = await redisClient.set(`key`, Number(generateOTP()), { EX: 5 });

  return "otop";
};
