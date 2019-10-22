import { Card, Col, Row, Spin } from "antd";
import moment from "moment";
import * as React from "react";
import { useSettings } from "../../context/SettingsContext";
import { Report } from "../../models/Report";
import {
    IRoundedProjectDuration,
    roundReportProjectsDownToMinutes,
} from "../../services/ReportProjectRoundedHoursService";
import { padLeft } from "../../utilities/padLeft";
import { styles } from "./TogglReport.styles";
import { TogglReportProject } from "./TogglReportProject";

interface ITogglReportProps {
    readonly report: Report | undefined;
}

const TogglReport: React.FC<ITogglReportProps> = (props) => {
    const { report } = props;
    const { roundProjectDurationsDownToMinutes } = useSettings();

    if (report === undefined) {
        return (
            <Card title="Loading report...">
                <Spin style={styles.loadingSpinner} />
            </Card>
        );
    }

    const roundedProjectDurations = roundReportProjectsDownToMinutes(
        report.projects,
        roundProjectDurationsDownToMinutes,
    );
    const totalRoundedDurationInMinutes = roundedProjectDurations.reduce((total, duration) => {
        return total + duration.roundedMinutes;
    }, 0);

    return (
        <Card title={renderTogglReportTitle(report, totalRoundedDurationInMinutes)}>
            <Row gutter={8}>{roundedProjectDurations.map(renderTogglReportColumn)}</Row>
        </Card>
    );
};

function renderTogglReportTitle(report: Report, roundedDurationInMinutes: number): React.ReactNode {
    const duration = moment.duration(report.totalTimeInMilliseconds, "milliseconds");
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) - hours * 60;

    const roundedDuration = moment.duration(roundedDurationInMinutes, "minutes");
    const roundedHours = Math.floor(roundedDuration.asHours());
    const roundedMinutes = Math.floor(roundedDuration.asMinutes()) - hours * 60;

    return (
        <span>
            Total time: <b>{padLeft(hours, 2)}</b>h<b>{padLeft(minutes, 2)}</b>
            {/*Only show the extra rounded info if rounded does not equal original:*/}
            {duration.asMilliseconds() !== roundedDuration.asMilliseconds() && (
                <>
                    &nbsp;
                    <i>
                        <small>
                            (rounded: {padLeft(roundedHours, 2)}h{padLeft(roundedMinutes, 2)})
                        </small>
                    </i>
                </>
            )}
        </span>
    );
}

function renderTogglReportColumn(roundedProjectDuration: IRoundedProjectDuration): React.ReactNode {
    return (
        <Col key={roundedProjectDuration.reportProject.id} sm={24} lg={12} xxl={8}>
            <TogglReportProject
                project={roundedProjectDuration.reportProject}
                projectDurationInMinutes={roundedProjectDuration.roundedMinutes}
            />
        </Col>
    );
}

export default TogglReport;
