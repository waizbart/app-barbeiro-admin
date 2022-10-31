import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    width: "85%",
    borderRadius: 10,
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    color: colors.white,
    marginBottom: 4,
  },

  input: {
    height: 60,
    marginVertical: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 18,
    color: colors.white,
    borderColor: colors.white,
    borderRadius: 8,
  },

  borderError: {
    borderWidth: 1,
    borderColor: "#ff0035",
  },

  errorMessage: {
    fontSize: 12,
    color: "#ff0035",
    textAlign: "left",
  },
});
