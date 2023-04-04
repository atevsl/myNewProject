import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  Image,
  Keyboard,
} from "react-native";
import { db } from "../../../firebase/config";
import { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const postId = route.params.postId;
  const href = route.params.href;

  const getAllComments = async () => {
    const colRef = collection(db, "posts");
    const q = query(colRef, where("postId", "==", `${postId}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      {
        doc.data().comments && setAllComments(doc.data().comments);
      }
    });
  };

  useEffect(() => {
    getAllComments();
  }, []);
  useEffect(() => {
    getAllComments();
  }, [refresh]);

  const createPost = async () => {
    const postRef = doc(db, "posts", `${postId}`);
    await updateDoc(postRef, { comments: [...allComments, comment] });
    Keyboard.dismiss();
    setComment("");
    setRefresh((prevstate) => !prevstate);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.photo} source={{ uri: href }} />
      <SafeAreaView style={styles.container}>
        {allComments && (
          <FlatList
            data={allComments}
            renderItem={({ item }) => (
              <View style={styles.comment}>
                <FontAwesome name="commenting-o" size={24} color="black" />
                <Text>{item}</Text>
              </View>
            )}
            keyExtractor={(item, indx) => indx}
          />
        )}
      </SafeAreaView>
      <View style={styles.commentWrap}>
        <TextInput
          style={styles.inputLoad}
          placeholder="коментировать..."
          value={comment}
          onChangeText={(value) => {
            setComment(value);
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btnPost}
          onPress={createPost}
        >
          <FontAwesome name="cloud-upload" size={24} color="orange" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  inputLoad: {
    borderBottomWidth: 1,
    height: 40,
    width: 300,
  },
  btnPost: {
    width: 50,
    height: 50,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
  },
  commentWrap: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },

  comment: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 350,
  },
  photo: {
    height: 300,
    width: 360,
  },
});

export default CommentsScreen;
