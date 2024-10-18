import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Camera from "../../assets/svgs/Camera";
import { useRouter } from "expo-router";
import { Link } from "expo-router";

const MsgDropDown = () => {
  const router = useRouter();

  return (
    <View className="bg-black-100 border-2 border-black-200  rounded-2xl absolute z-10 p-4 bottom-20 w-auto right-0 flex-row">
 
      <TouchableOpacity onPress={() => router.push("/chats/(more)/camera")} className="mx-1">
        <View className="w-10 h-10 border-2 border-black-200 rounded-full bg-secondary p-1">
          <Camera />
        </View>
      </TouchableOpacity>
 
      <TouchableOpacity className="mx-1">
        <View className="w-10 h-10 border-2 border-black-200 rounded-full bg-secondary p-1">
          <Camera />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MsgDropDown;
