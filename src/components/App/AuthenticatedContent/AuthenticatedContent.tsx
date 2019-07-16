import { Collapse, DatePicker, Divider, message } from "antd";
import moment from "moment";
import * as React from "react";
import { Report } from "../../../models/Report";
import { User } from "../../../models/User";
import { LocaleManager } from "../../../services/locale/LocaleManager";
import { ReportsService } from "../../../services/toggl/ReportsService";
import { BindThis } from "../../../utilities/BindThis";
import { WorkspaceSelector } from "../../WorkspaceSelector";

interface IAuthenticatedContentProps {
    readonly user: User;
}

type AuthenticatedContentProps = IAuthenticatedContentProps;

interface IAuthenticatedContentState {
    readonly selectedWorkspaceId: number;
    readonly selectedDate: moment.Moment;
    readonly report: Report | undefined;
}

class AuthenticatedContent extends React.Component<AuthenticatedContentProps, IAuthenticatedContentState> {
    constructor(props: AuthenticatedContentProps) {
        super(props);

        this.state = {
            selectedWorkspaceId: props.user.defaultWorkspaceId,
            selectedDate: moment(),
            report: undefined,
        };

        LocaleManager.updateLocale(props.user.firstDayOfTheWeek);
    }

    public componentDidMount(): void {
        this.fetchReport();
    }

    public render(): React.ReactNode {
        const { selectedWorkspaceId, selectedDate } = this.state;
        const { workspaces } = this.props.user;

        return (
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
    private handleWeekPickerChanged(newDate: moment.Moment): void {
        this.setState({ selectedDate: newDate }, () => this.fetchReport());
    }

    private fetchReport(): void {
        const { selectedDate, selectedWorkspaceId } = this.state;

        if (selectedWorkspaceId === undefined) {
            return;
        }

        ReportsService.getSummaryReport(selectedWorkspaceId, selectedDate)
            .then(report => {
                this.setState({ report });
            })
            .catch(() => {
                message.error("Could not fetch the Toggl report.");
            });
    }
}

export default AuthenticatedContent;
