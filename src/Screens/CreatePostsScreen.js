import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";
import { db, storage } from "../../firebase/config";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");

  const [location, setLocation] = useState({
    latitude: 40.73061,
    longitude: -73.935242,
  });
  const [postId, setPostId] = useState(null);

  const { userId, displayName } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Camera.requestCameraPermissionsAsync();
      console.log("Camera status:", status);

      let locationStatus = await Location.requestForegroundPermissionsAsync();

      if (status === "granted" && locationStatus.status === "granted") {
        console.log("Permission granted");
      } else {
        console.log("Permission to access was denied");
      }
    })();
  }, []);

  const takePhoto = async () => {
    setPostId(Date.now().toString());
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    let locationRes = await Location.getCurrentPositionAsync({});
    setLocation(locationRes.coords);
  };

  const uploadPhotoToServer = async () => {
    if (!photo) return;
    try {
      const response = await fetch(photo);
      const blobFile = await response.blob();
      let id = Date.now();
      const reference = ref(storage, `images/${id}`);
      const result = await uploadBytesResumable(reference, blobFile);
      const processedPhoto = await getDownloadURL(result.ref);
      return processedPhoto;
    } catch (err) {
      console.log("Try again.", err.message);
    }
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    console.log("upload photo to server✅");

    const newPost = {
      photo,
      title,
      location,
      userId,
      displayName,
      postId,
      place,
    };

    try {
      const createPost = await setDoc(doc(db, "posts", `${postId}`), newPost);
      console.log("createPost", createPost);
    } catch (error) {
      console.log("createPosterror:", error);
    }
  };

  const sendPhoto = async () => {
    await uploadPostToServer();

    setTitle("");
    setPlace("");

    navigation.navigate("Default");
  };

  return (
    <View style={styles.container}>
      <Camera ref={setCamera} style={styles.camera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image source={photo} style={{ height: 70, width: 100 }} />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto}>
          <AntDesign name="camera" size={24} color="white" />
        </TouchableOpacity>
      </Camera>

      <Text style={styles.textLoad}>Загрузите фото</Text>
      <TextInput
        style={styles.inputLoad}
        placeholder="Название..."
        value={title}
        onChangeText={(value) => {
          setTitle(value);
        }}
      />
      <TextInput
        style={styles.inputLoad}
        placeholder="Местность..."
        value={place}
        onChangeText={(value) => {
          setPlace(value);
        }}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btnPost}
        onPress={sendPhoto}
      >
        <Text style={styles.post}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  textLoad: {
    marginBottom: 48,
    width: 343,
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
    justifyContent: "center",
    borderRadius: 100,
    marginTop: 10,
  },
  post: {
    alignSelf: "center",
  },
  camera: {
    width: 343,
    height: 240,
    borderRadius: 10,
    marginTop: 32,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
});

export default CreatePostsScreen;
