import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/User/Home';
import ManageUsers from '../screens/User/ManageUsers';
import CreateUser from '../screens/User/CreateUser';
import ManageNotifications from '../screens/User/ManageNotifications';
import CreateNotification from '../screens/User/CreateNotification';
import ManageTips from '../screens/User/ManageTips';
import CreateTip from '../screens/User/CreateTip';


const Stack = createStackNavigator();

export default function UserRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ManageUsers" component={ManageUsers} />
            <Stack.Screen name="CreateUser" component={CreateUser} />
            <Stack.Screen name="ManageNotifications" component={ManageNotifications} />
            <Stack.Screen name="CreateNotification" component={CreateNotification} />
            <Stack.Screen name="ManageTips" component={ManageTips} />
            <Stack.Screen name="CreateTip" component={CreateTip} />
        </Stack.Navigator>
    );
}