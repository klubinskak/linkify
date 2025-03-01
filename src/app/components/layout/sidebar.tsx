"use client";

import { useSidebar } from "@/app/context/sidebarContext";
import LinksContainer from "../links/links-container";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "react-responsive";

export function Sidebar({ className }: { className?: string }) {
  const { isModalOpen, closeModal } = useSidebar();
  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });

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
      <Drawer
        open={isModalOpen}
        onOpenChange={(isOpen) => !isOpen && closeModal()}
      >
        <DrawerContent>
          <DrawerHeader>
            <div className="flex justify-between p-2">
              <div></div>
              <div>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </div>
              <DrawerClose onClick={() => closeModal()}>X</DrawerClose>
            </div>
          </DrawerHeader>
          <div className="px-6">
            <LinksContainer />
          </div>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
}
