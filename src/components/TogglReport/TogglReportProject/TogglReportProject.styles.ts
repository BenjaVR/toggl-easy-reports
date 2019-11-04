import { CSSProperties } from "react";
import { createStyles, ellipsisText } from "../../../utilities/styles";

const cardMargin = 4;

const projectTitleLineStyles: CSSProperties = {
    ...ellipsisText,
    display: "block",
};

export const styles = createStyles({
    projectCard: {
        marginBottom: cardMargin,
    },
    projectTitleLine: {
        ...projectTitleLineStyles,
    },
    fatProjectTitleLine: {
        ...projectTitleLineStyles,
        fontWeight: "bold",
    },
    timeEntriesSummary: {
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
    },
});
