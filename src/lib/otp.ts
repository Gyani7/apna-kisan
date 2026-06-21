
// In a real application, you would use an SMS gateway service like Twilio
export async function sendOtp(phone: string): Promise<string> {
  console.log(`Sending OTP to ${phone}`);
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  return otp;
}

export async function verifyOtp({ phone, otp }: { phone: string; otp: string }): Promise<{ success: boolean; message: string }> {
  console.log(`Verifying OTP ${otp} for ${phone}`);
  // In a real application, you would check the OTP against a stored value
  // For this mock, we'll just check if it's a 6-digit number
  if (otp && otp.length === 6 && /^\d{6}$/.test(otp)) {
    return { success: true, message: 'OTP verified successfully.' };
  }
  return { success: false, message: 'Invalid OTP.' };
}
