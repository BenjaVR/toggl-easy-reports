import { createStyles, ellipsisText, verticalCenterStyles } from "../../../utilities/styles";

const navBarMargin = 25;

export const styles = createStyles({
    avatarContainer: {
        left: navBarMargin,
        ...verticalCenterStyles,
    },
    navbarCenter: {
        textAlign: "center",
    },
    navbarTitle: {
        color: "white",
        textTransform: "uppercase",
        padding: "0 10px",
        ...ellipsisText,
    },
    optionsContainer: {
        marginTop: 5,
        right: navBarMargin,
        ...verticalCenterStyles,
    },
});
