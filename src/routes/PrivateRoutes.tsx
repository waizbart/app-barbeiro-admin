import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Users from "../screens/Users";
import { NavigationPropsStack } from "../types/Navigation";
import { useAuth } from "../hooks/useAuth";

const { Navigator, Screen } =
  createNativeStackNavigator<NavigationPropsStack>();

export default function PrivateRoutes() {
  const { user } = useAuth();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {user?.role === "Admin" ? (
        <Screen key="Users" name="Users" component={Users} />
      ) : (
        <Screen key="Home" name="Home" component={Home} />
      )}
    </Navigator>
  );
}
