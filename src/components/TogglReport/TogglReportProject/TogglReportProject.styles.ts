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
        marginTop: cardMargin,
    },
    projectTitleLine: {
        ...projectTitleLineStyles,
    },
    fatProjectTitleLine: {
        ...projectTitleLineStyles,
        fontWeight: "bold",
    },
});
