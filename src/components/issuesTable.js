// @flow

import React from 'react';
import { connect } from 'react-redux';
import '../styles/modalWindow.css';
import { chooseItem, editIssue, removeIssue } from '../store/actions';
import TableTree from '@atlaskit/table-tree';
import Avatar from '@atlaskit/avatar';
import Badge from '@atlaskit/badge';
import ModalDialog, { ModalTransition } from '@atlaskit/modal-dialog';
import Form from '@atlaskit/form';
import CreateEditForm from './create-edit-form';
import { userList } from '../common/userList';
import { labels as labelList } from '../common/labelList';
import { priorityList } from '../common/priorityList';
import { sortingFunc } from '../common/sortingFunction';
import PriorityMajorIcon from '@atlaskit/icon-priority/glyph/priority-major';
import PriorityMediumIcon from '@atlaskit/icon-priority/glyph/priority-medium';
import PriorityMinorIcon from '@atlaskit/icon-priority/glyph/priority-minor';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import type { Item,
            User,
            Priority,
            SortingOptions,
            TableItem,
            ActionButton,
            EditFormData,
            EditFormActionData
        } from '../interfaces/interfaces';

type Props = {
    storeTableData: Item[],
    chosenItem: Item,
    sortingBy: SortingOptions,
    chooseItemClick: any,
    editIssue: any,
    itemRemove: any
}

type State = {
    isOpen: boolean,
    tableData : Item[]
};

export class IssuesTable extends React.Component<Props, State> {

    chooseItemClick = this.props.chooseItemClick;
    editIssue = this.props.editIssue;
    itemRemove = this.props.itemRemove;
    state: State = {
        isOpen: !!this.props.chosenItem,
        tableData : this.props.storeTableData
    };
    keyCounter = 0;

    itemClick = (item: Item )=> {
        this.chooseItemClick(item);
        this.setState({ isOpen: true })
    }

    close = () => {
        this.chooseItemClick(null);
        this.setState({ isOpen: false })
    };

    onFormSubmit = (data: EditFormData) => {
        this.editIssue({...data, id: this.props.chosenItem.id});
        setTimeout(() => this.setState({
            tableData: this.props.storeTableData
        }), 0);
        this.close();
    }

    removeItem = (item: Item) => {
        this.itemRemove(item);
        setTimeout(() => this.setState({
            tableData: this.props.storeTableData
        }), 0);
    }

    render() {
        const { isOpen/*(:boolean)*/ } = this.state;

        const sortedTableData: TableItem[] = this.state.tableData.map(issue => {
            return {
                id: issue.id,
                content: issue
            }
        });

        if (this.props.sortingBy && this.props.sortingBy.length) {
            sortedTableData.sort( (a, b) => sortingFunc(a, b, this.props.sortingBy, 0))
        }

        const actionButtons: ActionButton[] = [
            { text: 'Save changes', type: 'submit' },
            { text: 'Cancel', onClick: this.close },
        ];
        const priorityIcon = (priorityLabel: ?string) => {
            switch(priorityLabel) {
                case 'High' :
                    return <PriorityMajorIcon size="medium" />;
                case 'Medium' :
                    return <PriorityMediumIcon size="medium" />;
                case 'Low' :
                    return <PriorityMinorIcon size="medium" />;
                default:
                    return ''
            }
        }

        const issue = (item: Item) => <span onClick={() => this.itemClick(item)} className="summary">
                                    {item.issue}
                                </span>;
        const assignee = ({ assignee }: Item) => { const user: ?User = userList.find( ({ id }) => id === assignee);
                                if (user) return (<span> <Avatar
                                                    size="xsmall"
                                                    src={user.avatar}
                                                />
                                                {user.displayName}
                                            </span>)};
        const labels = (item: Item) => item.labelIds.map( id => {
                                    this.keyCounter++;
                                    return (
                                        <Badge key={this.keyCounter}>
                                            <strong>
                                                {labelList.filter( label => id === label.id)[0].label.toUpperCase()}
                                            </strong>
                                        </Badge>
                                    )}
                                )                                
        const priority = ({priority}: Item) => {const findItemLabel: ?Priority = priorityList.find(({level}) => level === priority);
                                    const itemLabel: ?string = findItemLabel ? findItemLabel.label : null;
                                    return (<span>
                                        {priorityIcon(itemLabel)}
                                        {itemLabel}
                                    </span>)};
        const removing = (item: Item) => <span className="trash-icon" onClick={() => this.removeItem(item)}><TrashIcon /></span>

        return (
            <React.Fragment>
                <TableTree
                    headers={['Issue', 'Assignee', 'Labels', 'Priority', 'Trash']}
                    columns={[issue, assignee, labels, priority, removing]}
                    columnWidths={['200px', '170px', '200px', '150px', '80px']}
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
                                        {({ formProps }) =>( 
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
        chosenItem: state.ui.chosenItem,
        sortingBy: state.ui.sortBy
    }
}

const mapDispatchToProps = dispatch => {
    return {
        chooseItemClick: (item: Item) => dispatch(chooseItem(item)),
        editIssue: (data: EditFormActionData) => dispatch(editIssue(data)),
        itemRemove: (item: Item) => dispatch(removeIssue(item))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IssuesTable);