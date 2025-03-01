"use client";
import useSelectedSubtopic from "@/app/hooks/useSelectedSubtopic";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "@/app/components/layout/breadcrumbs";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatLabel } from "@/lib/utils";
import Image from "next/image";
import { LinkModel } from "@/models/link";
import LoadingSpinner from "@/app/components/layout/loading-spinner";

export type AllowedTags = "Free" | "Paid";

function isAllowedTag(tag: string): tag is AllowedTags {
  return tag === "Free" || tag === "Paid";
}

export default function LinksGrid({
  params,
}: {
  params: { topic: string; subtopic: string };
}) {
  const { links } = useSelectedSubtopic(params.topic, params.subtopic);
  const [linksWithMetadata, setLinksWithMetadata] = useState<LinkModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (!links || links.length === 0) {
      setLoading(false);
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
        setLinksWithMetadata(data.linksWithMetadata);
      } catch (err) {
        console.error("Error fetching metadata:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMetadata();
  }, [links]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: formatLabel(params.topic), href: `/${params.topic}` },
          {
            label: formatLabel(params.subtopic),
            href: `/${params.topic}/${params.subtopic}`,
          },
        ]}
      />
      <h1 className="text-xl p-3">{formatLabel(params.subtopic)}</h1>
      {!loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-4 gap-x-4 p-3">
          {linksWithMetadata?.map((link) => (
            <Link href={link.url} key={link.title} target="_blank">
              <Card className="w-full h-[22rem]">
                <div className="w-full flex justify-center items-center">
                  <div className="rounded rounded-4 overflow-hidden w-full">
                    {link.metadata && link.metadata.image ? (
                      <img
                        className="transform transition-transform duration-300 h-48 hover:scale-110 w-full object-cover"
                        src={link.metadata.image}
                        alt={link.title}
                      />
                    ) : (
                      <img
                        className="transform transition-transform duration-300 h-48 hover:scale-110 w-full object-cover"
                        src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081"
                        alt="Placeholder"
                        width={250}
                        height={250}
                      />
                    )}
                  </div>
                </div>
                <CardHeader className="h-[7rem]">
                  <CardTitle className="text-left">{link.title}</CardTitle>
                  <p
                    className="text-sm overflow-hidden text-ellipsis whitespace-normal"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2, // Limits text to 2 lines
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {link.metadata && link.metadata.description}
                  </p>
                </CardHeader>

                <CardFooter className="flex gap-2">
                  {link.tags &&
                    link.tags?.length > 0 &&
                    link.tags
                      .filter(isAllowedTag)
                      .map((tag) => <Badge key={tag}>{tag}</Badge>)}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex h-[50vh] w-full justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
