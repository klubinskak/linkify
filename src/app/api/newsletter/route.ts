import { NextRequest, NextResponse } from "next/server";


export async function PUT(
  request: NextRequest
) {
  const {email} = await request.json();


  const url = `https://api.sendgrid.com/v3/marketing/contacts`;

  const data = {
    contacts: [{ email: email }],
    list_ids: [process.env.SENDGRID_MAILING_ID],
  };
  const headers = {
    Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    "Content-Type": "application/json",
  };

  const options = {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return NextResponse.json({message: "Sign up successfully", json}, {status: 200});

  } catch (error: any) {
    return NextResponse.json({message: "Coudn't sign up for Newsletter"}, {status: 500});
  }
}