import React from 'react';
import { connect } from 'react-redux';
import { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import Select from '@atlaskit/select';
import { CheckboxField, Fieldset } from '@atlaskit/form';
import { Checkbox } from '@atlaskit/checkbox';
import { labels } from '../common/labelList';
import { userList } from '../common/userList';
import { priorityList } from '../common/priorityList';

function CreateEditForm(props) {

    const chosenUser = props.chosenItem ?
            userList.find(user => user.id === props.chosenItem.assignee) : 
            null;

    const chosenPriority = props.chosenItem ?
            priorityList.find(priority => priority.level === props.chosenItem.priority) : 
            null;
    
    return (
        <React.Fragment>
            <Field
                name="issue"
                defaultValue={props.chosenItem ? props.chosenItem.issue : ''}
                label="Issue summary"
                isRequired
            >
                {({fieldProps}) => <TextField {...fieldProps} />}
            </Field>
            <Field
                name="assignee"
                defaultValue={
                    props.chosenItem ? 
                    {
                        value: chosenUser.displayName,
                        label: chosenUser.displayName,
                        id: chosenUser.id
                    } :
                    ''
                }
                label="Assignee"
                isRequired
            >
                {({fieldProps}) => <Select
                    classNamePrefix="react-select"
                    options={userList.map(user => ({
                        value: user.displayName,  
                        label: user.displayName,
                        id: user.id
                    }))}
                    isSearchable={false}
                    placeholder="Choose assignee..."
                    {...fieldProps}
                />}
            </Field>
            <Field
                name="priority"
                defaultValue={
                    props.chosenItem ? 
                    {
                        value: chosenPriority.value,
                        label: chosenPriority.label,
                        level: chosenPriority.level,
                    } :
                    ''
                }
                label="Priority"
            >
                {({fieldProps}) => <Select
                    classNamePrefix="react-select"
                    options={priorityList}
                    isSearchable={false}
                    placeholder="Choose priority..."
                    {...fieldProps}
                />}
            </Field>
            <Fieldset legend="Labels">
                {labels.map( label => { return (
                    <CheckboxField
                        name={label.name}
                        value={label.name}
                        key={label.name}
                        defaultIsChecked={
                            props.chosenItem ? 
                            (props.chosenItem.labelIds.includes(label.id) ? true : false) :
                            false
                        }
                    >
                        {({fieldProps}) => (
                            <Checkbox
                                label={label.label}
                                {...fieldProps}
                            />
                        )}
                    </CheckboxField>
                )})}
            </Fieldset>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        chosenItem: state.ui.chosenItem
    }
}

export default connect(
    mapStateToProps
)(CreateEditForm);