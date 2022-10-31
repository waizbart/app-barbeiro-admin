import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  mainText: {
    fontSize: 24,
    color: colors.white,
  },

  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow,
    width: "85%",
    height: 60,
    borderRadius: 8,
    marginTop: 14,
  },
});
