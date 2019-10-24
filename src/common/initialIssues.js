export const initialIssues = [
  {
    id: 1,
    content: {
      id: 1,
      issue: '1-st',
      priority: { level: 2, label: 'Medium', value: 'medium' },
      assignee: 1,
      labelIds: [1]
    }
  },
  {
    id: 2,
    content: {
      id: 2,
      issue: '2-nd',
      priority: { level: 3, label: 'Low', value: 'low' },
      assignee: 2,
      labelIds: [2]
    }
  },
  {
    id: 3,
    content: {
      id: 3,
      issue: '1-st copy',
      priority: { level: 1, label: 'High', value: 'high' },
      assignee: 1,
      labelIds: [1]
    }
  },
  {
    id: 4,
    content: {
      id: 4,
      issue: '3-rd',
      priority: { level: 1, label: 'High', value: 'high' },
      assignee: 4,
      labelIds: [2, 3]
    }
  },
  {
    id: 5,
    content: {
      id: 5,
      issue: '1-st another copy',
      priority: { level: 3, label: 'Low', value: 'low' },
      assignee: 3,
      labelIds: [1, 3]
    }
  },
  {
    id: 6,
    content: {
      id: 6,
      issue: '1-st',
      priority: { level: 1, label: 'High', value: 'high' },
      assignee: 4,
      labelIds: [1, 3]
    }
  },
  {
    id: 7,
    content: {
      id: 7,
      issue: '1-st',
      priority: { level: 2, label: 'Medium', value: 'medium' },
      assignee: 2,
      labelIds: [1, 3]
    }
  }
]