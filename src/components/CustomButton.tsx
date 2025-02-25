import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  isLoading,
  textStyles,
}: {
  title: string;
  handlePress: (event: GestureResponderEvent) => void;
  containerStyles: string;
  isLoading: boolean;
  textStyles?: string;
}) => {
  return (
    <TouchableOpacity
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      {!isLoading ? (
        <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
          {title}
        </Text>
      ) : (
        <ActivityIndicator size="large" color="#161622" />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
