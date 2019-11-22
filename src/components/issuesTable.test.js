// @flow

import { shallow, mount } from 'enzyme';
import React from 'react';
import { IssuesTable } from './issuesTable';
import { initialIssues } from '../common/initialIssues';
import { Provider } from "react-redux";
import TableTree from '@atlaskit/table-tree';
import configureMockStore from "redux-mock-store";
import type { Item, TableItem } from '../interfaces/interfaces';

const mockStore = configureMockStore();

const chosenItem: Item = {
    id: 1572444816584,
    issue: "1-st copy",
    priority: 1,
    assignee: 1,
    labelIds: [1]
}

const tableData: TableItem[] = initialIssues.map(issue => ({id: issue.id, content: issue}))

const initialState = {
    storeTableData: initialIssues,
    tableData,
    chosenItem,
    sortingBy: []
}
const initialDispatches = {
    chooseItemClick: jest.fn(),
    editIssue: jest.fn(),
    editAssigneeInline: jest.fn(),
    editIssueInline: jest.fn(),
    editLabelsInline: jest.fn(),
    editPriorityInline: jest.fn(),
    itemRemove: jest.fn()
}

const initialStateForMount = {...initialState, ...initialDispatches}

const store = mockStore({ ui: { chosenItem } } );

const shallowWrapper = shallow(<IssuesTable {...initialStateForMount}/>);

const mountWrapper = mount(
    <Provider store={store}>
        <IssuesTable {...initialStateForMount} />
    </Provider>
);

const sortedTableData: TableItem[] = initialIssues.map(issue => {
    return {
        id: issue.id,
        content: issue
    }
});

describe('Issues Table testing...', () => {

    it('IssueTable should include TableTree (using "shallow")', () => {
        expect(shallowWrapper.find('TableTree')).toExist();
    })

    it('IssueTable should include spans (using "mount")', () => {
        expect(mountWrapper.find('span')).toExist();
    })

    const form = mountWrapper.find('form');
    const inlineEditIssue = mountWrapper.find('[data-test="inline-edit-issue"]');
    const inlineEditAssignee = mountWrapper.find('[data-test="inline-edit-assignee"]');
    const inlineEditLabels = mountWrapper.find('[data-test="inline-edit-labels"]');
    const inlineEditPriority = mountWrapper.find('[data-test="inline-edit-priority"]');

    it('IssueTable should include form (using "mount")', () => {
        expect(form).toExist();

        const onSubmitFn = jest.fn();
        const onCloseFn = jest.fn();
        const shallowWrapperForm = shallow(<form onSubmit={onSubmitFn} onClose={onCloseFn} />);
        const form1 = shallowWrapperForm.find('form')
        expect(form1).toExist();

        form1.simulate('submit', chosenItem);
        expect(onSubmitFn).toHaveBeenCalledTimes(1);
        expect(onSubmitFn).toHaveBeenLastCalledWith(chosenItem);

        form1.simulate('close');
        expect(onCloseFn).toHaveBeenCalledTimes(1);
      });

    it('IssueTable should include SNAPSHOT', () => {
        const tree = shallow(
        <TableTree
                headers={['Issue', 'Assignee', 'Labels', 'Priority', 'Trash']}
                columns={['issue', 'assignee', 'labels', 'priority', 'removing']}
                columnWidths={['200px', '170px', '200px', '150px', '80px']}
                items={sortedTableData}
            />
            );
        
        expect(tree).toMatchSnapshot();
    })

    it('IssueTable should include inline edit elements and they should dispatch actions', () => {
        expect(inlineEditIssue).toExist();
        expect(inlineEditAssignee).toExist();
        expect(inlineEditLabels).toExist();
        expect(inlineEditPriority).toExist();
        
        inlineEditIssue.at(1).simulate('submit');
        inlineEditAssignee.at(1).simulate('submit');
        inlineEditLabels.at(1).simulate('submit');
        inlineEditPriority.at(1).simulate('submit');
        expect(initialDispatches.editIssueInline).toHaveBeenCalled();
        expect(initialDispatches.editAssigneeInline).toHaveBeenCalled();
        expect(initialDispatches.editLabelsInline).toHaveBeenCalled();
        expect(initialDispatches.editPriorityInline).toHaveBeenCalled();
    })
})