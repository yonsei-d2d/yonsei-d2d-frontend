import React, { useEffect } from "react"
import { Mode } from "../../enums/mode.enum";
import { useSheet } from "../../contexts/SheetContext";

interface SheetPageProps {
    title: string;
    mode: Mode;
    children: React.ReactNode;
}

export const SheetPage = (props: SheetPageProps) => {
    const { setTitle, pushPageStack } = useSheet();

    useEffect(() => {
        setTitle(props.title);
        pushPageStack(props.mode);
    }, [])

    return <>
        {props.children}
    </>
}