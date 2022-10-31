import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { View, Text } from "react-native";
import { Button } from "../../components/Button";
import { styles } from "./styles";

const Home = () => {
  const { handleLogout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Home</Text>
      <Button onPress={handleLogout}>Sair</Button>
    </View>
  );
};

export default Home;
