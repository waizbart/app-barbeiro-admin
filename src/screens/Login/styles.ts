import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.red,
  },

  mainText: {
    fontSize: 24,
    color: colors.white,
  },

  label: {
    width: "100%",
    color: colors.white,
    fontSize: 18,
    marginLeft: 60,
    marginVertical: 8,
  },

  input: {
    width: "85%",
    height: 60,
    margin: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 18,
    color: colors.white,
    borderColor: colors.white,
    borderRadius: 8,
  },
});
