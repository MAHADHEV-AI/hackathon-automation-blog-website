import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR', receipt, notes } = body;

    // Validate server-side amount
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid order amount.' },
        { status: 400 }
      );
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // In demo or test mode where real Razorpay credentials might be mocked:
    if (!keySecret || keySecret.includes('demo_secret') || keySecret.includes('YourRazorpaySecret')) {
      const mockOrderId = `order_${crypto.randomBytes(8).toString('hex')}`;
      return NextResponse.json({
        success: true,
        orderId: mockOrderId,
        amount: Math.round(amount * 100), // amount in paise
        currency,
        isDemo: true,
      });
    }

    // Call Razorpay API using basic auth
    const authHeader = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`;
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // in paise
        currency,
        receipt: receipt || `rcpt_${Date.now()}`,
        notes: notes || {},
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.description || 'Razorpay order creation failed' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
      isDemo: false,
    });
  } catch (error: any) {
    console.error('Razorpay create order API error:', error);
    return NextResponse.json(
      { error: 'Internal server error while creating payment order.' },
      { status: 500 }
    );
  }
}

