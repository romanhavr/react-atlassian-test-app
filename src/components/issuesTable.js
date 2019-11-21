// @flow

import React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import '../styles/modalWindow.css';
import {
    chooseItem,
    editIssue,
    editIssueInline,
    editAssigneeInline,
    editLabelsInline,
    editPriorityInline,
    removeIssue
} from '../store/actions';
import TableTree from '@atlaskit/table-tree';
import Avatar from '@atlaskit/avatar';
import Badge from '@atlaskit/badge';
import ModalDialog, { ModalTransition } from '@atlaskit/modal-dialog';
import Form from '@atlaskit/form';
import InlineEdit from '@atlaskit/inline-edit';
import Textfield from '@atlaskit/textfield';
import Select from '@atlaskit/select';
import CreateEditForm from './create-edit-form';
import { userList } from '../common/userList';
import { labels as labelList } from '../common/labelList';
import { priorityList } from '../common/priorityList';
import { sortingFunc } from '../common/sortingFunction';
import { getTableData } from '../store/selectors';
import PriorityMajorIcon from '@atlaskit/icon-priority/glyph/priority-major';
import PriorityMediumIcon from '@atlaskit/icon-priority/glyph/priority-medium';
import PriorityMinorIcon from '@atlaskit/icon-priority/glyph/priority-minor';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import EditIcon from '@atlaskit/icon/glyph/edit';
import type {
        Item,
        User,
        Label,
        CurrentLabel,
        Priority,
        SortingOptions,
        TableItem,
        ActionButton,
        EditFormData,
        EditIssueInlineActionData,
        EditAssigneeInlineActionData,
        EditLabelsInlineActionData,
        EditPriorityInlineActionData,
        EditFormActionData
} from '../interfaces/interfaces';

type Props = {
    storeTableData: Item[],
    tableData: TableItem[],
    chosenItem: Item,
    sortingBy: SortingOptions,
    chooseItemClick: any,
    editIssue: any,
    editIssueInline: any,
    editAssigneeInline: any,
    editLabelsInline: any,
    editPriorityInline: any,
    itemRemove: any
}

type State = {
    isOpen: boolean
};

export class IssuesTable extends React.Component<Props, State> {

    chooseItemClick = this.props.chooseItemClick;
    editIssue = this.props.editIssue;
    itemRemove = this.props.itemRemove;
    state: State = {
        isOpen: !!this.props.chosenItem
    };
    keyCounter = 0;

    itemClick = (item: Item) => {
        this.chooseItemClick(item);
        this.setState({ isOpen: true })
    }

    close = () => {
        this.chooseItemClick(null);
        this.setState({ isOpen: false })
    };

    onFormSubmit = (data: EditFormData) => {
        this.editIssue({ ...data, id: this.props.chosenItem.id });
        this.close();
    }

    render() {
        const { isOpen/*(:boolean)*/ } = this.state;
        
        const sortedTableData: TableItem[] = R.clone(this.props.tableData);

        if (this.props.sortingBy && this.props.sortingBy.length) {
            sortedTableData.sort((a, b) => sortingFunc(a, b, this.props.sortingBy, 0))
        }

        const actionButtons: ActionButton[] = [
            { text: 'Save changes', type: 'submit' },
            { text: 'Cancel', onClick: this.close },
        ];
        const priorityIcon = (priorityLabel: ?string) => {
            switch (priorityLabel) {
                case 'High':
                    return <PriorityMajorIcon size="medium" />;
                case 'Medium':
                    return <PriorityMediumIcon size="medium" />;
                case 'Low':
                    return <PriorityMinorIcon size="medium" />;
                default:
                    return ''
            }
        }

        const issue = (item: Item) => <InlineEdit
            defaultValue={item.issue}
            editView={fieldProps => <Textfield {...fieldProps} autoFocus />}
            readView={() => item.issue || 'Click to change issue'}
            onConfirm={value => this.props.editIssueInline({ item, value })}
            data-test="inline-edit-issue"
        />
        const assignee = (item: Item) => {
            const user: ?User = userList.find(({ id }) => id === item.assignee);
            if (user) return (
                <InlineEdit
                    editView={fieldProps => (
                        <Select
                            {...fieldProps}
                            className="assignee-select"
                            options={userList.map(user => ({
                                value: user.displayName,
                                label: user.displayName,
                                id: user.id,
                                key: user.id
                            }))}
                            autoFocus
                            openMenuOnFocus
                        />
                    )}
                    readView={() => <span> <Avatar size="xsmall" src={user.avatar} />
                        {user.displayName}
                    </span>
                    }
                    onConfirm={value => this.props.editAssigneeInline({ item, value })}
                    data-test="inline-edit-assignee"
                />
            )
        };
        const labels = (item: Item) => <InlineEdit
                    defaultValue={item.labelIds.map((id: number) => labelList.find((label: Label) => label.id === id))
                                        .map(label => label ? ({...label, value: label.name}) : null )}
                    editView={fieldProps => (
                        <Select
                            {...fieldProps}
                            className="labels-select"
                            options={labelList.map(label => ({...label, value: label.name, key: label.label}))}
                            isMulti
                            autoFocus
                            openMenuOnFocus
                        />
                    )}
                    readView={() => item.labelIds.map(id => {
                        this.keyCounter++;
                        const badgeLabel: ?Label = labelList.find(label => id === label.id)
                        return (<Badge key={this.keyCounter}>
                            <strong>
                                {badgeLabel ? badgeLabel.label.toUpperCase() : null}
                            </strong>
                        </Badge>)})}
                    onConfirm={(value) => this.props.editLabelsInline({ item, value })}
                    data-test="inline-edit-labels"
                />
        const priority = (item: Item) => {
            const findItemLabel: ?Priority = priorityList.find(({ level }) => level === item.priority);
            const itemLabel: ?string = findItemLabel ? findItemLabel.label : null;
            return (
                <InlineEdit
                    editView={fieldProps => (
                        <Select
                            {...fieldProps}
                            className="priority-select"
                            options={priorityList.map(priority => ({...priority, key: priority.label}))}
                            autoFocus
                            openMenuOnFocus
                        />
                    )}
                    readView={() => <span> {priorityIcon(itemLabel)} {itemLabel} </span>}
                    onConfirm={(value) => this.props.editPriorityInline({ item, value })}
                    data-test="inline-edit-priority"
                />)
        };
        const editing = (item: Item) => <span onClick={() => this.itemClick(item)} className="edit"><EditIcon /></span>
        const removing = (item: Item) => <span className="trash-icon" onClick={() => this.itemRemove(item)}><TrashIcon /></span>

        return (
            <React.Fragment>
                <TableTree
                    headers={['Issue', 'Assignee', 'Labels', 'Priority', 'Edit', 'Trash']}
                    columns={[issue, assignee, labels, priority, editing, removing]}
                    columnWidths={['200px', '190px', '200px', '150px', '80', '80px']}
                    items={sortedTableData}
                />
                <ModalTransition>
                    {isOpen && (
                        <ModalDialog
                            actions={actionButtons}
                            onClose={this.close}
                            heading="Edit issue"
                            components={{
                                Container: ({ children }) => (
                                    <Form onSubmit={this.onFormSubmit}>
                                        {({ formProps }) => (
                                            <form className="form" {...formProps}>
                                                {children}
                                            </form>
                                        )}
                                    </Form>
                                )
                            }}
                        >
                            <CreateEditForm />
                        </ModalDialog>)
                    }
                </ModalTransition>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        storeTableData: state.issues,
        tableData: getTableData(state),
        chosenItem: state.ui.chosenItem,
        sortingBy: state.ui.sortBy
    }
}

const mapDispatchToProps = dispatch => {
    return {
        chooseItemClick: (item: Item) => dispatch(chooseItem(item)),
        editIssue: (data: EditFormActionData) => dispatch(editIssue(data)),
        editIssueInline: (data: EditIssueInlineActionData) => dispatch(editIssueInline(data)),
        editAssigneeInline: (data: EditAssigneeInlineActionData) => dispatch(editAssigneeInline(data)),
        editLabelsInline: (data: EditLabelsInlineActionData) => dispatch(editLabelsInline(data)),
        editPriorityInline: (data: EditPriorityInlineActionData) => dispatch(editPriorityInline(data)),
        itemRemove: (item: Item) => dispatch(removeIssue(item))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IssuesTable);