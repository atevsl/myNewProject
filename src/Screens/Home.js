import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import CreatePostsScreen from "./CreatePostsScreen";

// icons import
import AntDesign from "@expo/vector-icons/AntDesign";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const HomeTabs = createBottomTabNavigator();
const Home = ({ navigation }) => {
  return (
    <HomeTabs.Navigator
      screenOptions={({ route }) => ({
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

export default Home;
