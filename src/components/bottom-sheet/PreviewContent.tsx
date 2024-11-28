import { ReactNode, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSheet } from "../../contexts/SheetContext";

const PreviewContentWrapper = styled.div`
  margin: 0;
  padding: 0 20px;
  margin-bottom: 20px;
`;

interface WrapperProps {
  children: ReactNode;
}

export const PreviewContent: React.FC<WrapperProps> = ({ children }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const { setPreviewContentHeight, refresh } = useSheet();
  const callback = useCallback(() => {
    const calcHeight = (elem: HTMLDivElement) => {
      const margin =
        parseFloat(window.getComputedStyle(elem).marginTop) +
        parseFloat(window.getComputedStyle(elem).marginBottom);
      return elem.offsetHeight + margin;
    };
    if (previewRef.current)
      setPreviewContentHeight(calcHeight(previewRef.current));
    return () => {
      setPreviewContentHeight(0);
    };
  }, []);

  useEffect(() => {
    return callback();
  }, []);

  useEffect(() => {
    return callback();
  }, [refresh]);

  return (
    <PreviewContentWrapper ref={previewRef}>{children}</PreviewContentWrapper>
  );
};
