import { Card, Col, Row } from "antd";
import * as React from "react";
import { Report } from "../../models/Report";
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

function getTogglReportTitle(report: Report): string {
    return `Total time: ${report.totalTimeInHours} hours`;
}

export default TogglReport;
