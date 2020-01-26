import {
  CHANGE_SEARCHFIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
} from './constants';
import * as reducers from './reducers';

const initialStateSearch = {
  searchField: ''
};
const initialStateRobots = {
  robots: [],
  isPending: false
};

describe('searchRobots reducer', () => {
  it('return init state', () => {
    expect(reducers.searchRobots(undefined, {})).toEqual(initialStateSearch);
  });

  it('if action type - CHANGE_SEARCHFIELD', () => {
    expect(reducers.searchRobots(initialStateSearch, {type: CHANGE_SEARCHFIELD, payload: 'aaa'})).toEqual({searchField: 'aaa'});
  });
});

describe('requestRobots reducer', () => {
  it('return init state', () => {
    expect(reducers.requestRobots(undefined, {})).toEqual(initialStateRobots);
  });

  it('if action type - REQUEST_ROBOTS_PENDING', () => {
    expect(reducers.requestRobots(initialStateRobots, {type: REQUEST_ROBOTS_PENDING})).toEqual({
      isPending: true,
      robots: []
    });
  });

  it('if action type - REQUEST_ROBOTS_SUCCESS', () => {
    expect(reducers.requestRobots(initialStateRobots, {type: REQUEST_ROBOTS_SUCCESS, payload: [{}]})).toEqual({
      isPending: false,
      robots: [{}]
    });
  });

  it('if action type - REQUEST_ROBOTS_FAILED', () => {
    expect(reducers.requestRobots(initialStateRobots, {type: REQUEST_ROBOTS_FAILED, payload: 'error'})).toEqual({
      isPending: false,
      robots: [],
      error: 'error'
    });
  });
});
