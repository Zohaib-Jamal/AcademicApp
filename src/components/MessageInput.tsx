import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import SendSVG from "../../assets/svgs/Send";
import More from "../../assets/svgs/More";

type MessageInputProps = {
  value?: string;
  placeholder?: string;
  handleChangeText?: (text: string) => void;
  otherStyles?: string;
  onSend: () => void;
  isLoading: boolean;
  [key: string]: any;
};



const MessageInput: React.FC<MessageInputProps> = ({
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  isLoading,
  onSend,
  showMore,
  ...props
}) => {
  
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className=" border-2 border-black-200 w-full h-16 px-4 bg-black-100   rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white  font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
        />

        <TouchableOpacity disabled={isLoading} onPress={() => showMore()}>
          <View className="w-9 h-9 m-2">
            <More  />
          </View>
        </TouchableOpacity>
        <TouchableOpacity disabled={isLoading} onPress={() => onSend()}>
          <View className="w-6 h-6">
            <SendSVG isLoading={isLoading} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageInput;
