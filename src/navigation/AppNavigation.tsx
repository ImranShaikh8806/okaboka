import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import SignUpScreen from '../screens/SignUpScreen';
import VerifyScreen from '../screens/VerifyScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AboutYouScreen from '../screens/AboutYouScreen';
import RelationWorkScreen from '../screens/RelationWorkScreen';



export type RootStackParamList = {
  Splash: undefined;
  SignUp: undefined;
  Verify: undefined;
  HomeScreen: undefined;
  ProfileScreen:undefined;
  AboutYouScreen:undefined
  RelationWorkScreen:undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false, 
          gestureEnabled: false, 
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="Verify" 
          component={VerifyScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen}
          options={{
            gestureEnabled: false,
          }}
        />
           <Stack.Screen 
          name="ProfileScreen" 
          component={ProfileScreen}
          options={{
            gestureEnabled: false,
          }}
        />
              <Stack.Screen 
          name="AboutYouScreen" 
          component={AboutYouScreen}
          options={{
            gestureEnabled: false,
          }}
        />
                <Stack.Screen 
          name="RelationWorkScreen" 
          component={RelationWorkScreen}
          options={{
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;