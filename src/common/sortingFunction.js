import { priorityList } from '../common/priorityList';
import { userList } from '../common/userList';

export function sortingFunc(a, b, sortingBy, i) {
    if (comparing(a, b, sortingBy[i].value, 'more')) {
        return 1
    } else if (comparing(a, b, sortingBy[i].value, 'eq') &&
        i < sortingBy.length - 1) {
        return sortingFunc(a, b, sortingBy, ++i)
    } else if (comparing(a, b, sortingBy[i].value, 'less')) {
        return -1
    }
};

function comparing (a, b, sortingValue, compareIndex) {
    const newObject = sortingCriteria (a.content[sortingValue], b.content[sortingValue], sortingValue)
    switch (compareIndex) {
        case 'more' :
            return newObject.newObj1 > newObject.newObj2;
        case 'eq' :
            return newObject.newObj1 === newObject.newObj2;
        case 'less' :
            return newObject.newObj1 < newObject.newObj2;
        default:
            return
    }
}

function sortingCriteria (obj1, obj2, sortingValue) {
    switch(sortingValue) {
        case 'issue' :
            return { newObj1: obj1, newObj2: obj2};
        case 'assignee' :
            return { 
                newObj1: userList.find(el => el.id === obj1).displayName,
                newObj2: userList.find(el => el.id === obj2).displayName
            };
        case 'priority' :
            return {
                newObj1: priorityList.find(el => el.value === obj1.value).level,
                newObj2: priorityList.find(el => el.value === obj2.value).level
            };
        default:
            return
    }
}