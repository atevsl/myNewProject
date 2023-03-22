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

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    console.log("photo.uri in takephoto func: ", photo.uri);
    // setPhoto(photo.uri);
    setPhoto(photo.uri);
  };

  const sendPhoto = () => {
    console.log("navigation in sendphoto", navigation);
    console.log("photo in sendphoto", photo);

    navigation.navigate("PostsScreen", { photo });
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
      <TextInput style={styles.inputLoad} placeholder="Название..."></TextInput>
      <TextInput
        style={styles.inputLoad}
        placeholder="Местность..."
      ></TextInput>
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
