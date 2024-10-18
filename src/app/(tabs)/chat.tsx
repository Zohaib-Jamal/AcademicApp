import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../context/UserContext";
import { getAllChats } from "lib/chat";
import { useRouter } from "expo-router";

const Chat = () => {
  const [chatsArr, setChatsArr] = useState<string[] | null>(null);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fn = async () => {
      try {
        if (!user) throw new Error("User not logged in");
        const data = await getAllChats(user.uid);
        setChatsArr(data);
      } catch (err) {
        if (err instanceof Error) Alert.alert("Error", err.message);
      }
    };

    fn();
  }, []);

  const submit = async (item: string) => {
    try {
      if (!user) throw new Error("Not Logged In!");

      router.push(`/chats/${item}`);
    } catch (err) {
      if (err instanceof Error) Alert.alert("Error", err.message);
    } finally {
    }
  };

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <View className="flex justify-center items-center">
          <Text className="text-secondary-200 text-2xl text-semibold mt-10 font-psemibold">
            Start Chatting!
          </Text>
        </View>

        <View className="flex-1 mx-5 my-5">
          <FlatList
            data={chatsArr}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={` border-2 border-black-200 w-full h-16 px-4 bg-black-100 mb-3 rounded-2xl focus:border-secondary items-center flex-row`}
                onPress={() => {
                  submit(item);
                }}
              >
                <Text
                  className="flex-1 text-white  font-psemibold text-base"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.split("-")[0]}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            ListEmptyComponent={
              <ActivityIndicator size="large" color="#FF9C01" />
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Chat;
