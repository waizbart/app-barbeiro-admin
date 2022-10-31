import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

export const TextField = ({ error, label, ...inputProps }: any) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, !!error && styles.borderError]}
      {...inputProps}
    />
    {!!error && <Text style={styles.errorMessage}>{error.message}</Text>}
  </View>
);
