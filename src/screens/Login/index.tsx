import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";

import { SafeAreaView, Text, Image } from "react-native";
import { Button } from "../../components/Button";
import { TextField } from "../../components/Textfield";

import { colors } from "../../styles/colors";

import { styles } from "./styles";
import { PropsStack } from "../../types/Navigation";

const Login = () => {
  const { handleLogin, loginDataValues, errors, handleSubmit, setValue } =
    useAuth();

  const { navigate } = useNavigation<PropsStack>();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../../assets/icon.jpeg")}
        
        style={{
          maxHeight: 491,
          maxWidth:491,
        }}
      />

      <TextField
        label="E-mail"
        error={errors?.email}
        placeholder="Digite seu e-mail"
        defaultValue={loginDataValues.email}
        placeholderTextColor={colors.white}
        onChangeText={(email: string) => setValue("email", email)}
      />

      <TextField
        label="Senha"
        error={errors?.password}
        defaultValue={loginDataValues.password}
        placeholder="Digite sua senha"
        placeholderTextColor={colors.white}
        secureTextEntry
        onChangeText={(password: string) => setValue("password", password)}
      />

      <Button onPress={handleSubmit(handleLogin)}>Entrar</Button>

      <Text
        style={{
          color: colors.white,
          fontSize: 16,
          marginTop: 34,
        }}
      >
        Esqueceu sua senha?{" "}
        <Text
          onPress={() => navigate("ForgotPassword")}
          style={{
            color: colors.red,
            fontSize: 16,
          }}
        >
          Clique aqui
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default Login;
