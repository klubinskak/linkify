import { NextResponse } from "next/server";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID; 

const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

export async function POST(req: Request) {
  try {
    const { url, email } = await req.json();
    if(!url){
      return NextResponse.json({ error: "Invalid URL provided" }, { status: 400 });
    }

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: "Arkusz1!A1",
      valueInputOption: "RAW",
      requestBody: {
        values: [[url, email]],
      },
    });

    return NextResponse.json({ message: "Data added successfully" }, { status: 200 });
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    /* eslint-enable @typescript-eslint/no-explicit-any */
    console.error("Error writing to Google Sheets:", error?.response?.data || error.message || error);
    return NextResponse.json({ error: error?.message || "Failed to write data" }, { status: 500 });
  }

}
