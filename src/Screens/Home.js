import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import CreatePostsScreen from "./CreatePostsScreen";

// icons import
import AntDesign from "@expo/vector-icons/AntDesign";

const HomeTabs = createBottomTabNavigator();
const Home = ({ navigation, route }) => {
  console.log("route in Home", route);
  console.log("custom state in Home", route.params.customState);

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
        initialParams={route.params.customState}
      />
      <HomeTabs.Screen name="CreatePostsScreen" component={CreatePostsScreen} />
      <HomeTabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        initialParams={route.params.customState}
      />
    </HomeTabs.Navigator>
  );
};

export default Home;
