import { shallow, mount } from 'enzyme';
import React from 'react';
import ConnectedApp, { App } from './App';
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

const initialDispatches = {
    sortTable: jest.fn(),
    userFetchReq: jest.fn()
}

const initialSagaStore = {
    sagaData: null,
    sagaSucceeded: null,
    sagaFailed: null,
    someUser: null,
}

const store = mockStore({
    issues: initialIssues,
    ui: { chosenItem },
    saga: initialSagaStore
});

const wrapper = mount(
    <Provider store={store}>
        <App {...initialDispatches} />
    </Provider>
);

describe('App component testing...', () => {

    const creatIssueButton = wrapper.find('button[data-test="create-issue-button"]');
    const sagaActionButton = wrapper.find('button[data-test="saga-action-button"]');

    it('App should "click" Create Issue Button', () => {
        expect(creatIssueButton.length).toBe(1);

        creatIssueButton.simulate('click');
        expect(initialDispatches.sortTable).toHaveBeenLastCalledWith(null)
    })

    it('App should "click" Saga Action Button', () => {
        expect(sagaActionButton.length).toBe(1);

        sagaActionButton.simulate('click', 'SAGA Action');
        expect(initialDispatches.userFetchReq).toHaveBeenLastCalledWith('SAGA Action')
    })

    it('App should include SNAPSHOT', () => {
        const tree = shallow(<header></header>);
        expect(tree).toMatchSnapshot();
    })
});

let connectedWrapper, connectedStore;

describe('App Redux testing', () => {

    beforeEach( () => {
        connectedStore = store;
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