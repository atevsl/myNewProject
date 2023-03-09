import React from "react";
import { Text, StyleSheet, View, Image, RootTagContext } from "react-native";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.userPhoto} />
      <View>
        <Text>Name</Text>
        <Text>email@com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 20,
  },
  userPhoto: {
    width: 60,
    height: 60,
    backgroundColor: "grey",
    borderRadius: 16,
    marginRight: 10,
  },
});

export default PostsScreen;
