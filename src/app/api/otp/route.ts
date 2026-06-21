
import { NextRequest, NextResponse } from 'next/server';
import { sendOtp } from '@/lib/otp';

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return new NextResponse('Phone number is required', { status: 400 });
    }

    // In a real application, you would store the OTP and associate it with the phone number
    const otp = await sendOtp(phone);

    // For this example, we are not storing the OTP and assuming the client will handle it.
    // In a real application, you would not send the OTP back in the response.
    return new NextResponse(JSON.stringify({ otp }), { status: 200 });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return new NextResponse('Error sending OTP', { status: 500 });
  }
}
