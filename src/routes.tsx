import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NotifierWrapper } from 'react-native-notifier';
import Home from './screens/Home';
import { AppProvider } from './context';
import Login from './screens/Login';
import ManageUsers from './screens/ManageUsers';
import ManageNotifications from './screens/ManageNotifications';
import ManageTips from './screens/ManageTips';
import CreateUser from './screens/CreateUser';
import CreateNotification from './screens/CreateNotification';
import CreateTip from './screens/CreateTip';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <AppProvider>
                <NotifierWrapper>
                    <Stack.Navigator screenOptions={{
                        headerShown: false
                    }}>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="ManageUsers" component={ManageUsers} />
                        <Stack.Screen name="CreateUser" component={CreateUser} />
                        <Stack.Screen name="ManageNotifications" component={ManageNotifications} />
                        <Stack.Screen name="CreateNotification" component={CreateNotification} />
                        <Stack.Screen name="ManageTips" component={ManageTips} />
                        <Stack.Screen name="CreateTip" component={CreateTip} />
                    </Stack.Navigator>
                </NotifierWrapper>
            </AppProvider>
        </NavigationContainer>
    );
}