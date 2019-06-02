import React from "react";
import UsersService from "../../services/toggl/UsersService";
import WorkspacesService from "../../services/toggl/WorkspacesSerivce";

export default class TogglLogin extends React.Component {
    public async componentDidMount() {
        const workspaces = await WorkspacesService.getWorkspaces();
        /* tslint:disable-next-line: no-console*/
        console.log(JSON.stringify(workspaces, undefined, 2));
        const currentUser = await UsersService.getCurrentUser();
        /* tslint:disable-next-line: no-console*/
        console.log(JSON.stringify(currentUser, undefined, 2));
    }

    public render(): React.ReactElement {
        return <div />;
    }
}
