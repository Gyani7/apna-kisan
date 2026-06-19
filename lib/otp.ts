
// In a real application, you would use an SMS gateway service like Twilio
export async function sendOtp(phone: string): Promise<string> {
  console.log(`Sending OTP to ${phone}`);
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  return otp;
}
