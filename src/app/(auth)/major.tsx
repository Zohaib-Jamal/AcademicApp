import { View, Text, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { useUser } from "../../context/UserContext";
import { getAllMajors } from "lib/firestore";
import { setMajor } from "lib/auth";
import { useRouter } from "expo-router";

const Major = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [majors, setMajors] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUserData } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fn = async () => {
      try {
        const data = await getAllMajors();
        setMajors(data);
      } catch (err) {
        if (err instanceof Error) Alert.alert("Error", err.message);
      }
    };

    fn();
  }, []);

  const submit = async () => {
    try {
      setIsLoading(true);
      if (!selected) throw new Error("Select some field!");

      if (!user) throw new Error("Not Logged In!");
      await setMajor(selected, user.uid);

      setUserData({ ...user, major: selected });
      router.push("/semester");
    } catch (err) {
      if (err instanceof Error) Alert.alert("Error", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <View className="flex justify-center items-center">
          <Text className="text-secondary-200 text-2xl text-semibold mt-10 font-psemibold">
            Select Your Major!
          </Text>
        </View>
        {majors ? (
          <View className="flex-1 mx-5 my-5">
            <ScrollView className="mb-20">
              {majors.map((m) => (
                <TouchableOpacity
                  key={m}
                  className={` border-2 border-black-200 w-full h-16 px-4 bg-black-100 mb-3 rounded-2xl focus:border-secondary items-center flex-row ${
                    m === selected ? `bg-secondary` : ""
                  }`}
                  onPress={() => setSelected(m)}
                >
                  <Text className="flex-1 text-white  font-psemibold text-base">
                    {m}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <CustomButton
              title="Next"
              handlePress={submit}
              isLoading={isLoading}
              containerStyles="mt-7 absolute bottom-0 w-full"
            />
          </View>
        ) : (
          <View className="w-full flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#FF9C01" />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default Major;
