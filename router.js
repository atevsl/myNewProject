import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "./src/Screens/PostsScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";
import CreatePostsScreen from "./src/Screens/CreatePostsScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
// icons import
import AntDesign from "@expo/vector-icons/AntDesign";

const AuthStack = createStackNavigator();
const HomeTabs = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <HomeTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "check";

          if (route.name === "PostsScreen") {
            iconName = focused ? "appstore-o" : "appstore1";
          }
          if (route.name === "ProfileScreen") {
            iconName = focused ? "user" : "user";
          }
          if (route.name === "CreatePostsScreen") {
            iconName = focused ? "pluscircleo" : "pluscircle";
          }

          console.log("iconName", iconName);
          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "#212121",
      })}
    >
      <HomeTabs.Screen name="PostsScreen" component={PostsScreen} />
      <HomeTabs.Screen name="CreatePostsScreen" component={CreatePostsScreen} />
      <HomeTabs.Screen name="ProfileScreen" component={ProfileScreen} />
    </HomeTabs.Navigator>
  );
};
