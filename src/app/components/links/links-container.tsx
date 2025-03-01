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

const LinksContainer = () => {
  const { closeModal } = useSidebar();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [linksData, setLinksData] = useState<LinksData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data: LinksData[] = await import(
        `../../../../data/index.json`
      ).then((module) => module.default);
      setLinksData(data);
    };

    fetchData();
  }, []);

  const showModal = () => {
    setShowSearchModal(true);
  };

  if (!linksData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SearchInput
        placeholder="Search.."
        onFocus={() => showModal()}
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
          {linksData.map((link) => (
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
