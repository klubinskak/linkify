// Modald used to search for links in larger screens
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
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
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Filter results based on the search query
    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) || item.subtitles.join().toLowerCase().includes(query.toLowerCase())
    );

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
  }, [query, data]);

  return (
    <div
    className={clsx(
      "fixed flex z-50 justify-center items-center inset-0 bg-black bg-opacity-30 backdrop-blur-sm",
      className
    )}
    >
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="z-50 w-[50%] h-[30rem] p-4 bg-[#0A0A0A] border border-2 rounded-lg overflow-auto">
          <DialogHeader>
            <DialogTitle className="p-2">
              <div className="flex justify-between">
                Search
                <DialogClose asChild className="text-white">
                  <p className="text-white cursor-pointer">x</p>
                </DialogClose>
              </div>
            </DialogTitle>
            <SearchInput
              placeholder="Search.."
              ref={inputRef}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.currentTarget.value)}
            ></SearchInput>
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
                  key={link!.title}
                >
                  <AccordionItem value={link!.title}>
                    <AccordionTrigger>{link!.title}</AccordionTrigger>
                    {link!.subtitles.map((subtitle) => (
                      <AccordionContent key={subtitle}>
                        <Link
                          className="mx-4 hover:text-gray-400"
                          href={`/${link!.title.toLowerCase()}/${subtitle.toLowerCase()}`}
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
          <DialogFooter className="sm:justify-start"></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
