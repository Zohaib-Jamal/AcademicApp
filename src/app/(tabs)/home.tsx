import { View, Text, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../lib/firebase";
import { images } from "../../constants";
import CustomButton from "components/CustomButton";

const home = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    setIsLoading(true);

    try {
      
      await signOut(FIREBASE_AUTH);
    } catch (err) {
      if (err instanceof Error) Alert.alert("Error Signing Up", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="my-6 px-4 space-y-6">
        <View className="justify-between items-start flex-row mb-6">
          <View>
            <Text className="font-pmedium text-sm text-gray-100">
              Welcome Back!
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              {user?.displayName}
            </Text>
          </View>
          <View className="mt-1.5">
            <Image
              source={images.logo}
              className="w-9 h-10"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      <View>
        <CustomButton
          title="Sign out"
          handlePress={submit}
          containerStyles=""
          isLoading={isLoading}
          textStyles=""
        />
      </View>
    </SafeAreaView>
  );
};

export default home;
