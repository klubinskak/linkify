"use client";

import { useSidebar } from "@/app/context/sidebarContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SearchModal } from "./search-modal";
import SearchInput from "@/components/ui/search-input";
import { LinksData } from "@/models/link";
import { useMediaQuery } from "react-responsive";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ITEMS = 5;
const SKELETON_SUBTITLES = 3;

const AccordionSkeleton = () => (
  <ul>
    <li>
      {Array.from({ length: SKELETON_ITEMS }).map((_, index) => (
        <div 
          key={index} 
          className="border-b"
        >
          <div className="flex">
            <div className="flex flex-1 items-center justify-between py-4 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" /> {/* Icon skeleton */}
                <Skeleton className="h-4 w-28" /> {/* Title skeleton */}
              </div>
              <Skeleton className="h-4 w-4 shrink-0 text-muted-foreground" /> {/* Chevron skeleton */}
            </div>
          </div>
          {/* Subtitle skeletons - show for first item to simulate expanded state */}
          <div className={index === 0 ? 'overflow-hidden text-sm animate-accordion-down' : 'hidden'}>
            <div className="pb-4 pt-0">
              {Array.from({ length: SKELETON_SUBTITLES }).map((_, subIndex) => (
                <div key={subIndex} className="mx-4 py-1">
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </li>
  </ul>
);

const LinksContainer = () => {
  const { closeModal } = useSidebar();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [linksData, setLinksData] = useState<LinksData[] | null>(null);
  const [filteredData, setFilteredData] = useState<LinksData[]>([]);
  const [query, setQuery] = useState("");
  const isMediumOrLarger = useMediaQuery({ query: "(min-width: 768px)" });
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timestamp = process.env.NODE_ENV === 'development' ? `?t=${new Date().getTime()}` : '';
        const response = await fetch(`/data/index.json${timestamp}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json() as LinksData[];
        setLinksData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!linksData) return;
    
    const filtered = linksData.filter((link) =>
      link.title.toLowerCase().includes(query.toLowerCase()) ||
      link.subtitles.some((subtitle) =>
        subtitle.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredData(filtered);

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [query, linksData]);

  const showModal = () => {
    setShowSearchModal(true);
  };

  return (
    <div className="p-4 md:p-0">
      <SearchInput
        placeholder="Search.."
        ref={inputRef}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.currentTarget.value)
        }
        onFocus={isMediumOrLarger ? showModal : undefined}
      />
      {showSearchModal && (
        <SearchModal
          className="hidden md:flex"
          isOpen={showSearchModal}
          onClose={() => setShowSearchModal(false)}
          data={linksData || []}
        />
      )}
      <div className="pt-4 md:pt-0">
        {!linksData ? (
          <AccordionSkeleton />
        ) : (
          <ul>
        <li>
              {...filteredData
              .sort((a,b) => {
                if(a.pin && !b.pin) return -1;
                if(!a.pin && b.pin) return 1;
                return 0;
              })
              .map((link) => (
              <Accordion
                type="single"
                collapsible
                className="w-full"
                key={link.title}
              >
                <AccordionItem value={link.title} key={link.title}>
                  <AccordionTrigger className="text-gray-200 hover:text-white">
                    <div className="flex items-center gap-2">
                      {link.icon ? (
                        <Icon icon={link.icon} />
                      ) : (
                        <Icon />
                      )}
                      {link.title}
                    </div>
                  </AccordionTrigger>
                  {link.subtitles.map((subtitle) => (
                    <AccordionContent key={subtitle}>
                      <Link
                        className="mx-4 hover:text-gray-400"
                        href={`/${link.title.toLocaleLowerCase()}/${encodeURIComponent(subtitle).toLowerCase()}`}
                        onClick={() => closeModal()}
                      >
                        {subtitle}
                      </Link>
                    </AccordionContent>
                  ))}
                </AccordionItem>
              </Accordion>
              ))}
        </li>
      </ul>
        )}
      </div>
    </div>
  );
};

export default LinksContainer;
