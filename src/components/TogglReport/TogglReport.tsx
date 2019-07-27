import { Card, Col, Row } from "antd";
import * as moment from "moment";
import * as React from "react";
import { Report } from "../../models/Report";
import { padLeft } from "../../utilities/padLeft";
import { TogglReportProject } from "./TogglReportProject";

interface ITogglReportProps {
    readonly report: Report;
}

const TogglReport: React.FunctionComponent<ITogglReportProps> = ({ report }) => {
    return (
        <Card title={getTogglReportTitle(report)}>
            <Row gutter={8}>
                {report.projects.map(project => (
                    <Col key={project.id} sm={24} lg={12} xxl={8}>
                        <TogglReportProject project={project} />
                    </Col>
                ))}
            </Row>
        </Card>
    );
};

function getTogglReportTitle(report: Report): React.ReactNode {
    const duration = moment.duration(report.totalTimeInMilliseconds, "milliseconds");
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) - hours * 60;
    return (
        <span>
            Total time: <b>{padLeft(hours, 2)}</b>h<b>{padLeft(minutes, 2)}</b>
        </span>
    );
}

export default TogglReport;
