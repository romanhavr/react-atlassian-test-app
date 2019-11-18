// @flow

import { userList } from '../common/userList';
import { labels } from '../common/labelList';
import { priorityList } from '../common/priorityList';

export const getIssuesState = store => store.issues;

export const getUniqueIssues = store => {
    return [...new Set(getIssuesState(store).map( ({ issue }) => issue))];
};

export const getUniqueIssuesBy = store => {
    const res = getIssuesState(store).reduce( (acc, {issue}) => ({
        ...acc,
        [issue]: acc[issue] ? ++acc[issue] : 1
    }), {})
    return res
}

export const getUniqueAssigneeBy = store => {
    const res =  getIssuesState(store).reduce( (acc, {assignee}) => ({
        ...acc,
        [assignee]: acc[assignee] ? ++acc[assignee] : 1
    }), {})
    const newRes = {};
    Object.keys(res).forEach( key => {
        newRes[userList.find(user => user.id === +key).displayName] = res[key]
    })
    return newRes
}

export const getUniqueLabelsBy = store => {
    const allLabels =  getIssuesState(store).reduce( (acc, {labelIds}) => ([
        ...acc,
        labelIds.flat()
    ]), []).flat();
    const res = allLabels.reduce( (acc, el) => ({
        ...acc,
        [el]: acc[el] ? ++acc[el] : 1
    }), {});
    return Object.entries(res).reduce( (acc, el) => ({
        ...acc,
        [labels.find(label => label.id === +el[0]).label]: el[1]
    }), {})
}

export const getUniquePriorityBy = store => {
    const res =  getIssuesState(store).reduce( (acc, {priority}) => ({
        ...acc,
        [priority]: acc[priority] ? ++acc[priority] : 1
    }), {})
    return Object.entries(res).reduce( (acc, el) => ({
        ...acc,
        [priorityList.find(priority => priority.level === +el[0]).label]: el[1]
    }), {})
}