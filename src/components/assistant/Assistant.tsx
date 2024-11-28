import { Mode } from "../../enums/mode.enum";
import { SheetPage } from "../bottom-sheet/SheetPage";
import { PreviewContent } from "../bottom-sheet/PreviewContent";
import styled from "styled-components";
import { Button, Form, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { useSheet } from "../../contexts/SheetContext";
import { useEffect } from "react";


const SearchContainer = styled.div`
  padding: 0px;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const AssistantForm = styled(InputGroup)`
  margin-bottom: 20px;
  width: 100%;
`as typeof InputGroup;

const SearchButton = styled(Button)`
  width: 100%;
` as typeof Button;

export const Assistant = () => {
    const {hideSearchBar, setHideSearchBar} = useSheet();
    useEffect(() => {
      if (!hideSearchBar) setHideSearchBar(true);
    return () => {
      setHideSearchBar(false);
    };
    }, [])
    return (
      <SheetPage title="AI Assistant" mode={Mode.ASSISTANT}>
          <PreviewContent>
            <SearchContainer>
              <Form >
                <AssistantForm>
                    <InputGroupText>✨</InputGroupText>
                    <Form.Control
                        type="text"
                        name="query"
                        placeholder="공학관에서 경영관 가는 길에 카페 들리고 싶어"
                        required
                    />
                </AssistantForm>
                <SearchButton variant="primary" type="submit">
                  요청 하기
                </SearchButton>
              </Form>
            </SearchContainer>
          </PreviewContent>
      </SheetPage>
    );
}