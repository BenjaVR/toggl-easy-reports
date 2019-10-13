import { Card, Spin } from "antd";
import * as moment from "moment";
import * as React from "react";
import { Report } from "../../models/Report";
import { ReportProject } from "../../models/ReportProject";
import { padLeft } from "../../utilities/padLeft";
import styles from "./TogglReport.module.scss";
import { TogglReportProject } from "./TogglReportProject";

interface ITogglReportProps {
    readonly report: Report | undefined;
}

const TogglReport: React.FC<ITogglReportProps> = ({ report }) => {
    if (report === undefined) {
        return (
            <Card title="Loading report...">
                <Spin className={styles.loadingSpinner} />
            </Card>
        );
    }
    return (
        <Card title={renderTogglReportTitle(report)} className={styles.projectsGrid}>
            {report.projects.map(renderTogglReportColumn)}
        </Card>
    );
};

function renderTogglReportTitle(report: Report): React.ReactNode {
    const duration = moment.duration(report.totalTimeInMilliseconds, "milliseconds");
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) - hours * 60;
    return (
        <span>
            Total time: <b>{padLeft(hours, 2)}</b>h<b>{padLeft(minutes, 2)}</b>
        </span>
    );
}

function renderTogglReportColumn(project: ReportProject): React.ReactNode {
    return (
        <div key={project.id} className={styles.project}>
            <TogglReportProject project={project} />
        </div>
    );
}

export default TogglReport;
