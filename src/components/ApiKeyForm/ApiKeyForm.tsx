import { Input } from "antd";
import React from "react";
import ApiTokenService from "../../services/toggl/ApiTokenService";
import { BindThis } from "../../utilities/BindThis";

export default class ApiKeyForm extends React.Component<{}, { apiKey: string }> {
    constructor(props: {}) {
        super(props);

        this.state = {
            apiKey: ApiTokenService.getToken(),
        };
    }

    public render() {
        return <Input value={this.state.apiKey} onChange={this.onChange} />;
    }

    @BindThis()
    private onChange(value: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ apiKey: value.currentTarget.value });
    }
}
