import React, { useState } from "react";
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

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");

  const takePhoto = async () => {
    // let { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== "granted") {
    // setErrorMsg("Permission to access location was denied");
    // console.log("Permission to access location was denied");

    // return;
    // }

    const photo = await camera.takePictureAsync();
    // const location = await Location.getCurrentPositionAsync();
    // console.log("latitude", location.coords.latitude);
    // console.log("longitude", location.coords.longitude);
    console.log("photo.uri in takephoto func: ", photo.uri);
    setPhoto(photo.uri);
  };

  const sendPhoto = () => {
    console.log("navigation in sendphoto", navigation);
    console.log("photo in sendphoto", photo);

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
      {/* <Image
        source={require("../../assets/defPost.jpg")}
        resizeMode="cover"
        style={styles.postPhoto}
      /> */}
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
  // postPhoto: {
  //   width: 343,
  //   height: 240,
  //   borderRadius: 10,
  //   marginTop: 32,
  //   marginBottom: 8,
  // },
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
