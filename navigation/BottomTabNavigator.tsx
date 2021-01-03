import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { BottomTabParamList, HomeParamList, ToDoParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.tabIconSelected,
        inactiveTintColor: Colors.tabIconDefault,
        style: { backgroundColor: Colors.tabBackground, height: 55 },
        labelStyle: { marginBottom: 8, fontSize: 8 },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={ToDoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Coming Soon"
        component={ToDoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="play-circle-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Downloads"
        component={ToDoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="download-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="More"
        component={ToDoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="menu-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
function TabBarIcon(props: { name: any; color: string }) {
  return (
    <Ionicons size={24} style={{ marginBottom: -6 }} {...props}></Ionicons>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
    </HomeStack.Navigator>
  );
}

const ToDoStack = createStackNavigator<ToDoParamList>();

function ToDoNavigator() {
  return (
    <ToDoStack.Navigator screenOptions={{ headerShown: false }}>
      <ToDoStack.Screen
        name="NotFoundScreen"
        component={NotFoundScreen}
        options={{ title: "NotFound" }}
      />
    </ToDoStack.Navigator>
  );
}
