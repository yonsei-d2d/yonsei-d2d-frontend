import styled from 'styled-components';
import { Alert, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { MapMode } from '../../enums/map-mode.enum';
import { useRouteMap } from '../../contexts/MapContext';
import { SheetPage } from '../bottom-sheet/SheetPage';
import { Mode } from '../../enums/mode.enum';
import { PreviewContent } from '../bottom-sheet/PreviewContent';
import { MainContent } from '../bottom-sheet/MainContent';

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

const AssistantRouteResult = () => {
  const { assistantMessage, routeResponse, setMapMode } = useRouteMap();
  useEffect(() => {
    setMapMode(MapMode.ROUTE);
    return () => {
      setMapMode(MapMode.NONE);
    }
  }, []);
  

  if (!routeResponse) return null;

  return (
    <SheetPage title="경로 안내" mode={Mode.ASSISTANT_MARKER_RESULT}>
        <PreviewContent>
          <Alert variant='primary'>
            {assistantMessage}
          </Alert>
          <RouteInfo>
            <RouteDetail>
              <RouteContentWrapper>
                <h1 style={{color: "#0275d8"}}><strong>{Math.ceil(routeResponse.duration / 60)}</strong></h1>
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
                return <ListGroupItem key={index}><small>{instruction}</small></ListGroupItem>
              })}
            </ListGroup>
          </ResultContainer>
        </MainContent>
    </SheetPage>
  );
};

export default AssistantRouteResult;