// @flow

export type Item = {
    id: Number,
    issue: String,
    priority: Number,
    asignee: Number,
    labelIds: Array<Number>
}

export type FormData = {
    id: Number,
    issue: String,
    priority: Number,
    asignee: Number,
    labelIds: Array<Number>
}

export type SortBy = Array<{
    label: String,
    value: String
}>

export type UIState = {
    chosenItem: Item | null,
    sortBy: Array<SortBy>
}

export type Action = {
    type: String,
    payload: any
}