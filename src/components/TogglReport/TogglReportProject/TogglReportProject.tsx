import { Card } from "antd";
import * as React from "react";
import { ReportProject } from "../../../models/ReportProject";
import { styles } from "./TogglReportProject.styles";

interface ITogglReportProjectProps {
    readonly project: ReportProject;
}

const TogglReportProject: React.FunctionComponent<ITogglReportProjectProps> = ({ project }) => {
    return (
        <Card
            style={styles.projectCard}
            type="inner"
            title={getProjectTitle(project)}
            extra={getDescription(project)}
            hoverable={true}
        >
            <ul>
                {project.timeEntries.map(timeEntry => (
                    <li key={timeEntry.title}>{timeEntry.title}</li>
                ))}
            </ul>
        </Card>
    );
};

function getProjectTitle(project: ReportProject): React.ReactNode {
    return (
        <div>
            <span style={styles.fatProjectTitleLine}>{project.title}</span>
            <span style={styles.projectTitleLine}>{project.client}</span>
        </div>
    );
}

function getDescription(project: ReportProject): React.ReactNode {
    return (
        <span>
            <b>{project.timeInHours}</b> hours
        </span>
    );
}

export default TogglReportProject;
