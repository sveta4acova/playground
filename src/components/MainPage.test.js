import React from 'react';
import { shallow } from 'enzyme';
import MainPage from './MainPage';

let wrapper;
beforeEach(() => {
  const mockProps = {
    onRequestRobots: jest.fn(),
    onSearchChange: jest.fn(),
    robots: [],
    searchField: '',
    isPending: false,
  };

  wrapper = shallow(<MainPage {...mockProps} />);
});

it('render MainPage', () => {
  expect(wrapper).toMatchSnapshot();
});

it('filters robots', () => {
  expect(wrapper.instance().filterRobots()).toEqual([]);
});

it('filters robots 2', () => {
  const mockProps = {
    onRequestRobots: jest.fn(),
    onSearchChange: jest.fn(),
    robots: [{
      id: 1,
      name: 'John',
      email: 'john@gmail.com'
    }],
    searchField: 'john',
    isPending: false,
  };

  wrapper = shallow(<MainPage {...mockProps} />);
  expect(wrapper.instance().filterRobots()).toEqual([{
    id: 1,
    name: 'John',
    email: 'john@gmail.com'
  }]);
});
