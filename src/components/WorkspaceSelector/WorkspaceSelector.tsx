import { Select } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IWorkspace } from "../../services/toggl/UsersService";
import { IApplicationState } from "../../stores/rootReducer";
import { selectWorkspace, WorkspaceAction } from "../../stores/workspaces/actions";
import { BindThis } from "../../utilities/BindThis";
import { styles } from "./WorkspaceSelector.styles";

type WorkspaceSelectorProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class WorkspaceSelector extends React.Component<WorkspaceSelectorProps> {
    public render(): React.ReactNode {
        return (
            <Select
                style={styles.select}
                placeholder="Select a Toggl workspace"
                defaultActiveFirstOption={false}
                value={this.props.selectedWorkspaceId}
                onChange={this.handleOptionChange}
            >
                {this.props.workspaces.map(this.renderSelectOption)}
            </Select>
        );
    }

    @BindThis()
    private renderSelectOption(workspace: IWorkspace): React.ReactNode {
        return (
            <Select.Option value={workspace.id} key={workspace.id}>
                {workspace.name}
            </Select.Option>
        );
    }

    @BindThis()
    private handleOptionChange(newWorkspaceId: number | undefined): void {
        this.props.selectWorkspace(newWorkspaceId);
    }
}

function mapStateToProps(state: IApplicationState) {
    return {
        workspaces: state.workspaces.workspaces,
        selectedWorkspaceId: state.workspaces.selectedWorkspaceId,
    };
}

function mapDispatchToProps(dispatch: Dispatch<WorkspaceAction>) {
    return {
        selectWorkspace: (workspaceId: number | undefined) => dispatch(selectWorkspace(workspaceId)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WorkspaceSelector);
