import React from 'react';
import { connect } from 'react-redux';
import { addIssue } from '../store/actions';
import Button from '@atlaskit/button';
import CreateEditForm from './create-edit-form';
import Form from '@atlaskit/form';
import { useHistory } from "react-router-dom";
import '../styles/create-page.css';

function CreatePage(props) {

    const history = useHistory();

    const onFormSubmit = (data) => {
        if (!data.assignee) return
        props.addIssue(data, props.storeTableData.length);
        cancel();
    }

    const cancel = () => {
        history.push('/')
    }

    return (
        <div className="create-page">
            <Form onSubmit={onFormSubmit}>
                {({ formProps }) => (
                    <form {...formProps}>
                        <CreateEditForm />
                        <div className="buttons">
                            <Button appearance="default" onClick={cancel}>
                                Cancel
                            </Button>
                            <Button appearance="primary" type="submit">
                                Create issue
                            </Button>
                        </div>
                    </form>
                )}
            </Form>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        storeTableData: state.issues
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIssue: (data, length) => dispatch(addIssue(data, length))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePage);