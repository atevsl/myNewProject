import React from "react";
import { Text, StyleSheet, View } from "react-native";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>this is PostsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default PostsScreen;
