import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type NavigationPropsStack = {
  Login: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  Users: undefined;
};

export type PropsStack = NativeStackNavigationProp<NavigationPropsStack>;
