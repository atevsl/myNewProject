import React from "react";
import { Text, StyleSheet, View } from "react-native";

const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>this is CreatePostsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default CreatePostsScreen;
