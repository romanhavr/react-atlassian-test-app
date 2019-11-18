// @flow

import { createSelector } from 'reselect';
import { userList } from '../common/userList';
import { labels } from '../common/labelList';
import { priorityList } from '../common/priorityList';
import type { Item, StoreState } from '../interfaces/interfaces';

export const getIssuesState = (store: StoreState): Item[] => store.issues;

export const getUniqueIssues = createSelector(
    getIssuesState,
    issuesState => [...new Set(issuesState.map(({ issue }) => issue))]
)

export const getUniqueIssuesBy = createSelector(
    getIssuesState,
    issuesState => issuesState.reduce((acc, { issue }) => ({
        ...acc,
        [issue]: acc[issue] ? ++acc[issue] : 1
    }), {})
)

export const getUniqueAssigneeBy = createSelector(
    getIssuesState,
    issuesState => {
        const res = issuesState.reduce((acc, { assignee }) => ({
            ...acc,
            [assignee]: acc[assignee] ? ++acc[assignee] : 1
        }), {})
        return Object.entries(res).reduce((acc, key) => {
            const currentUser = userList.find(user => user.id === +key[0])
            if (currentUser) return ({
            ...acc,
            [currentUser.displayName]: key[1]
        })}, {})
    }
)

export const getUniqueLabelsBy = createSelector(
    getIssuesState,
    issuesState => {
        const allLabels = issuesState.reduce((acc, { labelIds }) => ([
            ...acc,
            labelIds.flat()
        ]), []).flat();
        const res = allLabels.reduce((acc, el) => ({
            ...acc,
            [el]: acc[el] ? ++acc[el] : 1
        }), {});
        return Object.entries(res).reduce((acc, el) => {
            const currentLabel = labels.find(label => label.id === +el[0])
            if (currentLabel) return ({
                ...acc,
                [currentLabel.label]: el[1]
            })}, {})
    }
)

export const getUniquePriorityBy = createSelector(
    getIssuesState,
    issuesState => {
        const res = issuesState.reduce((acc, { priority }) => ({
            ...acc,
            [priority]: acc[priority] ? ++acc[priority] : 1
        }), {})
        return Object.entries(res).reduce((acc, el) => {
            const currentPriority = priorityList.find(priority => priority.level === +el[0])
            if (currentPriority) return ({
            ...acc,
            [currentPriority.label]: el[1]
        })}, {})
    }
)