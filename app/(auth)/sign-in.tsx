import { View, Text, ScrollView, Image, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, Redirect } from "expo-router";
import { sendSignInLinkToEmail } from "firebase/auth";

import { FIREBASE_AUTH } from "../../lib/firebase";
import * as Linking from "expo-linking"

const prefix = Linking.createURL("/")

console.log(prefix,"home");

const actionCodeSettings = {
  url: `${prefix}home`,
  iOS: {
    bundleId: "com.example.ios",
  },
  android: {
    packageName: "com.example.android",
    installApp: true,
    minimumVersion: "12",
  },
  handleCodeInApp: true,
};

const SignIn = () => {
  const [email, setEmail] = useState("");

  const submit = () => {
    sendSignInLinkToEmail(FIREBASE_AUTH, email, actionCodeSettings)
      .then(() => {
        Alert.alert("Logged in");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const isLoading = false;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign Up/In to Academic App
          </Text>

          <FormField
            title="Email"
            value={email}
            handleChangeText={(e) => setEmail(e)}
            //otherStyles="mt-7"
            keyboardType="email-address"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            isLoading={isLoading}
            containerStyles="mt-7"
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-sm text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              href="/sign-up"
              className="text-sm font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
