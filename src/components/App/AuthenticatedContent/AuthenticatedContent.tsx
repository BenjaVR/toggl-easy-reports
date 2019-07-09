import { Collapse, DatePicker, Divider } from "antd";
import moment from "moment";
import * as React from "react";
import { User } from "../../../models/User";
import { LocaleManager } from "../../../services/locale/LocaleManager";
import { WorkspaceSelector } from "../../WorkspaceSelector";

interface IAuthenticatedContentProps {
    readonly user: User;
}

export default class AuthenticatedContent extends React.Component<IAuthenticatedContentProps> {
    public componentDidMount(): void {
        LocaleManager.updateLocale(this.props.user.firstDayOfTheWeek);
    }

    public render(): React.ReactNode {
        return (
            <Collapse defaultActiveKey={["1"]}>
                <Collapse.Panel header="Options" key="1">
                    Workspace: <WorkspaceSelector />
                    <Divider type="vertical" />
                    Week: <DatePicker.WeekPicker defaultValue={moment()} />
                </Collapse.Panel>
            </Collapse>
        );
    }
}
