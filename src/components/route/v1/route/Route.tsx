import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { Button, Form, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { useRouteMap } from "../../../../contexts/MapContext";
import { useSheet } from "../../../../contexts/SheetContext";
import { RouteRequest } from "../../../../interfaces/route-request.interface";
import { RouteType } from "../../../../enums/route-type.enum";
import { RouteResponse } from "../../../../interfaces/route-response.interface";
import { Mode } from "../../../../enums/mode.enum";
import { SheetPage } from "../../../bottom-sheet/SheetPage";
import { PreviewContent } from "../../../bottom-sheet/PreviewContent";

const SearchContainer = styled.div`
  padding: 0px;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const RouteForm = styled(InputGroup)`
  margin-bottom: 20px;
  width: 100%;
` as typeof InputGroup;

const SearchButton = styled(Button)`
  width: 100%;
` as typeof Button;

const LoadingWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

export const Route = () => {
  const { setRouteResponse } = useRouteMap();
  const { goTo } = useSheet();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const origin = (form.elements.namedItem("origin") as HTMLInputElement)
      .value;
    const destination = (
      form.elements.namedItem("destination") as HTMLInputElement
    ).value;
    const request: RouteRequest = {
      origin: {
        routeType: RouteType.ROOM,
        room: origin,
      },
      destination: {
        routeType: RouteType.ROOM,
        room: destination,
      },
    };

    try {
      setIsLoading(true);
      const { data } = await axios.post<RouteResponse>(
        (process.env.REACT_APP_ENDPOINT || "") + "/route",
        request,
        { headers: { "Content-Type": "application/json" } }
      );
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
    <SheetPage title="강의실 길찾기" mode={Mode.ROUTE}>
      {isLoading ? (
        <PreviewContent>
          <LoadingWrapper>경로를 탐색중입니다</LoadingWrapper>
        </PreviewContent>
      ) : (
        <PreviewContent>
          <SearchContainer>
            <Form onSubmit={handleSubmit}>
              <RouteForm>
                <Form.Control
                  type="text"
                  name="origin"
                  placeholder="출발 강의실"
                  required
                />
                <InputGroupText>→</InputGroupText>
                <Form.Control
                  type="text"
                  name="destination"
                  placeholder="도착 강의실"
                  required
                />
              </RouteForm>

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
