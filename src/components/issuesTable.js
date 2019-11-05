import React from 'react';
import { connect } from 'react-redux';
import '../styles/modalWindow.css';
import { chooseItem, editIssue } from '../store/actions';
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

class IssuesTable extends React.Component {

    chooseItemClick = this.props.chooseItemClick;
    editIssue = this.props.editIssue;
    state = {
        isOpen: !!this.props.chosenItem,
        tableData: this.props.storeTableData
    };
    keyCounter = 0;

    itemClick = (item) => {
        this.chooseItemClick(item);
        this.setState({ isOpen: true })
    }

    close = () => {
        this.chooseItemClick(null);
        this.setState({ isOpen: false })
    };

    onFormSubmit = (data) => {
        this.editIssue({...data, id: this.props.chosenItem.id});
        setTimeout(() => this.setState({
            tableData: this.props.storeTableData
        }), 0);
        this.close();
    }

    render() {
        const { isOpen } = this.state;

        const sortedTableData = this.state.tableData.map(issue => {
            return {
                id: issue.id,
                content: issue
            }
        });

        if (this.props.sortingBy && this.props.sortingBy.length) {
            sortedTableData.sort( (a, b) => sortingFunc(a, b, this.props.sortingBy, 0))
        }

        const actions = [
            { text: 'Save changes', type: 'submit' },
            { text: 'Cancel', onClick: this.close },
        ];
        const priorityIcon = (priorityLabel) => {
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

        const issue = (item) => <span onClick={() => this.itemClick(item)} className="summary">
                                    {item.issue}
                                </span>;
        const assignee = (item) => <span><Avatar
                                            size="xsmall"
                                            src={userList.find(user => user.id === item.assignee).avatar}
                                        />
                                    {userList.find(user => user.id === item.assignee).displayName}
                                </span>;
        const labels = (item) => item.labelIds.map((id )=> {
                                    this.keyCounter++;
                                    return (
                                        <Badge key={this.keyCounter}>
                                            <strong>
                                                {labelList.filter( label => id === label.id)[0].label.toUpperCase()}
                                            </strong>
                                        </Badge>
                                    )}
                                )                                
        const priority = (item) => {const itemLabel = priorityList.find(priorityItem => priorityItem.level === item.priority).label;
                                    return (<span>
                                        {priorityIcon(itemLabel)}
                                        {itemLabel}
                                    </span>)};

        return (
            <React.Fragment>
                <TableTree
                    headers={['Issue', 'Assignee', 'Labels', 'Priority']}
                    columns={[issue, assignee, labels, priority]}
                    columnWidths={['200px', '200px', '250px', '150px']}
                    items={sortedTableData}
                />
                <ModalTransition>
                    {isOpen && (
                        <ModalDialog
                            actions={actions}
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
        chooseItemClick: item => dispatch(chooseItem(item)),
        editIssue: data => dispatch(editIssue(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IssuesTable);