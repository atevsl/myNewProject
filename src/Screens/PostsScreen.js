import React from "react";
import { Text, StyleSheet, View, Image, RootTagContext } from "react-native";

const PostsScreen = () => {
  // console.log("navigation", navigation);
  // console.log("route", route.params);

  return (
    <View style={styles.container}>
      <Image
        style={styles.userPhoto}
        source={require("../../assets/noUser.jpg")}
      />
      <View style={styles.userDeckription}>
        <Text style={styles.userName}>Name</Text>
        <Text style={styles.userEmail}>email@com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F6F6",
    flex: 1,
    flexDirection: "row",
    paddingTop: 20,
    paddingLeft: 20,
  },
  userPhoto: {
    width: 60,
    height: 60,
    backgroundColor: "red",
    borderRadius: 16,
    marginRight: 10,
  },
  userDeckription: {
    paddingTop: 10,
  },
  userName: {
    fontSize: 13,
    fontFamily: "Roboto-Bold",
  },
  userEmail: { fontSize: 11, fontFamily: "Roboto-Regular" },
});

export default PostsScreen;
