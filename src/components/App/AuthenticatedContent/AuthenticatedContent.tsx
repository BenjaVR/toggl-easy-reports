import { Collapse, DatePicker, Divider, message } from "antd";
import moment from "moment";
import * as React from "react";
import { Report } from "../../../models/Report";
import { User } from "../../../models/User";
import { LocaleManager } from "../../../services/locale/LocaleManager";
import { ReportsService } from "../../../services/toggl/ReportsService";
import { BindThis } from "../../../utilities/BindThis";
import { TogglReport } from "../../TogglReport";
import { WorkspaceSelector } from "../../WorkspaceSelector";
import { styles } from "./AuthenticatedContent.styles";

interface IAuthenticatedContentProps {
    readonly user: User;
}

type AuthenticatedContentProps = IAuthenticatedContentProps;

interface IAuthenticatedContentState {
    readonly selectedWorkspaceId: number;
    readonly selectedDate: moment.Moment | undefined;
    readonly report: Report | undefined;
}

class AuthenticatedContent extends React.Component<AuthenticatedContentProps, IAuthenticatedContentState> {
    constructor(props: AuthenticatedContentProps) {
        super(props);

        // Should be set before the creation of the moment object in this.state.selectedDate.
        LocaleManager.updateLocale(props.user.firstDayOfTheWeek);

        this.state = {
            selectedWorkspaceId: props.user.defaultWorkspaceId,
            selectedDate: moment(),
            report: undefined,
        };
    }

    public componentDidMount(): void {
        this.fetchReport();
    }

    public render(): React.ReactNode {
        const { selectedWorkspaceId, selectedDate, report } = this.state;
        const { workspaces } = this.props.user;

        return (
            <div style={styles.contentContainer}>
                <Collapse defaultActiveKey={["1"]}>
                    <Collapse.Panel header="Options" key="1">
                        Workspace:&nbsp;
                        <WorkspaceSelector
                            workspaces={workspaces}
                            selectedWorkspaceId={selectedWorkspaceId}
                            onChange={this.handleWorkspaceSelectorChanged}
                        />
                        <Divider type="vertical" />
                        Week:&nbsp;
                        <DatePicker.WeekPicker
                            value={selectedDate}
                            onChange={this.handleWeekPickerChanged}
                            allowClear={false}
                        />
                    </Collapse.Panel>
                </Collapse>
                <div style={styles.reportContainer}>
                    <TogglReport report={report} />
                </div>
            </div>
        );
    }

    @BindThis()
    private handleWorkspaceSelectorChanged(workspaceId: number | undefined): void {
        if (workspaceId === undefined) {
            return;
        }
        this.setState({ selectedWorkspaceId: workspaceId }, () => this.fetchReport());
    }

    @BindThis()
    private handleWeekPickerChanged(newDate: moment.Moment | null): void {
        this.setState(
            {
                selectedDate: newDate ? newDate : undefined,
            },
            () => this.fetchReport(),
        );
    }

    private fetchReport(): void {
        const { selectedDate, selectedWorkspaceId } = this.state;

        if (selectedWorkspaceId === undefined) {
            return;
        }

        this.setState({ report: undefined });
        if (selectedDate !== undefined) {
            ReportsService.getSummaryReport(selectedWorkspaceId, selectedDate)
                .then((report) => {
                    this.setState({ report });
                })
                .catch(() => {
                    message.error("Could not fetch the Toggl report.");
                });
        }
    }
}

export default AuthenticatedContent;
