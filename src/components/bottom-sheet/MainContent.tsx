import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSheet } from "../../contexts/SheetContext";

export const MainContentWrapper = styled.div`
height: 100%
overflow-y: auto;
padding: 0 20px;
margin-bottom: 20px;
`;

interface WrapperProps {
    children: ReactNode;
}

export const MainContent: React.FC<WrapperProps> = ({children}) => {
    const mainRef = useRef<HTMLDivElement>(null);
    const { setMainContentHeight, setIsExpanded } = useSheet();
    useEffect(() => {
      const calcHeight = (elem: HTMLDivElement) => {
        const margin = parseFloat(window.getComputedStyle(elem).marginTop) + parseFloat(window.getComputedStyle(elem).marginBottom);
        return elem.offsetHeight + margin;
      }
      setIsExpanded(false);
      if (mainRef.current) setMainContentHeight(calcHeight(mainRef.current));
      return () => {
        setMainContentHeight(0);
      }
    }, [])

    return (
        <MainContentWrapper ref={mainRef}>
            {children}
        </MainContentWrapper>
    )
}