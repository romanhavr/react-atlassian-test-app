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

export type Assegnee = {
    id: number,
    value: string,
    label: string
}

export type EditFormData = {
    assignee: Assegnee,
    issue: string,
    labels: string[],
    priority: Priority
}

export type EditFormActionData = {
    id: number,
    assignee: Assegnee,
    issue: string,
    labels: string[],
    priority: Priority
}

export type AddFormActionData = {
    id: number,
    issue: string,
    priority: Priority,
    assignee: {
        id: number
    },
    labels: Label[]
}

export type FormData = {
    id: number,
    issue: string,
    priority: number,
    assignee: number,
    labelIds: Array<number>
}

export type SortingOptions = Option[];

export type Option = {
    label: string,
    value: string
}

export type SortingCriteria = {
    newObj1: any,
    newObj2: any
}

export type UIState = {
    chosenItem: Item | null,
    sortBy: SortingOptions
}

export type SagaState = {
    sagaData: string | null,
    sagaSucceeded: {
        status: string | null,
        users: Array<User>
    } | null,
    sagaFailed: string | null,
    someUser: string | null
}

export type SagaSucceededData ={
    status: string,
    users: User[]
}

export type Action = {
    type: string,
    payload: any
}

export type ActionButton = {
    text: string,
    type?: string,
    onClick?: any
}