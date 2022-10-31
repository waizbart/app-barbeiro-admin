import React from "react";
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/contexts/AuthContext";
import Toast from "react-native-toast-message";
import Routes from "./src/routes";
import { colors } from "./src/styles/colors";

export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.red,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, width: "100%", backgroundColor: colors.gray }}
        >
          <NavigationContainer>
            <StatusBar translucent />
            <AuthProvider>
              <Routes />
            </AuthProvider>
            <Toast />
          </NavigationContainer>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
