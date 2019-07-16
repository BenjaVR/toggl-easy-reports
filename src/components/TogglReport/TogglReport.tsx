import { Card } from "antd";
import * as React from "react";
import { Report } from "../../models/Report";

interface ITogglReportProps {
    readonly report: Report;
}

const TogglReport: React.FunctionComponent<ITogglReportProps> = ({ report }) => {
    return <Card title={getTogglReportTitle(report)} />;
};

function getTogglReportTitle(report: Report): string {
    return `Total time: ${report.totalTimeInHours} hours`;
}

export default TogglReport;
