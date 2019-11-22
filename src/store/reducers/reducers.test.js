// @flow

import * as A from '../actionTypes';
import sagaReducers from './saga-reducer';
import issuesReducers from './issues-reducer';
import uiReducers from './ui-reducer';
import { initialIssues } from '../../common/initialIssues';
import { userList } from '../../common/userList';
import { priorityList } from '../../common/priorityList';
import { labels } from '../../common/labelList';
import type { SagaState, UIState, AddFormActionData } from '../../interfaces/interfaces';


const sagaDefaultState: SagaState = {
    sagaData: null,
    sagaSucceeded: null,
    sagaFailed: null,
    someUser: null
}

const uiDefaultState: UIState = {
    chosenItem: null,
    sortBy: []
}

describe('Saga Reducers', () => {

    it('Should return default state', () => {
        const newState: SagaState = sagaReducers(undefined, {});
        expect(newState).toEqual(sagaDefaultState);
    })

    it('Should return state with passed "sagaData"', () => {
        const newState: SagaState = sagaReducers(undefined, { type: A.USER_FETCH_REQUESTED, payload: { data: 'Some sagaData' } });
        expect(newState).not.toEqual(sagaDefaultState);
        expect(newState.sagaData).toEqual('Some sagaData');
    })

    it('Should return state with passed "sagaSucceededData"', () => {
        const newState: SagaState = sagaReducers(undefined, { type: A.USER_FETCH_SUCCEEDED, payload: 'Some sagaSucceededData' });
        expect(newState.sagaSucceeded).toEqual('Some sagaSucceededData');
    })

    it('Should return state with passed "sagaData"', () => {
        const newState: SagaState = sagaReducers(undefined, { type: A.USER_FETCH_FAILED, message: 'Some sagaFailedData' });
        expect(newState.sagaFailed).toEqual('Some sagaFailedData');
    })

    it('Should return state with passed "sagaData"', () => {
        const newState: SagaState = sagaReducers(undefined, { type: A.ASYNC_TYPE, userInfo: 'Some sagaUserData' });
        expect(newState.someUser).toEqual('Some sagaUserData');
    })
})

const newIssue: AddFormActionData = {
    id: 1572444816583,
    issue: 'New Issue',
    priority: { level: 1, label: 'High', value: 'high' },
    assignee: { id: 1 },
    labels: [
        { id: 1, name: 'label1', label: 'Label 1' },
        { id: 2, name: 'anotherLabel', label: 'Another Label' },
        { id: 3, name: 'newLabel', label: 'New Label' }
    ]
}

const issueForInlineEdit = {...initialIssues[0]}

describe('Issues Reducers', () => {

    it('Should return default state', () => {
        const newState = issuesReducers(undefined, {type: '', payload: null});
        expect(newState).toEqual(initialIssues);
    })

    it('Should return state with new issue', () => {
        const newState = issuesReducers(undefined, { type: A.ADD_ISSUE, payload: { data: newIssue } });
        expect(newState).not.toEqual(initialIssues);
        expect(newState[newState.length-1].issue).toEqual(newIssue.issue);
    })

    it('Should return state with new issue', () => {
        const newState = issuesReducers(undefined, { type: A.EDIT_ISSUE, payload: { data: newIssue } });
        expect(newState).not.toEqual(initialIssues);
        expect(newState[1].priority).toEqual(newIssue.priority.level);
    })

    it('Should return state with new issue for "inline edit issue"', () => {
        const newState = issuesReducers(undefined, {
            type: A.EDIT_ISSUE_INLINE,
            payload: { data: {
                item: issueForInlineEdit,
                value: 'New Issue'
            }} 
        });
        expect(newState).not.toEqual(initialIssues);
        expect(newState[0].issue).toEqual('New Issue');
    })

    it('Should return state with new issue for "inline edit assignee"', () => {
        const newState = issuesReducers(undefined, {
            type: A.EDIT_ASSIGNEE_INLINE,
            payload: { data: {
                item: issueForInlineEdit,
                value: userList[1]
            }} 
        });
        expect(newState).not.toEqual(initialIssues);
        expect(newState[1].assignee).toEqual(userList[1].id);
    })

    it('Should return state with new issue for "inline edit labels"', () => {
        const newState = issuesReducers(undefined, {
            type: A.EDIT_LABELS_INLINE,
            payload: { data: {
                item: issueForInlineEdit,
                value: [labels[1]]
            }} 
        });
        expect(newState).not.toEqual(initialIssues);
        expect(newState[0].labelIds).toEqual([2]);
    })

    it('Should return state with new issue for "inline edit priority"', () => {
        const newState = issuesReducers(undefined, {
            type: A.EDIT_PRIORITY_INLINE,
            payload: { data: {
                item: issueForInlineEdit,
                value: priorityList[2]
            }} 
        });
        expect(newState).not.toEqual(initialIssues);
        expect(newState[0].priority).toEqual(3);
    })

    it('Should return state without removed issue', () => {
        const newState = issuesReducers(undefined, { type: A.REMOVE_ISSUE, payload: { data: initialIssues[0] } });
        expect(newState).not.toEqual(initialIssues);
        expect(newState[0].id).toEqual(initialIssues[1].id);
    })
})

describe('UI Reducers', () => {

    it('Should return default state', () => {
        const newState = uiReducers(undefined, {type: '', payload: null});
        expect(newState).toEqual(uiDefaultState);
    })

    it('Should return state with chosen item', () => {
        const newState = uiReducers(undefined, { type: A.CHOOSE_ITEM, payload: { item: initialIssues[3] } });
        expect(newState).not.toEqual(uiDefaultState);
        expect(newState.chosenItem).toEqual(initialIssues[3]);
    })

    it('Should return state with new issue', () => {
        const newState = uiReducers(undefined, { type: A.SORT_TABLE, payload: { value: [{label: 'Summary', value: 'issue'}] } });
        expect(newState).not.toEqual(uiDefaultState);
        expect(newState.sortBy[0]).toEqual({label: 'Summary', value: 'issue'});
    })
})