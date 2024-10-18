import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image, ActivityIndicator } from "react-native";
import { router, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useUser } from "../context/UserContext";

export default function App() {
  const { user, userData ,isLoading, checkData } = useUser();

  if (isLoading)
    return (
      <SafeAreaView className="bg-primary h-full">
        <View className="w-full flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#FF9C01" />
        </View>
      </SafeAreaView>
    );

  

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full  items-center justify-center min-h-[85vh] px-4 ">
          <Image
            source={images.logo}
            className="w-[130px] h-[85px]"
            resizeMode="contain"
          />
          <Image
            source={images.mainImage}
            className="max-w-[380px] w-full h-[300px] "
            resizeMode="contain"
          />
          <View className="relative mt-2">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Solutions with{" "}
              <Text className="text-secondary-200">Fast Hub</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[135px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            A one stop solution to all your academic needs!
          </Text>
          <CustomButton
            title="Continue With Email"
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyles="w-full mt-7 "
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
