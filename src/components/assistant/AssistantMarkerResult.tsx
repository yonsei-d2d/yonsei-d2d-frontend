import styled from "styled-components";
import { useRouteMap } from "../../contexts/MapContext";
import { PreviewContent } from "../bottom-sheet/PreviewContent";
import { useEffect } from "react";
import { SheetPage } from "../bottom-sheet/SheetPage";
import { Mode } from "../../enums/mode.enum";
import { MapMode } from "../../enums/map-mode.enum";
import { CategoryTagUtil } from "../../utils/category-tag-util";
import { CategoryEmojiUtil } from "../../utils/emoji-util";
import { Alert } from "react-bootstrap";

const ResultContainer = styled.div`
  padding: 0px;
`;

const ResultContentWrapper = styled.div`
  margin: 0;
  display: flex;
  gap: 10px;
`;

const AssistantMarkerResult = () => {
  const { assistantMessage, targetLocation, setMapMode } = useRouteMap();

  useEffect(() => {
    setMapMode(MapMode.MARKER);
    return () => {
      setMapMode(MapMode.NONE);
    };
  }, []);

  if (!targetLocation) return null;

  return (
    <SheetPage title="상세 정보" mode={Mode.ASSISTANT_MARKER_RESULT}>
      <PreviewContent>
        <Alert variant="primary">{assistantMessage}</Alert>
        <ResultContainer>
          <ResultContentWrapper>
            <CategoryEmojiUtil type={targetLocation.type} />
            <div>{targetLocation.name}</div>
            <CategoryTagUtil type={targetLocation.type} />
          </ResultContentWrapper>
        </ResultContainer>
      </PreviewContent>
    </SheetPage>
  );
};

export default AssistantMarkerResult;
