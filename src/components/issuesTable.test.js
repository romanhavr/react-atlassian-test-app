import { shallow, mount } from 'enzyme';
import React from 'react';
import { IssuesTable } from './issuesTable';
import { initialIssues } from '../common/initialIssues';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();

const chosenItem = {
    id: 1572444816584,
    issue: "1-st copy",
    priority: 1,
    assignee: 1,
    labelIds: [1]
}
const initialState = {
    storeTableData: initialIssues,
    chosenItem,
    sortBy: []
}
const initialDispatches = {
    chooseItemClick: jest.fn(),
    editIssue: jest.fn()
}

const initialStateForMount = {...initialState, ...initialDispatches}

const store = mockStore({ ui: { chosenItem } } );

const shallowWrapper = shallow(<IssuesTable {...initialState}/>);

const mountWrapper = mount(
    <Provider store={store}>
        <IssuesTable {...initialStateForMount} />
    </Provider>
);

describe('Issues Table testing...', () => {

    it('IssueTable should include TableTree (using "shallow")', () => {
        expect(shallowWrapper.find('TableTree')).toExist();
    })

    it('IssueTable should include spans (using "mount")', () => {
        expect(mountWrapper.find('span')).toExist();
    })
})