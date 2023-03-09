import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/defPost.jpg")}
        resizeMode="cover"
        style={styles.postPhoto}
      />
      <Text style={styles.textLoad}>Загрузите фото</Text>
      <TextInput style={styles.inputLoad} placeholder="Название..."></TextInput>
      <TextInput
        style={styles.inputLoad}
        placeholder="Местность..."
      ></TextInput>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btnPost}
        onPress={() => {
          Keyboard.dismiss();
        }}
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
  postPhoto: {
    width: 343,
    height: 240,
    borderRadius: 10,
    marginTop: 32,
    marginBottom: 8,
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
});

export default CreatePostsScreen;
