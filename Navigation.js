import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home "
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="cart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isAuth = await AsyncStorage.getItem('isAuth');
      if (isAuth === 'true') {
        setIsAuthenticated(true);
      }
      setLoading(false);
    } catch (error) {
      console.log('Error reading AsyncStorage:', error);
    }
  };
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={'large'} color={'grey'} />
        <Text style={styles.loadingTxt}>Loading...</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'Home' : 'Login'}>
        <Stack.Screen
          name="Home"
          component={MainTabNavigator}
          options={{headerShown: false}} // Hide header for authenticated users
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
            transitionSpec: {
              open: {animation: 'timing', config: {duration: 400}},
              close: {animation: 'timing', config: {duration: 400}},
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingTxt: {fontSize: 16, fontWeight: 'bold', color: 'grey'},
});
export default AppNavigator;
