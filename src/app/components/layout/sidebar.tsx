"use client";

import { useSidebar } from "@/app/context/sidebarContext";
import LinksContainer from "../links/links-container";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";
import { DialogPortal } from "@radix-ui/react-dialog";

export function Sidebar({ className }: { className?: string }) {
  const { isModalOpen, closeModal } = useSidebar();
  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const portalRef = useRef<HTMLDivElement>(null);

  if (isLargeScreen) {
    return (
      <aside className={className}>
        <nav>
          <LinksContainer />
        </nav>
      </aside>
    );
  } else {
    return (
      <div ref={portalRef}>
        <Drawer open={isModalOpen} onOpenChange={(isOpen) => !isOpen && closeModal()}>
          {portalRef.current && (
            <DialogPortal container={portalRef.current}>
              <DrawerContent>
                <DrawerHeader>
                  <div className="flex justify-between p-2">
                    <div>
                      <DrawerTitle>Search</DrawerTitle>
                    </div>
                    <DrawerClose onClick={() => closeModal()}>X</DrawerClose>
                  </div>
                </DrawerHeader>
                <LinksContainer />
              </DrawerContent>
            </DialogPortal>
          )}
        </Drawer>
      </div>
    );
  }
};