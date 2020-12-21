import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { act, create } from 'react-test-renderer';

import App from './App';

describe('App', () => {
  const { Screen, Navigator } = createStackNavigator()
  it('App', () => {
      act(() => {
          const tree = create(<App />).toJSON();
          expect(tree.toJSON()).toMatchSnapshot();
      })
  });
});
