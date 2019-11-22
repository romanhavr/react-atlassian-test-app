// @flow

import { shallow } from 'enzyme';
import React from 'react';
import { Statistics } from './statistics';
import { userList } from '../common/userList';
import { labels } from '../common/labelList';
import { priorityList } from '../common/priorityList';
import TableTree from '@atlaskit/table-tree';
import type { Item } from '../interfaces/interfaces';

const initialState = {
    uniqueIssues: jest.fn(),
    uniqueIssuesBy: jest.fn(),
    uniqueAssigneeBy: jest.fn(),
    uniqueLabelsBy: jest.fn(),
    uniquePriorityBy: jest.fn()
}

const shallowWrapper = shallow(<Statistics {...initialState}/>);

const stitisticsTableData = [
    {
        id: 'issues',
        content: ['Unique issues', 'issue', 5]
    },
    {
        id: 'assegnees',
        content: ['Unique assignees', 'assignee', userList.length]
    },
    {
        id: 'labels',
        content: ['Unique labels', 'labelIds', labels.length]
    },
    {
        id: 'priority',
        content: ['Unique priorities', 'priority', priorityList.length]
    }
];

describe('Statistics Table testing...', () => {

    it('Statistics Table should include TableTree (using "shallow")', () => {
        expect(shallowWrapper.find('TableTree')).toExist();
        expect(shallowWrapper.find('TableTree').length).toBe(1);
    })

    it('Statistics Table should include SNAPSHOT', () => {
        const tree = shallow(
        <TableTree
                headers={['Number of', 'Number by', 'Total number']}
                columns={['numberOf', 'numberBy', 'total']}
                columnWidths={['300px', '300px', '200px']}
                items={stitisticsTableData}
            />
            );
        
        expect(tree).toMatchSnapshot();
    })
})