import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";
import { NavigationPropsStack } from "../types/Navigation";

const { Navigator, Screen } =
  createNativeStackNavigator<NavigationPropsStack>();

export default function PublicRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen key="Login" name="Login" component={Login} />
      <Screen
        key="ForgotPassword"
        name="ForgotPassword"
        component={ForgotPassword}
      />
    </Navigator>
  );
}
