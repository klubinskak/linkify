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
import LoadingSpinner from "../layout/loading-spinner";

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

  if (!linksData) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    );
  }

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
          data={linksData}
        />
      )}
      <ul className="pt-4 md:pt-0">
        <li>
          {filteredData.map((link) => {
            return (
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
            );
          })}
        </li>
      </ul>
    </div>
  );
};

export default LinksContainer;
