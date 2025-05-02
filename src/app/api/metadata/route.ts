import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

// Helper function with caching
const fetchCachedMetadata = unstable_cache(
  async (url: string) => {
    const response = await fetch(
      `https://metafetch.p.rapidapi.com/api/metadata?url=${url}`,
      {
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
          "x-rapidapi-host": process.env.RAPIDAPI_HOST || "",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.statusText}`);
    }
    return response.json();
  },
  ["metadata-cache"], // Base cache key
  {
    tags: ["metadata"], // Revalidation tags
    revalidate: 24 * 3600 // Revalidate every 24 hours (in seconds)
  }
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    const isValidUrl = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    };

    // Validate urls
    if (!url || typeof url !== "string" || !isValidUrl(url)) { 
      return NextResponse.json(
        { error: "Invalid url provided" },
        { status: 400 }
      );
    }

    // Fetch using cached function
    const data = await fetchCachedMetadata(url);
    
    const urlWithMetadata ={
      url,
      ...data,
    };
    return NextResponse.json({ urlWithMetadata });
    
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}