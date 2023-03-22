import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const POSTS = [
  {
    id: "45k6-j54k-4jth",
    href: "../../assets/defPost.jpg",
    title: "one",
    comments: 12,
    likes: 45,
    location: "Ukraine",
  },
  {
    id: "45k6-jrgre54k-r4jth",
    href: "../../assets/defPost.jpg",
    title: "two",
    comments: 53,
    likes: 5,
    location: "us",
  },
  {
    id: "45k6-j5geafhhhr4k-4jth",
    href: "../../assets/defPost.jpg",
    title: "three",
    comments: 5,
    likes: 23,
    location: "africa",
  },
];

const ProfileScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState(POSTS);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/PhotoBG.jpg")}
        resizeMode="cover"
        style={styles.imageBG}
      >
        <View style={styles.form}>
          <View style={styles.avatar}>
            <TouchableOpacity activeOpacity={0.8} style={styles.avatarBtn}>
              <AntDesign
                style={styles.avatarBtnTitle}
                name="pluscircleo"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.userDeckription}>
            {route.params.login && (
              <Text style={styles.name}>{route.params.login}</Text>
            )}
            {route.params.email && (
              <Text style={styles.userEmail}>{route.params.email}</Text>
            )}
          </View>

          <SafeAreaView style={styles.container}>
            <ScrollView>
              {posts.map((post) => {
                return (
                  <View key={post.id}>
                    <Image
                      source={require("../../assets/defPost.jpg")}
                      resizeMode="cover"
                      style={styles.postPhoto}
                    />
                    <View style={styles.postTitle}>
                      <Text>{post.title}</Text>
                      <View style={styles.postDescription}>
                        <View style={styles.postDescWrap}>
                          <AntDesign name="message1" size={24} color="black" />
                          <Text style={{ marginLeft: 10 }}>
                            {post.comments}
                          </Text>
                        </View>
                        <View style={styles.postDescWrap}>
                          <AntDesign name="like2" size={24} color="black" />
                          <Text style={{ marginLeft: 10 }}>{post.likes}</Text>
                        </View>
                        <View style={styles.postDescWrap}>
                          <AntDesign
                            name="enviromento"
                            size={24}
                            color="black"
                          />
                          <Text style={{ marginLeft: 10 }}>
                            {post.location}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#fff",
    height: 650,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 16,
    alignItems: "center",
  },
  avatar: {
    width: 132,
    height: 120,
    marginTop: -60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginBottom: 32,
  },
  avatarBtn: {
    width: 25,
    height: 25,
    marginTop: 81,
    marginLeft: 119.5,
  },
  avatarBtnTitle: {
    color: "grey",
  },
  name: {
    textAlign: "center",
    fontSize: 30,
  },
  postPhoto: {
    width: 343,
    height: 240,
    borderRadius: 10,
    marginTop: 32,
    marginBottom: 8,
  },
  postTitle: {},
  postDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postDescWrap: {
    flexDirection: "row",
  },
  userDeckription: {
    paddingTop: 10,
  },
  userEmail: { fontSize: 11, fontFamily: "Roboto-Regular" },
});

export default ProfileScreen;
