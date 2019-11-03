import { Card, message } from "antd";
import moment from "moment";
import * as React from "react";
import { ReportProject } from "../../../models/ReportProject";
import { styles } from "./TogglReportProject.styles";

interface ITogglReportProjectProps {
    readonly project: ReportProject;
    readonly projectDurationInMinutes: number;
}

const TogglReportProject: React.FC<ITogglReportProjectProps> = (props) => {
    const { project, projectDurationInMinutes } = props;

    const handleCardClick = React.useCallback(
        async () => {
            message.destroy();
            try {
                await navigator.clipboard.writeText(project.timeEntriesSummary);
                message.success("Task content is copied to the clipboard!");
            } catch (error) {
                message.error(`Could not copy task content to the clipboard: ${error}`);
            }
        },
        [project.timeEntriesSummary],
    );

    return (
        <Card
            style={styles.projectCard}
            type="inner"
            title={renderProjectTitle(project)}
            extra={renderProjectDescription(projectDurationInMinutes)}
            hoverable={true}
            onClick={handleCardClick}
        >
            <span style={styles.timeEntriesSummary}>
                {project.timeEntriesSummary}
            </span>
        </Card>
    );
};

function renderProjectTitle(project: ReportProject): React.ReactNode {
    return (
        <div>
            <span style={styles.fatProjectTitleLine}>{project.title}</span>
            <span style={styles.projectTitleLine}>{project.client}</span>
        </div>
    );
}

function renderProjectDescription(durationInMinutes: number): React.ReactNode {
    return (
        <span>
            <b>{moment.duration().add(durationInMinutes, "minutes").asHours().toFixed(2)}</b> hours
        </span>
    );
}

export default TogglReportProject;
