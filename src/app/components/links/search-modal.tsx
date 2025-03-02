import clsx from "clsx";
import React, { useEffect, useState, useRef } from "react";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
  DialogPortal, 
} from "@radix-ui/react-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import SearchInput from "@/components/ui/search-input";

interface LinksData {
  title: string;
  source: string;
  subtitles: string[];
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: LinksData[];
  className: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  data,
  className,
}) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState<LinksData[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Filter results based on the search query
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitles.join().toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);

    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Command (or Ctrl) + K
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault(); 
        inputRef.current?.focus(); 
      }
    };

    // Add event listener to the document
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [query, data]);

  return (
    <div
      ref={portalRef}
      className={clsx(
        "fixed flex z-50 justify-center items-center inset-0 bg-black bg-opacity-30 backdrop-blur-sm",
        className
      )}
    >
      <Dialog open={isOpen} onOpenChange={onClose}>
        {portalRef.current && (
          <DialogPortal container={portalRef.current}>
            <DialogContent className="z-50 w-[50%] h-[30rem] p-4 bg-[#0A0A0A] border border-2 rounded-lg overflow-auto">
              <DialogHeader>
                <DialogTitle className="p-2">
                  <div className="flex justify-between">
                    Search
                    <DialogClose asChild>
                      <p className="text-white cursor-pointer">x</p>
                    </DialogClose>
                  </div>
                </DialogTitle>
                <SearchInput
                  placeholder="Search.."
                  ref={inputRef}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuery(e.currentTarget.value)
                  }
                />
                <DialogDescription className="text-xs text-gray-400 p-2">
                  Results
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col">
                <ul>
                  {filteredData.map((link) => (
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      key={link.title}
                    >
                      <AccordionItem value={link.title}>
                        <AccordionTrigger>{link.title}</AccordionTrigger>
                        {link.subtitles.map((subtitle) => (
                          <AccordionContent key={subtitle}>
                            <Link
                              className="mx-4 hover:text-gray-400"
                              href={`/${link.title.toLowerCase()}/${subtitle.toLowerCase()}`}
                              onClick={onClose}
                            >
                              {subtitle}
                            </Link>
                          </AccordionContent>
                        ))}
                      </AccordionItem>
                    </Accordion>
                  ))}
                </ul>
              </div>
              <DialogFooter className="sm:justify-start" />
            </DialogContent>
          </DialogPortal>
        )}
      </Dialog>
    </div>
  );
};
