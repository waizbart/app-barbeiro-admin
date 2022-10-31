import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { styles } from "./styles";

const ForgotPassword = () => {
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <Button onPress={goBack}>Voltar</Button>
    </View>
  );
};

export default ForgotPassword;
