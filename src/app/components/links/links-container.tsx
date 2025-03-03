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

const LinksContainer = () => {
  const { closeModal } = useSidebar();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [linksData, setLinksData] = useState<LinksData[] | null>(null);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState<LinksData[]>([]);
  const isMediumOrLarger = useMediaQuery({ query: "(min-width: 768px)" });
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data: LinksData[] = await import(
        `../../../../data/index.json`
      ).then((module) => module.default);
      setLinksData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter results based on the search query
    const filteredData = linksData
      ? linksData.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.subtitles.join().toLowerCase().includes(query.toLowerCase())
        )
      : [];

    setFilteredData(filteredData);

    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Command (or Ctrl) + K
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault(); // Prevent default browser behavior
        inputRef.current?.focus(); // Focus the input field
      }
    };

    // Add event listener to the document
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [query, linksData]);

  const showModal = () => {
    setShowSearchModal(true);
  };

  if (!linksData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 md:p-0">
      <SearchInput
        placeholder="Search.."
        ref={inputRef}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.currentTarget.value)
        }
        onFocus={isMediumOrLarger ? () => showModal() : undefined}
      ></SearchInput>
      {showSearchModal && (
        <SearchModal
          className="hidden md:flex"
          isOpen={showSearchModal}
          onClose={() => setShowSearchModal(false)}
          data={linksData}
        />
      )}
      <ul className="pt-4 md: pt-0">
        <li>
          {filteredData.map((link) => (
            <Accordion
              type="single"
              collapsible
              className="w-full"
              key={link.title}
            >
              <AccordionItem value={link.title} key={link.title}>
                <AccordionTrigger>{link.title}</AccordionTrigger>
                {link.subtitles.map((subtitle) => (
                  <AccordionContent key={subtitle}>
                    <Link
                      className="mx-4 hover:text-gray-400"
                      href={`/${link.title.toLocaleLowerCase()}/${subtitle.toLocaleLowerCase()}`}
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
    </div>
  );
};

export default LinksContainer;
