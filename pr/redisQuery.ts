import generateOTP from "../src/helpers/generateOtp";
import redisClient from "../src/helpers/redis";

export const redisQuery = async () => {
  const otp = await redisClient.set(`key`, Number(generateOTP()), { EX: 5 });
  // console.log(otp, "[1;31motp in redisQuery.ts at line 6[0m");

  const getOtp = await redisClient.get("key");

  await redisClient.set("simple:key", "Hello Redis!");

  const simpleValue = await redisClient.get("simple:key");
  console.log(simpleValue, "[1;31msimpleValue in redisQuery.ts at line 14[0m");
  //w: 2️⃣ SET with expiry (EX)
  /*   let xpiry = await redisClient.set("expire:key", " I vanish in 5s", {
    EX: 5,
  }); */

  console.log(`value before expiry`, await redisClient.get("expire:key"));

  return "otop";
};
