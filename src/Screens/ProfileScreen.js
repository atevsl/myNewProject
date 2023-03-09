import React from "react";
import { Text, StyleSheet, View } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>this is ProfileScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default ProfileScreen;
