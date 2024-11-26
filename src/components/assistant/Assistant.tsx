import { Mode } from "../../enums/mode.enum";
import { SheetPage } from "../bottom-sheet/SheetPage";
import { PreviewContent } from "../bottom-sheet/PreviewContent";
import styled from "styled-components";
import { Button, Form, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";


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
                        placeholder="질문 입력"
                        required
                    />
                </AssistantForm>
                <SearchButton variant="primary" type="submit">
                  질문 하기
                </SearchButton>
              </Form>
            </SearchContainer>
          </PreviewContent>
      </SheetPage>
    );
}