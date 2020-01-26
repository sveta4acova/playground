import {
  CHANGE_SEARCHFIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
} from './constants'
import * as actions from './actions';
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
const mockStore = configureStore([thunkMiddleware]);

it('setSearchField', () => {
  expect(actions.setSearchField('search')).toEqual({ type: CHANGE_SEARCHFIELD, payload: 'search' });
});

it('requestRobots', () => {
  const store = mockStore();
  store.dispatch(actions.requestRobots());
  const action = store.getActions();
  expect(action[0]).toEqual({ type: REQUEST_ROBOTS_PENDING });
});
