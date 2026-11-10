import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const orderData = await request.json();

    // Server-side validation of totals
    const calculatedSubtotal = orderData.items.reduce(
      (acc: number, item: any) => acc + item.unitPrice * item.quantity,
      0
    );

    const calculatedTotal =
      calculatedSubtotal -
      (orderData.discountAmount || 0) +
      (orderData.deliveryFee || 0);

    const orderId = `KC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const confirmedOrder = {
      ...orderData,
      id: orderId,
      subtotal: calculatedSubtotal,
      totalAmount: calculatedTotal,
      orderStatus: 'placed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      order: confirmedOrder,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to process order.' },
      { status: 400 }
    );
  }
}

