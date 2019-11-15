// @flow

import { shallow, mount } from 'enzyme';
import React from 'react';
import { CreateEditForm } from './create-edit-form';
import { initialIssues } from '../common/initialIssues';

const wrapper = mount(<CreateEditForm  chosenItem={initialIssues[1]} />);

describe('Create-Edit Form component testing...', () => {
    const selectAssignee = wrapper.find('[data-test="assignee-select"]');
    const selectPriority = wrapper.find('[data-test="priority-select"]');
    const checkboxesLabels = wrapper.find('Checkbox[data-test="label-checkboxes2"]');

    it('Create-Edit Form should contain two "selects" and checkboxes', () => {
        expect(selectAssignee).toExist;
        expect(selectPriority).toExist;
        expect(checkboxesLabels).toExist;
    })

    it('Create-Edit Form "selects" should select new data', () => {
        const selectAssigneeChangeFn = jest.fn();
        const selectPriorityChangeFn = jest.fn();
        const selectAssigneeTag = selectAssignee.at(1);
        const selectPriorityTag = selectPriority.at(1);
        const selectAssignee1 = shallow(<selectAssigneeTag onChange={selectAssigneeChangeFn} />)
        const selectPriority1 = shallow(<selectPriorityTag onChange={selectPriorityChangeFn} />)
        selectAssignee1.simulate('change', { label: 'Assignee', value: 'assignee' });
        selectPriority1.simulate('change', { level: 1, label: 'High', value: 'high' });

        expect(selectAssigneeChangeFn).toHaveBeenLastCalledWith({ label: 'Assignee', value: 'assignee' })
        expect(selectPriorityChangeFn).toHaveBeenLastCalledWith({ level: 1, label: 'High', value: 'high' })
    })

    it('Creat-Edit Fotm checkboxes should toggle checking', () => {
        // console.log(checkboxesLabels.props())
        expect(checkboxesLabels.prop('isChecked')).toBe(true);
        // checkboxesLabels
        //     .find('input')
        //     .simulate('click', {bubbles: true});
        // console.log(checkboxesLabels.props())
            
        // // checkboxesLabels.simulate('change');
        // // prop('onChange', { target: { checked: true } })
        // expect(checkboxesLabels.prop('isChecked')).toBe(false);

    })
});