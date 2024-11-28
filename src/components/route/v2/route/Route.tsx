import { useRouteMap } from "../../../../contexts/MapContext";
import { RouteRequest } from "../../../../interfaces/route-request.interface";
import { RouteResponse } from "../../../../interfaces/route-response.interface";
import axios from "axios";
import { Mode } from "../../../../enums/mode.enum";
import { useSheet } from "../../../../contexts/SheetContext";
import { useEffect, useState } from "react";
import { SheetPage } from "../../../bottom-sheet/SheetPage";
import { PreviewContent } from "../../../bottom-sheet/PreviewContent";
import styled from "styled-components";
import {
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { RouteEntry } from "./RouteEntry";

const SearchContainer = styled.div`
  padding: 0px;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const SearchButton = styled(Button)`
  width: 100%;
` as typeof Button;

const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Route = () => {
  const { routeOrigin, routeDestination, setRouteResponse } = useRouteMap();
  const { hideSearchBar, setHideSearchBar } = useSheet();
  const { goTo } = useSheet();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!hideSearchBar) setHideSearchBar(true);
    return () => {
      setHideSearchBar(false);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const request: RouteRequest = {
      origin: routeOrigin,
      destination: routeDestination,
    }

    try {
      setIsLoading(true);
      const { data } = await axios.post<RouteResponse>("/route", request, {
        headers: { "Content-Type": "application/json" },
      });
      setRouteResponse(data);
      goTo(Mode.ROUTE_RESULT);
    } catch (error) {
      setRouteResponse(null);
      goTo(Mode.ROUTE_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SheetPage title="길찾기" mode={Mode.ROUTE}>
      {isLoading ? (
        <PreviewContent>
          <LoadingWrapper>
            <Spinner></Spinner>
            경로를 탐색중입니다
          </LoadingWrapper>
        </PreviewContent>
      ) : (
        <PreviewContent>
          <SearchContainer>
            <Form onSubmit={handleSubmit}>
              <RouteEntry target="origin"></RouteEntry>
              <RouteEntry target="destination"></RouteEntry>
              <SearchButton variant="primary" type="submit">
                경로 검색
              </SearchButton>
            </Form>
          </SearchContainer>
        </PreviewContent>
      )}
    </SheetPage>
  );
};
