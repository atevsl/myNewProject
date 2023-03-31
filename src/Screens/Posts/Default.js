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
import { authSignOutUser } from "../../../redux/auth/authOperation";

const Default = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //   if (route.params.post) {
    //     setPosts((prevState) => [...prevState, route.params.post]);
    //   }
    // }, [route.params.post]);
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Image
          style={styles.userPhoto}
          source={require("../../../assets/noUser.jpg")}
        />
        <View style={styles.userDeckription}>
          <Text style={styles.userEmail}>login</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btnLogOut}
          onPress={() => {
            console.log("=====press logout!=====");
            dispatch(authSignOutUser());
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
                style={{
                  height: 100,
                  backgroundColor: "white",
                  marginHorizontal: 10,
                }}
              />
              <Text style={{ fontSize: 16, color: "black", padding: 10 }}>
                {item.title}
              </Text>
              <View style={styles.photoDescriptionWraper}>
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
              </View>
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
    marginBottom: 30,
    height: 150,
  },
  photoDescription: {
    display: "flex",
    flexDirection: "row",
  },
  photoDescriptionWraper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
});

export default Default;
