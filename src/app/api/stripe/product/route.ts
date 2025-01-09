import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET(request: NextRequest) {
  const eventName = request.nextUrl.searchParams.get("name");
  const eventStripeProduct = await stripe.products.search({
    query: `name~\'${eventName}\'`,
  });

  return NextResponse.json({
    event: eventStripeProduct.data[0],
  });
}

export async function POST(request: NextRequest) {
  const eventName = request.nextUrl.searchParams.get("name");
  const eventStripeProduct = await stripe.products.create({
    name: eventName,
  });

  return NextResponse.json({
    message: "Event added to stripe",
    event: eventStripeProduct,
  });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({
    message: "Event deleted",
  });
}

export async function UPDATE(request: NextRequest) {
  return NextResponse.json({
    message: "Event updated",
    event: "stripeproduct",
  });
}
