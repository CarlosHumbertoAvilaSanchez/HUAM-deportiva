import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET(request: NextRequest) {}

export async function POST(request: NextRequest) {
  const priceName = request.nextUrl.searchParams.get("name");
  const eventStripeId = request.nextUrl.searchParams.get("eventId");
  const currency = request.nextUrl.searchParams.get("currency");
  const unitAmount = request.nextUrl.searchParams.get("price");

  const categoryStripeProduct = await stripe.prices.create({
    currency: currency,
    nickname: priceName,
    unit_amount: unitAmount,
    product: eventStripeId,
  });

  return NextResponse.json({
    message: "Price created",
    category: categoryStripeProduct,
  });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({
    message: "price deleted",
  });
}

export async function UPDATE(request: NextRequest) {}
