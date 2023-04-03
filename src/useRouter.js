import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const HomeTabs = createBottomTabNavigator();

// icons import
import AntDesign from "@expo/vector-icons/AntDesign";
import LoginScreen from "./Auth/LoginScreen";
import RegistrationScreen from "./Auth/RegistrationScreen";
import PostsScreen from "./Screens/Posts/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";

export const useRouter = (isAuth) => {
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
      screenOptions={({ navigation, route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "check";

          if (route.name === "PostsScreen") {
            iconName = focused ? "appstore1" : "appstore-o";
          }
          if (route.name === "ProfileScreen") {
            iconName = focused ? "user" : "user";
          }
          if (route.name === "CreatePostsScreen") {
            iconName = focused ? "pluscircle" : "pluscircleo";
          }
          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "#212121",
      })}
    >
      <HomeTabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{ headerShown: false }}
      />
      <HomeTabs.Screen name="CreatePostsScreen" component={CreatePostsScreen} />
      <HomeTabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        // initialParams={route.params.customState}
      />
    </HomeTabs.Navigator>
  );
};
