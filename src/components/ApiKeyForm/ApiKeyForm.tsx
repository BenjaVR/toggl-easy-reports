import { Button, Input, message } from "antd";
import React from "react";
import ApiTokenService from "../../services/toggl/ApiTokenService";
import { BindThis } from "../../utilities/BindThis";

interface IApiKeyFormState {
    readonly apiKey: string;
}

export default class ApiKeyForm extends React.Component<{}, IApiKeyFormState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            apiKey: ApiTokenService.getToken(),
        };
    }

    public render() {
        // We use Input.Search here, because it is the only clean way to add a button to an input field.
        return (
            <Input.Search
                value={this.state.apiKey}
                onChange={this.onChange}
                addonBefore={"Toggl API Key"}
                enterButton={this.renderEnterButton()}
                onSearch={this.onSave}
            />
        );
    }

    private renderEnterButton(): React.ReactNode {
        return (
            <Button type="primary" ghost={true}>
                Update
            </Button>
        );
    }

    @BindThis()
    private onChange(value: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ apiKey: value.currentTarget.value });
    }

    @BindThis()
    private onSave(): void {
        ApiTokenService.setToken(this.state.apiKey);
        message.success("API key saved!");
    }
}
