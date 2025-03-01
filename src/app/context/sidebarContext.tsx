"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface SidebarContextProps {
  isOpen: boolean;
  isModalOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  openModal: () => void;
  closeModal: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSidebar = useCallback(() => setIsOpen(true), []);
  const closeSidebar = useCallback(() => setIsOpen(false), []);
  const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isModalOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,
        openModal,
        closeModal,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to use the Sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
