import React, { CSSProperties } from "react";

export type Style<T> = { [K in keyof T]: CSSProperties };
export function createStyles<T>(styles: Style<T>): Style<T> {
    return styles;
}

export const verticalCenterStyles: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
};

export const ellipsisText: React.CSSProperties = {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
};
