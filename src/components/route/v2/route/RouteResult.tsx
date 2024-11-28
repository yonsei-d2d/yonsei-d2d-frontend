import styled from "styled-components";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useRouteMap } from "../../../../contexts/MapContext";
import { MainContent } from "../../../bottom-sheet/MainContent";
import { PreviewContent } from "../../../bottom-sheet/PreviewContent";
import { useEffect } from "react";
import { SheetPage } from "../../../bottom-sheet/SheetPage";
import { Mode } from "../../../../enums/mode.enum";
import { MapMode } from "../../../../enums/map-mode.enum";

const ResultContainer = styled.div`
  padding: 0px;
`;
const RouteInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RouteDetail = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RouteContentWrapper = styled.div`
  margin: 0;
  display: flex;
`;

const RouteResult = () => {
  const { routeResponse, setMapMode } = useRouteMap();

  useEffect(() => {
    setMapMode(MapMode.ROUTE);
    return () => {
      setMapMode(MapMode.NONE);
    };
  }, []);

  if (!routeResponse) return null;

  return (
    <SheetPage title="경로 안내" mode={Mode.ROUTE_RESULT}>
      <PreviewContent>
        <RouteInfo>
          <RouteDetail>
            <RouteContentWrapper>
              <h1 style={{ color: "#0275d8" }}>
                <strong>{Math.ceil(routeResponse.duration / 60)}</strong>
              </h1>
              <h1>분</h1>
            </RouteContentWrapper>
            <div>{Math.round(routeResponse.distance)}m</div>
          </RouteDetail>
        </RouteInfo>
      </PreviewContent>
      <MainContent>
        <ResultContainer>
          <ListGroup>
            {routeResponse.guide.map((instruction, index) => {
              if (index === routeResponse.guide.length - 1) return null;
              return (
                <ListGroupItem key={index}>
                  <small>{instruction}</small>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </ResultContainer>
      </MainContent>
    </SheetPage>
  );
};

export default RouteResult;
