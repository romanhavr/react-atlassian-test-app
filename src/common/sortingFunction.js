// @flow

import type { TableItem, SortingOptions, SortingCriteria } from '../interfaces/interfaces';
import { priorityList } from '../common/priorityList';
import { userList } from '../common/userList';

export function sortingFunc(a: TableItem, b: TableItem, sortingBy: SortingOptions, i: number): number {
        if (comparing(a, b, sortingBy[i].value, 'more')) {
            return 1
        } else if (comparing(a, b, sortingBy[i].value, 'less')) {
            return -1
        } else if (comparing(a, b, sortingBy[i].value, 'eq') && i < sortingBy.length - 1) {
            return sortingFunc(a, b, sortingBy, ++i)
        } else
            return 0
};

function comparing (a: TableItem, b: TableItem, sortingValue: string, compareIndex: string): boolean {
    const newObject: SortingCriteria = sortingCriteria (a.content[sortingValue], b.content[sortingValue], sortingValue)
    switch (compareIndex) {
        case 'more' :
            return newObject.newObj1 > newObject.newObj2;
        case 'eq' :
            return newObject.newObj1 === newObject.newObj2;
        case 'less' :
            return newObject.newObj1 < newObject.newObj2;
        default:
            return newObject.newObj1 > newObject.newObj2;
    }
}

function sortingCriteria (obj1, obj2, sortingValue: string): SortingCriteria {
    switch(sortingValue) {
        case 'issue' :
            return { newObj1: obj1, newObj2: obj2};
        case 'assignee' :
            const userById1 = userList.find(el => el.id === obj1);
            const userById2 = userList.find(el => el.id === obj2);
            if (userById1 && userById2) return { 
                newObj1: userById1.displayName,
                newObj2: userById2.displayName
            };
            break;
        case 'priority' :
            const priorityByValue1 = priorityList.find(el => el.value === obj1.value);
            const priorityByValue2 = priorityList.find(el => el.value === obj2.value);
            if (priorityByValue1 && priorityByValue2) return {
                newObj1: priorityByValue1.level,
                newObj2: priorityByValue2.level
            };
            break;
        default:
            return { newObj1: obj1, newObj2: obj2};
    }
}