import styled from "styled-components";
import { Alert, ListGroup, ListGroupItem } from "react-bootstrap";
import { useEffect, useState } from "react";
import { MapMode } from "../../enums/map-mode.enum";
import { useRouteMap } from "../../contexts/MapContext";
import { SheetPage } from "../bottom-sheet/SheetPage";
import { Mode } from "../../enums/mode.enum";
import { PreviewContent } from "../bottom-sheet/PreviewContent";
import { MainContent } from "../bottom-sheet/MainContent";
import { ChevronDoubleDown, Flag, Geo, GeoAlt, PersonWalking } from "react-bootstrap-icons";


const ResultContainer = styled.div`
  height: 100%;
  overflow: scroll;
  padding: 0px;
`;
const RouteInfo = styled.div`
  display: flex;
  margin: 10px 0;
`;

const WaypointListWrapper = styled.div`
  display: flex;
  margin: 10px 0;
  align-items: center;
`;

const WaypointWalkListWrapper = styled.div`
  display: flex;
  margin: 10px 0;
  align-items: center;
`;

const WaypointIconWrapper = styled.div`
  font-size: 1.2em;
  margin-right: 10px;
`;


const WaypointWalkIconWrapper = styled.div`
  font-size: 1em;
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
    };
  }, []);

  if (!routeResponse) return null;

  const stopoverNameMap: Record<string, boolean> = {};
  for (const stopover of routeResponse.stopovers) stopoverNameMap[stopover.name] = true;

  return (
    <SheetPage title="경로 안내" mode={Mode.ASSISTANT_ROUTE_RESULT}>
      <PreviewContent>
        <Alert variant="primary">{assistantMessage}</Alert>
        <RouteInfo>
          {
            routeResponse.stopovers.map((e, i) => {
              if (i === routeResponse.stopovers.length - 1) return <small key={i}>{e.name}</small>
              else return <small key={i}>{`${e.name} →`}&nbsp;</small>
            })
          }
        </RouteInfo>
        <RouteDetail>
          <RouteContentWrapper>
            <h1 style={{ color: "#79A8DD", margin: '0' }}>
              <strong>{Math.ceil(routeResponse.duration / 60)}</strong>
            </h1>
            <h1 style={{ margin: '0' }}>분</h1>
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              marginLeft: '10px'
            }}>({Math.round(routeResponse.distance)}m)</div>
          </RouteContentWrapper>
        </RouteDetail>
      </PreviewContent>
      <MainContent>
        <ResultContainer>
          {routeResponse.waypoints.map((e, index) => {
            if (index < routeResponse.waypoints.length - 1) {
              return (
                <>
                <WaypointListWrapper key={index}>
                  { stopoverNameMap?.[e.name] ? 
                    <WaypointIconWrapper>
                      <GeoAlt></GeoAlt>
                    </WaypointIconWrapper> :
                  "" }
                  { stopoverNameMap?.[e.name] ? <strong>{e.name}</strong> : <div>{e.name}</div> }
                  { e.level ? <small style={{color: "gray"}}>&nbsp;{`${e.level}층`.replace('-', '지하')}</small> : "" }
                </WaypointListWrapper>
                <WaypointWalkListWrapper>
                  <WaypointIconWrapper>
                    <ChevronDoubleDown color="#79A8DD"></ChevronDoubleDown>
                  </WaypointIconWrapper>
                  <WaypointWalkIconWrapper>
                    <PersonWalking></PersonWalking>
                  </WaypointWalkIconWrapper>
                  <small style={{color: "gray"}}>&nbsp;도보 이동</small>
                </WaypointWalkListWrapper>
                </>
              );
            } else {
              return (
                <WaypointListWrapper key={index}>
                  <WaypointIconWrapper>
                    <Flag></Flag>
                  </WaypointIconWrapper>
                  <strong>{e.name}</strong>
                  { e.level ? <small style={{color: "gray"}}>&nbsp;{`${e.level}층`.replace('-', '지하')}</small> : "" }
                </WaypointListWrapper>
              );
            }
          })}
        </ResultContainer>
      </MainContent>
    </SheetPage>
  );
};

export default AssistantRouteResult;
