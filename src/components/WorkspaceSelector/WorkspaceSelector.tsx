import { Select } from "antd";
import * as React from "react";
import { useCallback } from "react";
import { Workspace } from "../../models/Workspace";
import { styles } from "./WorkspaceSelector.styles";

interface IWorkspaceSelectorProps {
    readonly onChange: (newWorkspaceId: number | undefined) => void;
    readonly selectedWorkspaceId: number | undefined;
    readonly workspaces: Workspace[];
    readonly className?: string;
}

const WorkspaceSelector: React.FC<IWorkspaceSelectorProps> = (props) => {
    const { onChange, className, workspaces, selectedWorkspaceId } = props;

    const handleOptionChange = useCallback((workspaceId: number | undefined) => {
        if (onChange) {
            onChange(workspaceId);
        }
    }, [onChange]);

    return (
        <Select
            className={className}
            style={styles.select}
            placeholder="Select a Toggl workspace"
            defaultActiveFirstOption={false}
            value={selectedWorkspaceId}
            onChange={handleOptionChange}
        >
            {workspaces.map(renderWorkspace)}
        </Select>
    );
};

function renderWorkspace(workspace: Workspace): React.ReactNode {
    return (
        <Select.Option value={workspace.id} key={workspace.id}>
            {workspace.name}
        </Select.Option>
    );
}

WorkspaceSelector.defaultProps = {
    className: "",
};

export default WorkspaceSelector;
