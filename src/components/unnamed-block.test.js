// @flow

import { shallow } from 'enzyme';
import React from 'react';
import UnnamedBlock from './unnamed-block';

const initialDispatches = {
    sortTable: jest.fn(),
    userFetchReq: jest.fn()
}

const shallowWrapper = shallow(<UnnamedBlock {...initialDispatches} />);

describe('Unnamed Block component testing...', () => {
    
    const creatIssueButton = shallowWrapper.find('[data-test="create-issue-button"]');
    const sagaActionButton = shallowWrapper.find('[data-test="saga-action-button"]');
    const select = shallowWrapper.find('[data-test="input-select"]');

    it('Unnamed Block should "click" Create Issue Button', () => {
        expect(creatIssueButton.length).toBe(1);
        
        creatIssueButton.simulate('click');
        expect(initialDispatches.sortTable).toHaveBeenLastCalledWith(null);
    })

    it('Unnamed Block should "click" Saga Action Button', () => {
        expect(sagaActionButton.length).toBe(1);

        sagaActionButton.simulate('click', 'SAGA Action');
        expect(initialDispatches.userFetchReq).toHaveBeenLastCalledWith('SAGA Action')
    })

    it('Unnamed Block should "select" new sorting data', () => {
        expect(select.length).toBe(1);

        select.simulate('change', { label: 'Assignee', value: 'assignee' });
        expect(initialDispatches.sortTable).toHaveBeenLastCalledWith({ label: 'Assignee', value: 'assignee' })
    })

    it('Unnamed Block should include SNAPSHOT', () => {
        const tree = shallow(<header></header>);
        expect(tree).toMatchSnapshot();
    })
});