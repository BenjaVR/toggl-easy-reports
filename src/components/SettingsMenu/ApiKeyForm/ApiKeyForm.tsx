import { Button, Input } from "antd";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import ApiTokenService from "../../../services/toggl/ApiTokenService";
import { login, UserAction } from "../../../stores/user/actions";
import { BindThis } from "../../../utilities/BindThis";
import { IOptionsMenuItemProps } from "../SettingsMenu";

type ApiKeyFormProps = IOptionsMenuItemProps & ReturnType<typeof mapDispatchToProps>;

interface IApiKeyFormState {
    readonly apiKey: string;
}

class ApiKeyForm extends React.Component<ApiKeyFormProps, IApiKeyFormState> {
    constructor(props: ApiKeyFormProps) {
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
        this.props.onSave("API key saved!");
        this.props.login(); // Do login action every time the key has changed.
    }
}

function mapDispatchToProps(dispatch: Dispatch<UserAction>) {
    return bindActionCreators(
        {
            login,
        },
        dispatch,
    );
}

export default connect(
    undefined,
    mapDispatchToProps,
)(ApiKeyForm);
