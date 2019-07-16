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
                    <Col key={project.id} xs={24} md={12} lg={8} xxl={6}>
                        <TogglReportProject project={project} />
                    </Col>
                ))}
            </Row>
        </Card>
    );
};

function getTogglReportTitle(report: Report): React.ReactNode {
    const duration = moment.duration(report.totalTimeInMilliseconds - 600000, "milliseconds");
    return (
        <span>
            Total time: <b>{padLeft(duration.hours(), 2)}</b>h<b>{padLeft(duration.minutes(), 2)}</b>
        </span>
    );
}

export default TogglReport;
