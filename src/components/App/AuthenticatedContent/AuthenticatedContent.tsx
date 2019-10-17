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
import styles from "./AuthenticatedContent.module.scss";

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
    private readonly localStorageKeyIsOptionsToggleOpen = "OPTION_IS_OPTIONS_TOGGLE_OPEN";
    private readonly optionsCollapseKey = "OPTIONS_COLLAPSE_KEY";

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

        const optionsDefaultActiveKey = this.shouldOptionsBeOpenOnLoad()
            ? this.optionsCollapseKey
            : undefined;

        return (
            <div className={styles.contentContainer}>
                <Collapse defaultActiveKey={optionsDefaultActiveKey} onChange={this.handleOptionsCollapseChanged}>
                    <Collapse.Panel header="Options" key={this.optionsCollapseKey}>
                        <div className={styles.optionsPanelContainer}>
                            <div className={styles.inputContainer}>
                                <span className={styles.inputLabel}>Workspace:</span>
                                <WorkspaceSelector
                                    className={styles.inputField}
                                    workspaces={workspaces}
                                    selectedWorkspaceId={selectedWorkspaceId}
                                    onChange={this.handleWorkspaceSelectorChanged}
                                />
                            </div>
                            <Divider className={styles.optionsDivider} type="vertical" />
                            <div className={styles.inputContainer}>
                                <span className={styles.inputLabel}>Week:</span>
                                <DatePicker.WeekPicker
                                    className={styles.inputField}
                                    value={selectedDate}
                                    onChange={this.handleWeekPickerChanged}
                                    allowClear={false}
                                />
                            </div>
                        </div>
                    </Collapse.Panel>
                </Collapse>
                <div className={styles.reportContainer}>
                    <TogglReport report={report} />
                </div>
            </div>
        );
    }

    @BindThis()
    private handleOptionsCollapseChanged(key: string | string[]): void {
        if (key instanceof Array && key.length > 0) {
            key = key[0];
        }
        localStorage.setItem(this.localStorageKeyIsOptionsToggleOpen, JSON.stringify(key === this.optionsCollapseKey));
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

    private shouldOptionsBeOpenOnLoad(): boolean {
        const localStorageValue = localStorage.getItem(this.localStorageKeyIsOptionsToggleOpen);
        return localStorageValue === null || JSON.parse(localStorageValue) === true;
    }
}

export default AuthenticatedContent;
