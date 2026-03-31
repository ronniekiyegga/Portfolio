"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { type WorkItem } from "@/lib/data";

export type ProjectContextValue = {
  openModal: (workItem: WorkItem) => void;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedItem: WorkItem | null;
  setSelectedItem: Dispatch<SetStateAction<WorkItem | null>>;
};

const ProjectContext = createContext<ProjectContextValue | null>(null);

export function useProjectContext(): ProjectContextValue {
  const ctx = useContext(ProjectContext);
  if (!ctx) {
    throw new Error(
      "useProjectContext must be used within a ProjectContextProvider",
    );
  }
  return ctx;
}

export const ProjectContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);

  const openModal = (workItem: WorkItem) => {
    setSelectedItem(workItem);
    setModalOpen(true);
  };

  return (
    <ProjectContext.Provider
      value={{
        openModal,
        modalOpen,
        setModalOpen,
        selectedItem,
        setSelectedItem,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
