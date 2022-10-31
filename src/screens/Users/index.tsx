import React from "react";
import { View, Text } from "react-native";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { styles } from "./styles";

const Users = () => {
  const { user, handleLogout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Usuários</Text>
      <Text style={styles.mainText}>Olá, {user?.name}!</Text>
      <Button onPress={handleLogout}>Sair</Button>
    </View>
  );
};

export default Users;
