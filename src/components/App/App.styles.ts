import { createStyles, verticalCenterStyles } from "../../utilities/styles";

const appBarMargin = 25;

export const styles = createStyles({
    layout: {
        height: "100vh",
    },
    avatarContainer: {
        left: appBarMargin,
        ...verticalCenterStyles,
    },
    content: {
        padding: "0 50px",
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
