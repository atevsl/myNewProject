import { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};
const LoginScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [state, setState] = useState(initialState);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setIsShowKeyboard(false);
          setIsEmailFocus(false);
          setIsPasswordFocus(false);
        }}
      >
        <ImageBackground
          source={require("../../assets/PhotoBG.jpg")}
          resizeMode="cover"
          style={styles.imageBG}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
              setIsShowKeyboard(false);
              setIsEmailFocus(false);
              setIsPasswordFocus(false);
            }}
          >
            <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
              <View style={styles.form}>
                <Text style={styles.login}>Войти</Text>
                <TextInput
                  placeholder="Адрес электронной почты"
                  textAlign="center"
                  value={state.email}
                  style={{
                    ...styles.input,
                    borderColor: isEmailFocus ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isEmailFocus ? "#fff" : "#F6F6F6",
                  }}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsEmailFocus(true);
                    setIsPasswordFocus(false);
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
                <TextInput
                  placeholder="Пароль"
                  textAlign="center"
                  value={state.password}
                  style={{
                    ...styles.input,
                    borderColor: isPasswordFocus ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isPasswordFocus ? "#fff" : "#F6F6F6",
                  }}
                  secureTextEntry={true}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsEmailFocus(false);
                    setIsPasswordFocus(true);
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btnLogin}
                  onPress={() => {
                    setIsShowKeyboard(false);
                    Keyboard.dismiss();
                    setIsEmailFocus(false);
                    setIsPasswordFocus(false);
                    console.log("Login State:", state);
                    navigation.navigate("Home", { state });
                    // setState(initialState);
                  }}
                >
                  <Text style={styles.btnLoginTitle}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("RegistrationScreen");
                  }}
                >
                  <Text
                    style={{
                      ...styles.registerLink,
                      marginBottom: isShowKeyboard ? 32 : 144,
                    }}
                  >
                    Нет аккаунта? Зарегистрироваться
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </TouchableWithoutFeedback>
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
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 16,
  },
  login: {
    color: "#212121",
    fontSize: 30,
    marginTop: 16,
    marginBottom: 32,
    textAlign: "center",
    fontFamily: "Caveat-VariableFont_wght",
  },
  input: {
    height: 50,
    color: "#212121",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  btnLogin: {
    height: 50,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    borderRadius: 100,
    marginTop: 27,
  },
  btnLoginTitle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  registerLink: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
});

export default LoginScreen;
