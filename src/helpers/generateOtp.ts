const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

let otp = generateOTP();
console.log(otp, "[1;31motp in generateOtp.ts at line 6[0m");
export default generateOTP;
