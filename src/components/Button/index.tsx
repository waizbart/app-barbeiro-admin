import { TouchableOpacity, Text } from "react-native";

import { styles } from "./styles";

export const Button = ({ children, ...rest }: any) => {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Text style={styles.mainText}>{children}</Text>
    </TouchableOpacity>
  );
};
