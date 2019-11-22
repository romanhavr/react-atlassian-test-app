// @flow

import React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import TableTree from '@atlaskit/table-tree';
import { getUniqueIssues, getUniqueIssuesBy, getUniqueLabelsBy, 
        getUniqueAssigneeBy, getUniquePriorityBy
} from '../store/selectors';
import { userList } from '../common/userList';
import { labels } from '../common/labelList';
import { priorityList } from '../common/priorityList';

type Props = {
    uniqueIssues: any,
    uniqueIssuesBy: any,
    uniqueAssigneeBy: any,
    uniqueLabelsBy: any,
    uniquePriorityBy: any
}

export function Statistics(props: Props) {
    const numberOf = (item) => <span>{item[0]}</span>;

    const numberBy = (item) => Object.entries(detailsBy(item[1])).map(entry => 
                <span key={entry[0]}>
                    <b>{entry[0]}:</b> {R.toString(entry[1])}<br/>
                </span>)
    
    const total = (item) => <span>{item[2]}</span>

    const stitisticsTableData = [
        {
            id: 'issues',
            content: ['Unique issues', 'issue', props.uniqueIssues.length]
        },
        {
            id: 'assegnees',
            content: ['Unique assignees', 'assignee', userList.length]
        },
        {
            id: 'labels',
            content: ['Unique labels', 'labelIds', labels.length]
        },
        {
            id: 'priority',
            content: ['Unique priorities', 'priority', priorityList.length]
        }
    ];

    const detailsBy = (key) => {
        switch(key) {
            case 'issue':
                return props.uniqueIssuesBy;
            case 'labelIds':
                return props.uniqueLabelsBy;
            case 'assignee':
                return props.uniqueAssigneeBy;
            case 'priority':
                return props.uniquePriorityBy;
            default:
                return props.uniqueIssues
        }
    }

    return (
        <React.Fragment>
            <h2>Statistics</h2>
            {/* {getUnique} */}
            <TableTree
                headers={['Number of', 'Number by', 'Total number']}
                columns={[numberOf, numberBy, total]}
                columnWidths={['300px', '300px', '200px']}
                items={stitisticsTableData}
            />
        </React.Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        uniqueIssues: getUniqueIssues(state),
        uniqueIssuesBy: getUniqueIssuesBy(state),
        uniqueAssigneeBy: getUniqueAssigneeBy(state),
        uniqueLabelsBy: getUniqueLabelsBy(state),
        uniquePriorityBy: getUniquePriorityBy(state),
    }
}

export default connect(
    mapStateToProps
)(Statistics);
