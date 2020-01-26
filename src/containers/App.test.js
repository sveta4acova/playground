import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import App from './App';

it('render App', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const initialState = {
    searchRobots: {
      searchField: '',
    },
    requestRobots: {
      robots: [],
      isPending: false,
    }
  };
  const store = mockStore(initialState);
  expect(shallow(<App store={store} />)).toMatchSnapshot();
});
