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
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { FlatList } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = ({ navigation, route }) => {
  const [avatar, setAvatar] = useState(null);
  const [posts, setPosts] = useState([]);

  const { userId, displayName } = useSelector((state) => state.auth);

  const getAllPost = async () => {
    const colRef = collection(db, "posts");
    const q = query(colRef, where("userId", "==", `${userId}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPosts((prevState) => [...prevState, doc.data()]);
    });
  };

  const getAvatar = async () => {
    const avatarRef = collection(db, "posts");
    const q = query(avatarRef, where("avatarId", "==", `${userId}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      {
        doc.data().avatar && setAvatar(doc.data().avatar);
      }
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const response = await fetch(result.assets[0].uri);
    const blobFile = await response.blob();
    let id = Date.now();
    const reference = ref(storage, `avatar/${id}`);
    const ubr = await uploadBytesResumable(reference, blobFile);
    const processedPhoto = await getDownloadURL(ubr.ref);

    const postRef = await setDoc(doc(db, "posts", `${userId}`), {
      avatar: processedPhoto,
      avatarId: userId,
    });

    if (!result.canceled) {
      console.log("avatar in pickImage", avatar);
    }
  };

  useEffect(() => {
    getAllPost();
    getAvatar();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/PhotoBG.jpg")}
        resizeMode="cover"
        style={styles.imageBG}
      >
        <View style={styles.form}>
          <View style={styles.avatarWrap}>
            {!avatar && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.avatarBtn}
                onPress={pickImage}
              >
                <AntDesign
                  style={styles.avatarBtnTitle}
                  name="pluscircleo"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            )}

            {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
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
                      <TouchableOpacity
                        style={styles.postDescWrap}
                        activeOpacity={0.8}
                        onPress={() => {
                          navigation.navigate("CommentsScreen", {
                            postId: item.postId,
                            href: item.photo,
                          });
                        }}
                      >
                        <AntDesign name="message1" size={24} color="black" />
                        <Text
                          style={{
                            fontSize: 16,
                            color: "black",
                            padding: 5,
                            marginLeft: 5,
                          }}
                        >
                          {item.comments ? item.comments.length : ""}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.postDescWrap}
                        activeOpacity={0.8}
                        onPress={async () => {
                          const postRef = doc(db, "posts", `${item.postId}`);
                          await updateDoc(postRef, { likes: item.likes + 1 });
                        }}
                      >
                        <AntDesign name="like2" size={24} color="black" />
                        {item.likes && (
                          <Text style={{ marginLeft: 10 }}>{item.likes}</Text>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.postDescWrap}
                        activeOpacity={0.8}
                        onPress={() => {
                          navigation.navigate("MapScreen", {
                            location: item.location,
                            phototitle: item.title,
                          });
                        }}
                      >
                        <AntDesign name="enviromento" size={24} color="black" />
                        <Text style={{ color: "black", marginLeft: 5 }}>
                          {item.place ? item.place : "map"}
                        </Text>
                      </TouchableOpacity>
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
  avatarWrap: {
    width: 132,
    height: 120,
    marginTop: -60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginBottom: 32,
  },
  avatar: {
    width: 132,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
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
