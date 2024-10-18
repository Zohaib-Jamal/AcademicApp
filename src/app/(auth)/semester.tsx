import { View, Text, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { useUser } from "../../context/UserContext";
import { getAllSemesters } from "lib/firestore";
import { setSemester } from "lib/auth";
import { useRouter } from "expo-router";

const Semester = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [semesters, setSemesters] = useState<number[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, userData, setUserData } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fn = async () => {
      try {
        
        if (!userData ) throw new Error("User not Logged In");
        if(!userData.major) throw new Error("Major not selected!");
        const data = await getAllSemesters(userData.major);
        setSemesters(data);
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
      await setSemester(selected, user.uid);

      setUserData({ ...userData, semester: selected });
      router.push("/courses");
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
            Select Your Semester!
          </Text>
        </View>
        {semesters ? (
          <View className="flex-1 mx-5 my-5">
            <ScrollView className="mb-20">
              {semesters.map((m) => (
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
            <View className="absolute bottom-0 w-full justify-between flex-row items-center flex-1">
              <CustomButton
                title="Back"
                handlePress={() => router.replace("/major")}
                isLoading={isLoading}
                containerStyles="mt-7 w-20 mr-5"
              />
              <CustomButton
                title="Next"
                handlePress={submit}
                isLoading={isLoading}
                containerStyles="mt-7 w-20 ml-5"
              />
            </View>
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

export default Semester;
