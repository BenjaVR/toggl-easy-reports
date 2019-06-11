import { createStyles, verticalCenterStyles } from "../../utilities/styles";

export const styles = createStyles({
    avatarContainer: {
        left: 15,
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
        right: 15,
        ...verticalCenterStyles,
    },
});
