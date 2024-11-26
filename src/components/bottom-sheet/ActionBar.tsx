import styled from "styled-components";
import { useSheet } from "../../contexts/SheetContext";
import { Mode } from "../../enums/mode.enum";
import { ChevronLeft, XLg } from "react-bootstrap-icons";

const ActionBarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    height: 20px;
    margin-bottom: 20px;
`

const LeftWrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: start;
`

const CenterWrapper = styled.div`
    display: flex;
    flex: 6;
    justify-content: center;
`

const RightWrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: end;
`

const ButtonWrapper = styled.div`
    width: 20px;
    height: 20px;
`;

export const ActionBar = () => {
    const {title, goBack, goToMainandFlushStack, currentMode } = useSheet();

    const BackButton = () => {
        switch (currentMode) {
            case Mode.MAIN:
            case Mode.SEARCH:
            case Mode.SEARCH_RESULT:
                return null;
            default:
                return <ButtonWrapper onClick={goBack}>
                    <ChevronLeft></ChevronLeft>
                </ButtonWrapper>;
        }
    }


    const CloseButton = () => {
        switch (currentMode) {
            case Mode.ROUTE_RESULT:
            case Mode.SEARCH_RESULT:
                return <ButtonWrapper onClick={goToMainandFlushStack}>
                    <XLg></XLg>
                </ButtonWrapper>;
            default:
                return null;
        }
    }
    return <ActionBarWrapper>
        <LeftWrapper>
            {BackButton()}
        </LeftWrapper>
        <CenterWrapper>
            {title}
        </CenterWrapper>
        <RightWrapper>
            {CloseButton()}
        </RightWrapper>
    </ActionBarWrapper>
}