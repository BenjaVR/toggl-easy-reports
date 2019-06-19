import { createStyles, ellipsisText, verticalCenterStyles } from "../../utilities/styles";

const appBarMargin = 25;

export const styles = createStyles({
    layout: {
        height: "100vh",
    },
    avatarContainer: {
        left: appBarMargin,
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
    content: {
        padding: "35px 50px",
        backgroundColor: "white",
        textAlign: "center",
    },
    loadingSpinner: {
        ...verticalCenterStyles,
    },
    footer: {
        textAlign: "center",
    },
    header: {
        height: 58,
        position: "relative",
    },
    innerContent: {
        background: "#fff",
        minHeight: 100,
        padding: 24,
    },
    optionsContainer: {
        marginTop: 5,
        right: appBarMargin,
        ...verticalCenterStyles,
    },
});
