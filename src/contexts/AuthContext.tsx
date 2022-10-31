import React, { useState, useEffect, createContext, ReactNode } from "react";
import { HeadersDefaults } from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import LottieView from "lottie-react-native";
import Toast from "react-native-toast-message";
import { User } from "../types/User";
import { PropsStack } from "../types/Navigation";
import {
  FieldErrorsImpl,
  useForm,
  UseFormHandleSubmit,
  UseFormSetValue,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validations/loginSchema";

type LoginData = {
  email: string;
  password: string;
};

type AuthContextData = {
  signed: boolean;
  isLoading: boolean;
  user: User | null;
  loginDataValues: {
    email: string;
    password: string;
  };
  errors: FieldErrorsImpl<{ email: string; password: string }>;
  handleSubmit: UseFormHandleSubmit<LoginData>;
  setValue: UseFormSetValue<LoginData>;
  handleLogin(): Promise<void>;
  handleLogout(): void;
};

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

function AuthProvider({ children }: { children: ReactNode }) {
  const { navigate } = useNavigation<PropsStack>();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const defaultValues: LoginData = {
    email: "",
    password: "",
  };

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginData>({
    mode: "onTouched",
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  useEffect(() => {
    const loadStoragedData = async () => {
      try {
        const storagedUser = await AsyncStorage.getItem("@Auth:user");
        const storagedToken = await AsyncStorage.getItem("@Auth:token");

        await new Promise((resolve) => setTimeout(resolve, 3000));

        if (storagedUser && storagedToken) {
          api.defaults.headers = {
            Authorization: `Bearer ${storagedToken}`,
          } as CommonHeaderProperties;

          setUser(JSON.parse(storagedUser));
        }

        setIsLoading(false);
      } catch (e) {
        console.log(e);

        setIsLoading(false);
      }
    };

    loadStoragedData();
  }, []);

  const loginDataValues = watch();

  const handleLogin = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await api.post("/auth/login", {
        email: loginDataValues.email,
        password: loginDataValues.password,
      });

      if (response.data.user === null)
        throw new Error("Usuário não encontrado!");

      if (response.status === 200 && response.data.user !== null) {
        setIsLoading(false);
        setUser(response.data.user);

        api.defaults.headers = {
          Authorization: `Bearer ${response.data.token}`,
        } as CommonHeaderProperties;

        await AsyncStorage.setItem(
          "@Auth:user",
          JSON.stringify(response.data.user)
        );

        await AsyncStorage.setItem("@Auth:token", response.data.token);

        Toast.show({
          type: "success",
          text1: "Sucesso.",
          text2: response.data.message,
          visibilityTime: 2500,
        });
      }
    } catch (e: any) {
      console.log(e);

      setIsLoading(false);

      Toast.show({
        type: "error",
        text1: "Erro.",
        text2: e.response.data.message,
        visibilityTime: 2500,
      });
    }
  };

  const handleLogout = () => {
    try {
      AsyncStorage.clear().then(() => {
        setUser(null);

        navigate("Login");

        Toast.show({
          type: "success",
          text1: "Sucesso.",
          text2: "Usuário desconectado.",
          visibilityTime: 2500,
        });
      });
    } catch (e: any) {
      console.log(e);

      Toast.show({
        type: "erro",
        text1: "Erro.",
        text2: "Erro ao fazer logout da aplicação",
        visibilityTime: 2500,
      });
    }
  };

  if (isLoading) {
    return (
      <LottieView
        source={require("../../assets/lotties/bigode.json")}
        autoPlay
        loop
        style={{ backgroundColor: "#333" }}
      />
    );
  }

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        isLoading,
        user,
        loginDataValues,
        errors,
        handleSubmit,
        setValue,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
