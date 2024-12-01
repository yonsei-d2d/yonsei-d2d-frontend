import { ListGroup, ListGroupItem } from "react-bootstrap";
import { PreviewContent } from "../bottom-sheet/PreviewContent";
import { Mode } from "../../enums/mode.enum";
import { useSheet } from "../../contexts/SheetContext";
import { SheetPage } from "../bottom-sheet/SheetPage";
import styled from "styled-components";
import { MainContent } from "../bottom-sheet/MainContent";
import { useEffect } from "react";
import { Cursor, Geo, GeoAlt, Robot } from "react-bootstrap-icons";

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  aspect-ratio: 1 / 1;
  width: auto;
  height: 100%;
  text-align: center;
`;
const DescWrapper = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Main = () => {
  const { goTo, setIsExpanded } = useSheet();

  useEffect(() => {
    setIsExpanded(true);
  }, []);

  return (
    <SheetPage title="Yonsei Door2Door" mode={Mode.MAIN}>
      <MainContent>
        <ListGroup>
          <ListGroup.Item action onClick={() => goTo(Mode.ROUTE)}>
            <ItemWrapper>
              <IconWrapper>
                <Cursor color="#79A8DD"></Cursor>
              </IconWrapper>
              <DescWrapper>
                <h5 className="mb-1">길찾기</h5>
                <small>강의실, 장소 이름으로 길찾기</small>
              </DescWrapper>
            </ItemWrapper>
          </ListGroup.Item>
          <ListGroup.Item action onClick={() => goTo(Mode.ASSISTANT)}>
            <ItemWrapper>
              <IconWrapper>
                <Robot color="#79A8DD"></Robot>
              </IconWrapper>
              <DescWrapper>
                <h5 className="mb-1">AI 챗봇</h5>
                <small>AI에게 요청하기</small>
              </DescWrapper>
            </ItemWrapper>
          </ListGroup.Item>
        </ListGroup>
      </MainContent>
    </SheetPage>
  );
};
