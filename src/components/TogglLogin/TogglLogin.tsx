import React from "react";
import WorkspacesService from "../../services/toggl/WorkspacesSerivce";

export default class TogglLogin extends React.Component {
    public async componentDidMount() {
        const workspaces = await WorkspacesService.getWorkspaces();
        // console.log(workspaces);
    }

    public render(): React.ReactElement {
        return <div />;
    }
}
