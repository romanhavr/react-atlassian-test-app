// @flow

import React from 'react';
import { Route, NavLink } from "react-router-dom";
import Button from '@atlaskit/button';
import Select from '@atlaskit/select';
import IssuesTable from './issuesTable';

type Props = {
    sortTable: any,
    userFetchReq: any,
}

export function UnnamedBlock(props: Props) {
    return (
        <Route exact path="/">
            <NavLink exact to="/create">
                <Button appearance="primary" onClick={() => props.sortTable(null)} data-test="create-issue-button">
                    Create new issue
                    </Button>
            </NavLink>
            <Button appearance="secondary" onClick={() => props.userFetchReq('SAGA Action')} data-test="saga-action-button">
                Saga Action
                </Button>
            <Select
                className="multi-select"
                classNamePrefix="react-select"
                options={[
                    { label: 'Summary', value: 'issue' },
                    { label: 'Assignee', value: 'assignee' },
                    { label: 'Priority', value: 'priority' }
                ]}
                isMulti
                onChange={value => props.sortTable(value)}
                isSearchable={false}
                placeholder="Sort by..."
                data-test="input-select"
            />
            <IssuesTable />
        </Route>
    );
}

export default UnnamedBlock;
