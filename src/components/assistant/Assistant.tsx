import { Mode } from "../../enums/mode.enum";
import { SheetPage } from "../bottom-sheet/SheetPage";
import { PreviewContent } from "../bottom-sheet/PreviewContent";
import styled from "styled-components";
import { Alert, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { useSheet } from "../../contexts/SheetContext";
import { useEffect, useState } from "react";
import { useRouteMap } from "../../contexts/MapContext";
import { AssistantRequest } from "../../interfaces/assistant-request.interface";
import { AssistantResponse } from "../../interfaces/assistant-response.interface";
import axios from "axios";
import { Robot } from "react-bootstrap-icons";

const SearchContainer = styled.div`
  padding: 0px;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const AssistantForm = styled(InputGroup)`
  margin-bottom: 20px;
  width: 100%;
` as typeof InputGroup;

const SearchButton = styled.button`
  border: none;
  outline: none;
  background-color: #79A8DD;
  color: white;
  height: 2.5em;
  width: 200px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:invalid {
    background-color: #79A8DD;
  }
  &:active {
    background-color: #003876;
  }
`;

const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Assistant = () => {
  const { hideSearchBar, setHideSearchBar } = useSheet();
  useEffect(() => {
    if (!hideSearchBar) setHideSearchBar(true);
    return () => {
      setHideSearchBar(false);
    };
  }, []);

  const {
    assistantMessage,
    setTargetLocation,
    setRouteResponse,
    setAssistantMessage,
  } = useRouteMap();
  const { goTo } = useSheet();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const query = (form.elements.namedItem("query") as HTMLInputElement).value;
    const request: AssistantRequest = { query };

    try {
      setIsLoading(true);
      setIsError(false);
      const { data } = await axios.post<AssistantResponse>(
        (process.env.REACT_APP_ENDPOINT || "") + "/assistant",
        request,
        { headers: { "Content-Type": "application/json" } }
      );
      setAssistantMessage(data.answer);
      if (data?.route) {
        setRouteResponse(data.route);
        goTo(Mode.ASSISTANT_ROUTE_RESULT);
      } else if (data?.location) {
        setTargetLocation(data.location);
        goTo(Mode.ASSISTANT_MARKER_RESULT);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setAssistantMessage("요청을 처리하는 중 오류가 발생했어요.");
      setRouteResponse(null);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SheetPage title="AI 챗봇" mode={Mode.ASSISTANT}>
      {isLoading ? (
        <PreviewContent>
          <LoadingWrapper>
            <div className="spinner-grow text-secondary"></div>
            <div style={{ margin: "10px" }}></div>
            AI가 요청을 분석하고 있어요.
          </LoadingWrapper>
        </PreviewContent>
      ) : (
        <>
          <PreviewContent>
            {isError ? (
              <Alert variant="danger">{assistantMessage}</Alert>
            ) : (
              <></>
            )}
            <SearchContainer>
              <Form onSubmit={handleSubmit}>
                <AssistantForm>
                  <Form.Control
                    type="text"
                    name="query"
                    placeholder="예) 공학관에서 경영관 가는 길에 카페 들리고 싶어"
                    required
                  />
                </AssistantForm>
                <div style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <SearchButton type="submit">
                    요청하기&nbsp;&nbsp;
                    <Robot></Robot>
                  </SearchButton>
                </div>
              </Form>
            </SearchContainer>
          </PreviewContent>
        </>
      )}
    </SheetPage>
  );
};
