import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/User/Home';
import CreateTip from '../screens/User/CreateTip';
import ManageOrders from '../screens/User/ManageOrders';
import CreateOrder from '../screens/User/CreateOrder';
import ListNotifications from '../screens/User/ListNotifications';
import ListTips from '../screens/User/ListTips';
import OrderView from '../screens/User/OrderView';
import CardView from '../screens/User/CardView';


const Stack = createStackNavigator();

export default function UserRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ManageOrders" component={ManageOrders} />
            <Stack.Screen name="CreateOrder" component={CreateOrder} />
            <Stack.Screen name="ListNotifications" component={ListNotifications} />
            <Stack.Screen name="ListTips" component={ListTips} />
            <Stack.Screen name="CreateTip" component={CreateTip} />
            <Stack.Screen name="OrderView" component={OrderView} />
            <Stack.Screen name="CardView" component={CardView} />
        </Stack.Navigator>
    );
}