import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { FlatList } from "react-native";

const ProfileScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const { userId, displayName, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getAllPost = async () => {
    const colRef = collection(db, "posts");
    const q = query(colRef, where("userId", "==", `${userId}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPosts((prevState) => [...prevState, doc.data()]);
    });
  };

  useEffect(() => {
    getAllPost();
  }, [navigation, route]);

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
            <Text style={styles.name}>{displayName}</Text>
          </View>
          {posts && (
            <FlatList
              data={posts}
              keyExtractor={(item, indx) => indx}
              renderItem={({ item }) => (
                <View>
                  <Image
                    source={{ uri: item.photo }}
                    resizeMode="cover"
                    style={styles.postPhoto}
                  />
                  <View style={styles.postTitle}>
                    <Text>{item.title}</Text>
                    <View style={styles.postDescription}>
                      <View style={styles.postDescWrap}>
                        <AntDesign name="message1" size={24} color="black" />
                        <Text style={{ marginLeft: 10 }}>
                          {item.comments ? item.comments.length : ""}
                        </Text>
                      </View>

                      <View style={styles.postDescWrap}>
                        <AntDesign name="like2" size={24} color="black" />
                        <Text style={{ marginLeft: 10 }}></Text>
                      </View>

                      <View style={styles.postDescWrap}>
                        <AntDesign name="enviromento" size={24} color="black" />
                        <Text style={{ marginLeft: 10 }}></Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
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
