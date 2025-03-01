// app/api/metadata/route.ts
import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

// Helper function with caching
const fetchCachedMetadata = unstable_cache(
  async (formattedLinks: string[]) => {
    const response = await fetch(
      `https://metafetch.p.rapidapi.com/api/metadata/batch?urls=${encodeURIComponent(
        JSON.stringify(formattedLinks)
      )}`,
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
    revalidate: 24 * 3600, // Revalidate every 24 hours (in seconds)
  }
);

export async function POST(request: Request) {
  try {
    const { links } = await request.json();

    // Validate links
    if (!links || !Array.isArray(links)) {
      return NextResponse.json(
        { error: "Invalid links provided" },
        { status: 400 }
      );
    }

    // Validate each link
    const isValidUrl = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    };

    const formattedLinks = links.map((link: { url: string }) => link.url);
    if (formattedLinks.some((url) => !isValidUrl(url))) {
      return NextResponse.json(
        { error: "One or more URLs are invalid" },
        { status: 400 }
      );
    }

    // Fetch using cached function
    const data = await fetchCachedMetadata(formattedLinks);

    const linksWithMetadata = links.map((link, index) => ({
      ...link,
      ...data[index],
    }));
    return NextResponse.json({ linksWithMetadata });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
