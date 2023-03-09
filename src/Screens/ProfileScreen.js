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

const ProfileScreen = () => {
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
              <Text style={styles.avatarBtnTitle}>*</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Name</Text>

          <SafeAreaView style={styles.container}>
            {/* <FlatList
              data={posts}
              renderItem={({ post }) => (
                <View>
                  <Image
                    // source={require("{post.href}")}
                    source={post.href}
                    resizeMode="cover"
                    style={styles.postPhoto}
                  />
                  <View style={styles.postDescription}>
                    <Text>{post.title}</Text>
                    <AntDesign name="message1" size={24} color="black" />
                    <Text>{post.comments}</Text>
                    <AntDesign name="like2" size={24} color="black" />
                    <Text>{post.likes}</Text>
                    <AntDesign name="enviromento" size={24} color="black" />
                    <Text>{post.location}</Text>
                  </View>
                </View>
              )}
              keyExtractor={(post) => post.id}
            /> */}
            <ScrollView>
              {posts.map((post) => {
                return (
                  <View key={post.id}>
                    <Image
                      // source={require("{post.href}")}
                      source={post.href}
                      resizeMode="cover"
                      style={styles.postPhoto}
                    />
                    <View style={styles.postDescription}>
                      <Text>{post.title}</Text>
                      <AntDesign name="message1" size={24} color="black" />
                      <Text>{post.comments}</Text>
                      <AntDesign name="like2" size={24} color="black" />
                      <Text>{post.likes}</Text>
                      <AntDesign name="enviromento" size={24} color="black" />
                      <Text>{post.location}</Text>
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
    height: 550,
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
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 15,
  },
  avatarBtnTitle: {
    color: "grey",
    fontSize: 25,
    marginTop: -4,
    marginLeft: 6,
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
  postDescription: {
    flexDirection: "row",
  },
});

export default ProfileScreen;
