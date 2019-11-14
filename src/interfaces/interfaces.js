// @flow

export type Item = {
    id: number,
    issue: string,
    priority: number,
    assignee: number,
    labelIds: Array<number>
}

export type TableItem = {
    id: number,
    content: Item
}

export type User = {
    id: number,
    displayName: string,
    avatar: string
}

export type Label = {
    id: number,
    name: string,
    label: string
}

export type Priority = {
    level: number,
    label: string,
    value: string
}

export type FormData = {
    id: number,
    issue: string,
    priority: number,
    asignee: number,
    labelIds: Array<number>
}

export type SortBy = Array<{
    label: string,
    value: string
}>

export type SortingCriteria = {
    newObj1: any,
    newObj2: any
}

export type UIState = {
    chosenItem: Item | null,
    sortBy: Array<SortBy>
}

export type SagaState = {
    sagaData: string | null,
    sagaSucceeded: {
        status: string | null,
        users: Array<User>
    },
    sagaFailed: string | null,
    someUser: string | null
}

export type Action = {
    type: string,
    payload: any
}