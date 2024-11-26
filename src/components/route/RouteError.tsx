import styled from "styled-components";
import { Mode } from "../../enums/mode.enum";
import { PreviewContent } from "../bottom-sheet/PreviewContent";
import { SheetPage } from "../bottom-sheet/SheetPage";


const ErrorWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
`;

export const RouteError = () => {
    return (
        <SheetPage title="오류" mode={Mode.ROUTE_ERROR}>
            <PreviewContent>
                <ErrorWrapper>
                    <h3>경로를 찾을 수 없습니다.</h3>
                    <div>올바른 강의실 이름을 입력해주세요.</div>
                </ErrorWrapper>
            </PreviewContent>
        </SheetPage>
    );
}