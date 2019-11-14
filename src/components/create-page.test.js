import { shallow, mount } from 'enzyme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CreatePage } from './create-page';
import { Provider } from "react-redux";
import { addIssue } from '../store/actions'
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const chosenItem = {
    id: 1572444816584,
    issue: "1-st copy",
    priority: 1,
    assignee: 1,
    labelIds: [1]
}
const store = mockStore({
    ui: chosenItem
})

const mountWrapper = mount(
    <Provider store={store}>
        <Router>
            <CreatePage />
        </Router>
    </Provider>
);

const connectedStore = mockStore({
    ui: chosenItem,
    addIssue: jest.fn()
});

const connectedWrapper = mount(
    <Provider store={connectedStore}>
        <Router>
            <CreatePage />
        </Router>
    </Provider>
);

describe('Issues Table testing...', () => {
    const form = mountWrapper.find('form');

    it('Create Page should include form (using "mount")', () => {
        expect(form).toExist();
    })

    it('Create Page buttons should act as expected', () => {
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

    it('Create Page actions should dispatch', () => {
        let actions;
        connectedStore.dispatch(addIssue(chosenItem));
        actions = connectedStore.getActions();

        expect(actions[0].type).toBe('ADD_ISSUE');
        expect(actions[0].payload.data).toEqual(chosenItem);
    })
})