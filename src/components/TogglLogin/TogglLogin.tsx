import React from "react";

export default class TogglLogin extends React.Component {
    public componentDidMount() {
        fetch("https://www.toggl.com/api/v9/me/cors", {
            method: "POST",
            headers: {
                authorization: "{TODO:APIKEYHERE}:api_token",
            },
        })
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.error(error);
            });
    }

    public render(): React.ReactElement {
        return <div />;
    }
}
