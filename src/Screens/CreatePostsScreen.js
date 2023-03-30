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
import app, { auth, db, storage } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log("Camera status:", status);

      let locationStatus = await Location.requestForegroundPermissionsAsync();
      // console.log("Location", Location);
      // console.log("locationStatus", locationStatus);

      if (status === "granted" && locationStatus.status === "granted") {
        console.log("Permission granted");
      } else {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log("location", location);
      // console.log("location.coords", location.coords);
      // console.log("latitude", location.coords.latitude);
      // console.log("longitude", location.coords.longitude);
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    console.log("photo.uri in takephoto func: ", photo.uri);
    setPhoto(photo.uri);
    const location = await Location.getCurrentPositionAsync();
    console.log("latitude", location.coords.latitude);
    console.log("longitude", location.coords.longitude);
  };

  const uploadPhotoToServer = async () => {
    if (!photo) return;
    try {
      const response = await fetch(photo);
      const blobFile = await response.blob();
      let id = Date.now();
      if (title !== "") {
        id = title;
      }
      const reference = ref(storage, `images/${id}`);
      const result = await uploadBytesResumable(reference, blobFile);
      const processedPhoto = await getDownloadURL(result.ref);
      console.log("processedPhoto: ", processedPhoto);
    } catch (err) {
      console.log("Try again.", err.message);
    }
  };

  const sendPhoto = async () => {
    console.log("start upload photoToSErver");
    await uploadPhotoToServer();

    console.log("redirect");
    navigation.navigate("Default", { post: { photo, title } });
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
        onChangeText={(value) => setTitle(value)}
      />
      <TextInput style={styles.inputLoad} placeholder="Местность..." />
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
