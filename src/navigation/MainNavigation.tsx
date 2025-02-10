import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Leave from '../screen/Leave';
import Login from '../screen/Login';
import AddLeave from '../screen/AddLeave';
import EditLeave from '../screen/EditLeave';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Leave" component={Leave} />
        <Stack.Screen name="AddLeave" component={AddLeave} />
        <Stack.Screen name="EditLeave" component={EditLeave} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
