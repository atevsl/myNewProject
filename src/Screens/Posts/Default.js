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
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useDispatch, useSelector } from "react-redux";

const Default = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const { userId, displayName, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);

  const getAllPost = async () => {
    setPosts([]);
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

  useEffect(() => {
    getAllPost();
    getAvatar();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <View style={{ flexDirection: "row" }}>
          {!avatar && (
            <Image
              style={styles.userPhoto}
              source={require("../../../assets/noUser.jpg")}
            />
          )}
          {avatar && (
            <Image source={{ uri: avatar }} style={styles.userPhoto} />
          )}
          <View style={styles.userDeckription}>
            <Text style={styles.userEmail}>{displayName}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btnLogOut}
          onPress={() => {
            dispatch(authSignOutUser());
          }}
        >
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {posts && (
        <FlatList
          data={posts}
          keyExtractor={(item, indx) => indx}
          renderItem={({ item }) => (
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: item.photo }}
                style={{
                  height: 240,
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
                    navigation.navigate("CommentsScreen", {
                      postId: item.postId,
                      href: item.photo,
                    });
                  }}
                >
                  <FontAwesome name="comments-o" size={24} color="black" />
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
                  style={styles.photoDescription}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate("MapScreen", {
                      location: item.location,
                      phototitle: item.title,
                    });
                  }}
                >
                  <FontAwesome name="map-marker" size={24} color="black" />
                  <Text style={{ color: "black", marginLeft: 5 }}>
                    {item.place ? item.place : "map"}
                  </Text>
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
    display: "flex",
    flexDirection: "row",
    padding: 20,

    justifyContent: "space-between",
  },
  btnLogOut: {
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
    height: 300,
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
