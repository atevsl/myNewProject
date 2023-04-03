import { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";

import { useDispatch } from "react-redux";

import { authSignUpUser } from "../../redux/auth/authOperation";

const initialState = {
  displayName: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isloginFocus, setIsloginFocus] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPasswordFocus, setPasswordFocus] = useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setIsShowKeyboard(false);
          setPasswordFocus(false);
          setIsEmailFocus(false);
          setIsloginFocus(false);
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
              setPasswordFocus(false);
              setIsEmailFocus(false);
              setIsloginFocus(false);
            }}
          >
            <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
              <View style={styles.form}>
                <View style={styles.avatar}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.avatarBtn}
                  >
                    <Text style={styles.avatarBtnTitle}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.registration}>Регистрация</Text>
                <TextInput
                  placeholder="Логин"
                  textAlign="center"
                  value={state.displayName}
                  style={{
                    ...styles.input,
                    borderColor: isloginFocus ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isloginFocus ? "#fff" : "#F6F6F6",
                  }}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsloginFocus(true);
                    setPasswordFocus(false);
                    setIsEmailFocus(false);
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      displayName: value,
                    }))
                  }
                />
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
                    setIsloginFocus(false);
                    setPasswordFocus(false);
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
                    setPasswordFocus(true);
                    setIsEmailFocus(false);
                    setIsloginFocus(false);
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  secureTextEntry={true}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btnRegistration}
                  onPress={() => {
                    setIsShowKeyboard(false);
                    setPasswordFocus(false);
                    setIsEmailFocus(false);
                    setIsloginFocus(false);
                    Keyboard.dismiss();
                    dispatch(authSignUpUser(state));
                    setState(initialState);
                  }}
                >
                  <Text style={styles.btnRegistrationTitle}>
                    Зарегистрироваться
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("LoginScreen");
                  }}
                >
                  <Text
                    style={styles.login}
                    style={{
                      ...styles.login,
                      marginBottom: isShowKeyboard ? 10 : 42,
                    }}
                  >
                    Уже есть аккаунт? Войти
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
    height: 550,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 16,
  },
  avatar: {
    width: 132,
    height: 120,
    marginTop: -60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginLeft: 128,
    marginBottom: 32,
  },
  avatarBtn: {
    width: 25,
    height: 25,
    marginTop: 81,
    marginLeft: 119.5,
    borderColor: "#FF6C00",
    borderWidth: 1,
    borderRadius: 15,
  },
  avatarBtnTitle: {
    color: "#FF6C00",
    fontSize: 25,
    marginTop: -6,
    marginLeft: 5,
  },
  registration: {
    color: "#212121",
    fontSize: 30,
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    height: 50,
    color: "#212121",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  btnRegistration: {
    height: 50,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    borderRadius: 100,
    marginTop: 43,
  },
  btnRegistrationTitle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  login: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
});

export default RegistrationScreen;
