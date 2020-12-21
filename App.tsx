import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, DetailScreen, SelfieScreen } from './screens'

const { Screen, Navigator } = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
        <View style={styles.container}>
            <Navigator>
                <Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={({route}) => ({title: 'Home'})}/>
                <Screen
                    name="DetailScreen"
                    component={DetailScreen}
                    options={({route}) => ({title: route.params.productId})}/>
                <Screen
                    name="SelfieScreen"
                    component={SelfieScreen}
                    options={({route}) => ({title: 'Selfie'})}/>
            </Navigator>
        </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App
