import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { act, create } from 'react-test-renderer';

import { DetailScreen } from '../';

describe('DetailScreen', () => {
  const { Screen, Navigator } = createStackNavigator()
  it('Details screen', () => {
      act(() => {
          const tree = create(
              <NavigationContainer>
                <Navigator>
                  <Screen
                      name="DetailScreen"
                      component={DetailScreen}/>
                </Navigator>
              </NavigationContainer>).toJSON();
              expect(tree.toJSON()).toMatchSnapshot();
      })
  });
});
