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
} from "react-native";
import { db } from "../../../firebase/config";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { displayName } = useSelector((state) => state.auth);
  const postId = route.params.postId;
  const href = route.params.href;

  console.log("postId:", postId);
  console.log("displayName:", displayName);

  // useEffect(() => {
  //   (async () => {
  //     const colRef = collection(db, "posts");
  //     const q = query(colRef, where("userId", "==", `${userId}`));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       setPosts((prevState) => [...prevState, doc.data()]);
  //       console.log("posts", posts);
  //     });
  //   })();
  // }, []);

  const getAllComments = async () => {
    const colRef = collection(db, "posts");
    console.log("colRef", colRef);

    const q = query(colRef, where("postId", "==", `${postId}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      {
        doc.data().comments && setAllComments(doc.data().comments);
      }
      console.log("allComments", allComments);
      console.log("doc:", doc.data().comments);
    });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  // const createPost = async () => {
  //   db.firestore()
  //     .collection("posts")
  //     .doc(postId)
  //     .collection("comments")
  //     .add({ comment, nickName });
  // };

  // // Get a reference to the "users" collection
  // const usersRef = firestore.collection("users");

  // // Add a new subcollection called "posts" for a specific user
  // const userDocRef = usersRef.doc("user123");
  // const postsCollectionRef = userDocRef.collection("posts");
  const createPost = async () => {
    console.log("load comment to postId:", postId);
    const postRef = doc(db, "posts", `${postId}`);
    console.log("postRef", postRef);
    console.log("comment", comment);

    setAllComments(
      (prevState) => {
        console.log("prevState", prevState);
      }
      // [...prevState, comment]
    );
    await updateDoc(postRef, { comments: [...allComments, comment] });
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
                <Text>{item}</Text>
                {/* <Text>{item.comments}</Text> */}
              </View>
            )}
            keyExtractor={(item, indx) => indx}
          />
        )}
      </SafeAreaView>
      <TextInput
        style={styles.inputLoad}
        placeholder="..."
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
        <Text style={styles.post}>Добавить комментарий</Text>
      </TouchableOpacity>
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
    width: 343,
    marginBottom: 32,
  },
  btnPost: {
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 5,
    marginBottom: 20,
  },
  comment: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  photo: {
    height: 300,
    width: 360,
  },
});

export default CommentsScreen;
