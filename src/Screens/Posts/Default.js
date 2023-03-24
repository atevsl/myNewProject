import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome } from "@expo/vector-icons";

const Default = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  console.log("route.params in Default", route.params);
  useEffect(() => {
    if (route.params.post) {
      setPosts((prevState) => [...prevState, route.params.post]);
    }
  }, [route.params]);
  console.log("posts", posts);
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Image
          style={styles.userPhoto}
          source={require("../../../assets/noUser.jpg")}
        />
        <View style={styles.userDeckription}>
          {route.params.login && (
            <Text style={styles.userName}>{route.params.login}</Text>
          )}
          {route.params.email && (
            <Text style={styles.userEmail}>{route.params.email}</Text>
          )}
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
      {posts && (
        <FlatList
          data={posts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: item.photo }}
                // source={require({ item.photo })}
                // require('../assets/images/emoji1.png')
                style={{
                  height: 100,
                  backgroundColor: "white",
                  marginHorizontal: 10,
                }}
              />
              <Text style={{ fontSize: 8, color: "black" }}>{item.photo}</Text>
              <Text style={{ fontSize: 16, color: "black" }}>{item.title}</Text>
              <TouchableOpacity
                style={styles.photoDescription}
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate("MapScreen");
                }}
              >
                <FontAwesome name="map-marker" size={24} color="black" />
                <Text style={{ color: "black" }}>map</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.photoDescription}
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate("CommentsScreen");
                }}
              >
                <FontAwesome name="comments-o" size={24} color="black" />
                <Text>123</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  containerTitle: {
    backgroundColor: "#F6F6F6",
    flexDirection: "row",
    paddingTop: 20,
    paddingLeft: 20,
  },
  btnLogOut: {
    paddingLeft: 240,
    paddingTop: 15,
  },
  userPhoto: {
    width: 60,
    height: 60,

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
  photoContainer: {
    marginHorizontal: 10,
    marginBottom: 50,
    border: 1,
    borderColor: "black",
    height: 150,
    borderColor: "black",
    borderWidth: 1,
  },
  photoDescription: {
    display: "flex",
    flexDirection: "row",
  },
});

export default Default;
