import { View, Text, ScrollView, Image, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, Router, Redirect, router } from "expo-router";
import { createUser } from "../../lib/auth";
import { validateSignUp } from "../../lib/validate";

type formType = {
  username: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [form, setForm] = useState<formType>({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    setIsLoading(true);

    try {
      const errorMessage = validateSignUp(
        form.email,
        form.password,
        form.username
      );

      if (errorMessage) throw new Error(errorMessage);

      let displayName = form.username;

      displayName = displayName[0].toUpperCase() + displayName.slice(1);

      await createUser(form.email, form.password, displayName);

      router.replace("/")

      Alert.alert("Account Created", "Verify your Email and Login!");
    } catch (err) {
      if (err instanceof Error) Alert.alert("Error Signing Up", err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
            Sign up to FastHub
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />
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
            title="Sign Up"
            handlePress={submit}
            isLoading={isLoading}
            containerStyles="mt-7"
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-sm text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-sm font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
