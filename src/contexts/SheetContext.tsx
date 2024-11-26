import { createContext, useContext, useState } from 'react';
import { Mode } from '../enums/mode.enum';

interface SheetContextType {
  currentMode: Mode;
  setCurrentMode: (mode: Mode) => void;
  previewContentHeight: number;
  mainContentHeight: number;
  isExpanded: boolean;
  setPreviewContentHeight: (input: number) => void;
  setMainContentHeight: (input: number) => void;
  setIsExpanded: (input: boolean) => void;
  title: string;
  setTitle: (input: string) => void;
  pageStack: Mode[];
  popPageStack: () => Mode;
  pushPageStack: (input: Mode) => void;
  goTo: (mode: Mode) => void;
  goBack: () => void;
  goToMainandFlushStack: () => void;
}

const SheetContext = createContext<SheetContextType | undefined>(undefined);

export const SheetProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState<string>("");
  const [pageStack, setPageStack] = useState<Mode[]>([]);
  const [currentMode, setCurrentMode] = useState<Mode>(Mode.MAIN);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [previewContentHeight, setPreviewContentHeight] = useState<number>(0);
  const [mainContentHeight, setMainContentHeight] = useState<number>(0);

  const popPageStack = () => {
    const previousMode = pageStack.pop();
    if (!previousMode) return Mode.MAIN;
    return previousMode;
  }

  const pushPageStack = (input: Mode) => {
    setPageStack([...pageStack, input]);
  }

  const goTo = (mode: Mode) => {
    setCurrentMode(mode);
  }

  const goBack = () => {
    popPageStack();
    let prevMode = popPageStack();
    while (prevMode === Mode.SEARCH) {
      prevMode = popPageStack();
    }
    setCurrentMode(prevMode);
  }


  const goToMainandFlushStack = () => {
    setPageStack([]);
    setCurrentMode(Mode.MAIN);
  }

  return (
    <SheetContext.Provider value={
      {
        goToMainandFlushStack,
        goTo,
        goBack,
        pageStack,
        popPageStack,
        pushPageStack,
        title,
        setTitle,
        currentMode,
        setCurrentMode,
        isExpanded,
        setIsExpanded,
        previewContentHeight,
        setPreviewContentHeight,
        mainContentHeight,
        setMainContentHeight
      }
    }>
      {children}
    </SheetContext.Provider>
  );
};

export const useSheet= () => {
  const context = useContext(SheetContext);
  if (context === undefined) {
    throw new Error('useSheet must be used within a SheetProvider');
  }
  return context;
};