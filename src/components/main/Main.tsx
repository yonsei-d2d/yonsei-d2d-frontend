import { ListGroup, ListGroupItem } from "react-bootstrap";
import { PreviewContent } from "../bottom-sheet/PreviewContent"
import { Mode } from "../../enums/mode.enum";
import { useSheet } from "../../contexts/SheetContext";
import { SheetPage } from "../bottom-sheet/SheetPage";

export const Main = () => {
    
    const { goTo } = useSheet();

    

    const SheetPageRouter = ({name, mode}: {mode: Mode, name: string}) => {
        return <ListGroupItem onClick={() => goTo(mode)}>{name}</ListGroupItem>;
    }

    return (
        <SheetPage title="Yonsei Door2Door" mode={Mode.MAIN}>
            <PreviewContent>
                <ListGroup>
                    <SheetPageRouter name="📍 강의실 길찾기" mode={Mode.ROUTE}/>
                    <SheetPageRouter name="✨ AI Assistant" mode={Mode.ASSISTANT}/>
                </ListGroup>
            </PreviewContent>
        </SheetPage>
    )
}