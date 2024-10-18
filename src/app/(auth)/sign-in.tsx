import { View, Text, ScrollView, Image, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, Redirect } from "expo-router";
import { signIn } from "../../lib/auth";
import { useUser } from "../../context/UserContext";
import { validateSignIn } from "lib/validate";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false)

  const { user } = useUser();

  const submit = async () => {
    setIsLoading(true)
    const errorMessage = validateSignIn(form.email, form.password);
    try {
      if (errorMessage) throw new Error(errorMessage);
      await signIn(form.email, form.password).catch((err) => {
        if (err.code === "auth/invalid-credential")
          throw new Error("Incorrect Credentials!");
      });

    } catch (err) {
      setIsLoading(false)
      if (err instanceof Error) {
        Alert.alert("Error Sign In", err.message);
      }
    } 
  };

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className="w-full min-h-[85vh] justify-center px-4 my-6">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[115px] h-[35px]"
            />
            <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
              Log in to FastHub
            </Text>
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
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
    </>
  );
};

export default SignIn;
