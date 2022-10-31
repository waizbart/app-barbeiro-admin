import React from "react";
import { useAuth } from "../hooks/useAuth";

import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

import SelectDate from "../screens/SelectDate";

export default function Routes() {
  const { signed } = useAuth();

  //return signed ? <PrivateRoutes /> : <PublicRoutes />;

  return <SelectDate />;
}
