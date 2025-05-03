"use client";
import useSelectedSubtopic from "@/app/hooks/useSelectedSubtopic";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "@/app/components/layout/breadcrumbs";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { formatLabel } from "@/lib/utils";
import { LinkModel } from "@/models/link";
import { Skeleton } from "@/components/ui/skeleton";

export type AllowedTags = "Free" | "Paid";

function isAllowedTag(tag: string): tag is AllowedTags {
  return tag === "Free" || tag === "Paid";
}

const SKELETON_FALLBACK_COUNT = 3;

const CardSkeleton = () => (
  <Card className="w-full h-[22rem]">
    <div className="w-full flex justify-center items-center">
      <div className="rounded rounded-4 overflow-hidden w-full">
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
    <CardHeader className="h-[7rem]">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full mt-2" />
      <Skeleton className="h-4 w-2/3 mt-2" />
    </CardHeader>
    <CardFooter className="flex gap-2">
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-5 w-16" />
    </CardFooter>
  </Card>
);

interface MetadataResponse {
  title: string;
  description: string;
  url: string;
  image: string;
  imageSource: string;
}

export default function LinksGrid({
  params,
}: {
  params: { topic: string; subtopic: string };
}) {
  const { links } = useSelectedSubtopic(params.topic, params.subtopic);
  const [linksWithMetadata, setLinksWithMetadata] = useState<LinkModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLoading(true);

    if (!links || links.length === 0) {
      setLoading(false);
      setLinksWithMetadata([]);
      return;
    }

    async function fetchMetadata() {
      try {
        const response = await fetch("/api/metadata-batch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            links: links,
          }),
        });
        const data = await response.json();
        
        // Merge RapidAPI metadata with our existing links data
        const safeLinks = links || [];
        const mergedLinks = data.map((metadata: MetadataResponse, index: number) => {
          const currentLink = safeLinks[index];
          return {
            ...metadata,
            tags: currentLink?.tags || [],
          };
        });
        
        setLinksWithMetadata(mergedLinks);
      } catch (err) {
        console.error("Error fetching metadata:", err);
        // Fallback to original links if metadata fetch fails
        setLinksWithMetadata(Array.isArray(links) ? links : []);
      } finally {
        setLoading(false);
      }
    }

    fetchMetadata();
  }, [links]);

  const skeletonCount = Math.max(links?.length || 0, SKELETON_FALLBACK_COUNT);

  return (
    <div className="p-4 md:p-0">
      <Breadcrumbs
        items={[
          { label: formatLabel(params.topic), href: `/${params.topic}` },
          {
            label: formatLabel(params.subtopic),
            href: `/${params.topic}/${params.subtopic}`,
          },
        ]}
      />
      <h1 className="text-xl p-3 mt-2">{formatLabel(params.subtopic)}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-4 gap-x-4 p-3">
        {loading ? (
          // Show skeleton cards while loading
          Array.from({ length: skeletonCount }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : (
          linksWithMetadata.map((link) => (
            !link.error && (
            <Link href={link.url} key={link.url} target="_blank">
              <Card className="w-full h-[22rem]">
                <div className="w-full flex justify-center items-center">
                  <div className="rounded rounded-4 overflow-hidden w-full">
                      <Image
                        className="transform transition-transform duration-300 h-48 hover:scale-110 w-full object-cover"
                      src={!imageErrors[link.image] && link.image ? link.image : "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081"}
                      alt={link.title || "Website preview"}
                        width={500}
                        height={300}
                      onError={() => setImageErrors(prev => ({ ...prev, [link.image]: true }))}
                      priority={false}
                      />
                  </div>
                </div>
                <CardHeader className="h-[7rem]">
                  <CardTitle className="text-left">{link.title}</CardTitle>
                  <p
                    className="text-sm overflow-hidden text-ellipsis whitespace-normal"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {link.description}
                  </p>
                </CardHeader>

                <CardFooter className="flex gap-2">
                  {link.tags &&
                    link.tags.length > 0 &&
                    link.tags
                      .filter(isAllowedTag)
                      .map((tag) => <Badge key={tag}>{tag}</Badge>)}
                </CardFooter>
              </Card>
            </Link>
          )))
        )}
        </div>
    </div>
  );
}
