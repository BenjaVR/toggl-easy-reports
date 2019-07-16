import { Select } from "antd";
import * as React from "react";
import { Workspace } from "../../models/Workspace";
import { BindThis } from "../../utilities/BindThis";
import { styles } from "./WorkspaceSelector.styles";

interface IWorkspaceSelectorProps {
    readonly onChange: (newWorkspaceId: number | undefined) => void;
    readonly selectedWorkspaceId: number | undefined;
    readonly workspaces: Workspace[];
}

class WorkspaceSelector extends React.Component<IWorkspaceSelectorProps> {
    public render(): React.ReactNode {
        const { selectedWorkspaceId, workspaces } = this.props;

        return (
            <Select
                style={styles.select}
                placeholder="Select a Toggl workspace"
                defaultActiveFirstOption={false}
                value={selectedWorkspaceId}
                onChange={this.handleOptionChange}
            >
                {workspaces.map(this.renderSelectOption)}
            </Select>
        );
    }

    @BindThis()
    private renderSelectOption(workspace: Workspace): React.ReactNode {
        return (
            <Select.Option value={workspace.id} key={workspace.id}>
                {workspace.name}
            </Select.Option>
        );
    }

    @BindThis()
    private handleOptionChange(newWorkspaceId: number | undefined): void {
        if (this.props.onChange) {
            this.props.onChange(newWorkspaceId);
        }
    }
}

export default WorkspaceSelector;
