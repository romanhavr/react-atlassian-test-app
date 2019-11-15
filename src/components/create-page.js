// @flow

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addIssue } from '../store/actions';
import Button from '@atlaskit/button';
import CreateEditForm from './create-edit-form';
import Form from '@atlaskit/form';
import { useHistory } from "react-router-dom";
import '../styles/create-page.css';
import type { FormData } from '../interfaces/interfaces';

type Props = {
    addIssue: any
}

export function CreatePage(props: Props) {

    const history = useHistory();

    const onFormSubmit = (data: FormData) => {
        if (!data.assignee) return
        props.addIssue(data);
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

const mapDispatchToProps = dispatch => {
    return {
        addIssue: (data: FormData) => dispatch(addIssue(data))
    }
}

export default compose(
    withRouter,
    connect(
        null,
        mapDispatchToProps
    )
)(CreatePage);