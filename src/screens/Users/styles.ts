import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray,
    flex: 1,
  },

  mainText: {
    fontSize: 24,
    color: colors.white,
  },
});
