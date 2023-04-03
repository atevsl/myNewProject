import React from "react";
import Default from "../Posts/Default";
import MapScreen from "../Posts/MapScreen";
import CommentsScreen from "../Posts/CommentsScreen";

import { createStackNavigator } from "@react-navigation/stack";

const NestedScreen = createStackNavigator();

const PostsScreen = ({ route }) => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Default"
        component={Default}
        initialParams={route.params}
      />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} />
      <NestedScreen.Screen name="CommentsScreen" component={CommentsScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
