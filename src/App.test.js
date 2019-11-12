import { mount } from 'enzyme';
import React from 'react';
import ConnectedApp from './App';
import { initialIssues } from './common/initialIssues';
import { sortTable, userFetchReq } from './store/actions'
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

const initialSagaStore = {
    sagaData: null,
    sagaSucceeded: null,
    sagaFailed: null,
    someUser: null,
}

const connectedStore = mockStore({
    issues: initialIssues,
    ui: { chosenItem },
    saga: initialSagaStore
});

let connectedWrapper;

describe('App Redux testing', () => {

    beforeEach( () => {
        connectedWrapper = mount(
            <Provider store={connectedStore}>
                <ConnectedApp />
            </Provider>
        );
    })
    
    it('App props should match with initialState', () => {
        expect(connectedWrapper.prop('store').getState().saga).toBe(initialSagaStore)
    });

    it('ConnectedApp should be rendered', () => {
        expect(connectedWrapper.find(ConnectedApp).length).toBe(1)
    })
    
    it('App actions should dispatch', () => {
        let actions;
        connectedStore.dispatch(sortTable({
            label: 'Assignee',
            value: 'assignee'
        }));
        connectedStore.dispatch(userFetchReq('SAGA Action'));
        actions = connectedStore.getActions();
        
        expect(actions[0].type).toBe('SORT_TABLE');
        expect(actions[0].payload.value).toEqual({
            label: 'Assignee',
            value: 'assignee'
        });
        
        expect(actions[1].type).toBe('USER_FETCH_REQUESTED');
        expect(actions[1].payload.data).toBe('SAGA Action');
    })
})