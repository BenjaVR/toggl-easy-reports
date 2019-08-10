import { Card, Col, Row, Spin } from "antd";
import * as moment from "moment";
import * as React from "react";
import { Report } from "../../models/Report";
import { ReportProject } from "../../models/ReportProject";
import { padLeft } from "../../utilities/padLeft";
import { styles } from "./TogglReport.styles";
import { TogglReportProject } from "./TogglReportProject";

interface ITogglReportProps {
    readonly report: Report | undefined;
}

const TogglReport: React.FunctionComponent<ITogglReportProps> = ({ report }) => {
    if (report === undefined) {
        return (
            <Card title="Loading report...">
                <Spin style={styles.loadingSpinner} />
            </Card>
        );
    }
    return (
        <Card title={renderTogglReportTitle(report)}>
            <Row gutter={8}>
                {report.projects.map(renderTogglReportColumn)}
            </Row>
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
        <Col key={project.id} sm={24} lg={12} xxl={8}>
            <TogglReportProject project={project} />
        </Col>
    );
}

export default TogglReport;
