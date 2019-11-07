import { USER_FETCH_REQUESTED } from '../actionTypes';
import sagaReducers from './saga-reducer';

const sagaDefaultState = {
    sagaData: null,
    sagaSucceeded: null,
    sagaFailed: null,
    someUser: null
  }

describe('Saga Reducers', () => {

    it('Should return default state', () => {
        const newState = sagaReducers(undefined, {});
        expect(newState).toEqual(sagaDefaultState);
    })

    it('Should return state with passed "sagaData"', () => {
        const newState = sagaReducers(undefined, {type: USER_FETCH_REQUESTED, payload: 'Some sagaData'});
        expect(newState).not.toEqual(sagaDefaultState);
    })
})