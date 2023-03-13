import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const PostsScreen = ({ navigation, route }) => {
  console.log("route in posts screen", route);
  return (
    <View style={styles.container}>
      <Image
        style={styles.userPhoto}
        source={require("../../assets/noUser.jpg")}
      />
      <View style={styles.userDeckription}>
        <Text style={styles.userName}>{route.params}</Text>
        <Text style={styles.userEmail}>email@com</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btnLogOut}
        onPress={() => {
          navigation.navigate("LoginScreen");
        }}
      >
        <AntDesign name="logout" size={24} color="black" />
      </TouchableOpacity>
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
  btnLogOut: {
    paddingLeft: 200,
    paddingTop: 15,
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
