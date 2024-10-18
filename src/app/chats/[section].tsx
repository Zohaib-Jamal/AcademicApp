import { View, Text, FlatList, Alert, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import MessageInput from "components/MessageInput";
import { sendMsg } from "lib/chat";
import { useUser } from "context/UserContext";
import Message from "components/Message";
import { onSnapshot, doc, collection, Timestamp } from "firebase/firestore";
import { DB } from "lib/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MsgDropDown from "components/MsgDropDown";

const isMessageType = (msg: any): msg is MessageType => {
  if (
    msg.time &&
    msg.time.seconds !== undefined &&
    msg.time.nanoseconds !== undefined
  ) {
    msg.time = new Timestamp(msg.time.seconds, msg.time.nanoseconds);
  }

  return true;
};

const Section = () => {
  const params = useLocalSearchParams<{ section: string }>();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const section = params.section;
  const [allDates, setAllDates] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[] | null>(null);

  const [more, setMore] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        let msgs = await AsyncStorage.getItem(`${section}-chat`);
        let parsedMsgs = msgs != null ? JSON.parse(msgs) : null;

        //console.log("parsedMsgs", !Array.isArray(parsedMsgs))

        if (!parsedMsgs || !Array.isArray(parsedMsgs)) return;

        const validMessages = parsedMsgs.filter(isMessageType);

        console.log(validMessages);

        if (validMessages.length === 0) return;

        const uniqueTimes: string[] = [];
        const timeSet = new Set<number>();

        validMessages.forEach((message) => {
          const time = message.time.toDate().getDate();
          if (time && !timeSet.has(time)) {
            timeSet.add(time);
            uniqueTimes.push(message.id);
          }
        });

        setAllDates(uniqueTimes);

        validMessages.sort((a, b) => {
          const timeA = a.time?.toMillis() || 0;
          const timeB = b.time?.toMillis() || 0;
          return timeB - timeA;
        });

        console.log("msgs cache");
        setMessages(validMessages);
      } catch (err) {
        if (err instanceof Error) console.log(err.message);
      }
    };

    init();
  }, []);

  useEffect(() => {
    try {
      const collectionRef = collection(DB, `/chat/${section}/messages`);
      const unsubscribe = onSnapshot(
        collectionRef,
        { includeMetadataChanges: true },
        async (snap) => {
          if (!snap.metadata.hasPendingWrites) {
            const result = snap.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })) as MessageType[];

            const uniqueTimes: string[] = [];
            const timeSet = new Set<number>();

            console.log("server");

            result.forEach((message) => {
              const time = message.time?.toDate().getDate();
              if (time && !timeSet.has(time)) {
                timeSet.add(time);
                uniqueTimes.push(message.id);
              }
            });

            AsyncStorage.setItem(`${section}-chat`, JSON.stringify(result));

            setAllDates(uniqueTimes);

            result.sort((a, b) => {
              const timeA = a.time?.toMillis() || 0;
              const timeB = b.time?.toMillis() || 0;
              return timeB - timeA;
            });

            setMessages(result);
          } else {
          }
        },
        (error) => {
          Alert.alert("Error", error.message);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      if (err instanceof Error) Alert.alert("Error", err.message);
    }
  }, []);

  const send = async () => {
    try {
      setIsLoading(true);
      if (!user) throw new Error("User not logged in!");
      if (!user.displayName) throw new Error("User not logged in!");
      if (text !== "") {
        const msg = text;
        setText("");
        await sendMsg(section, msg, user.uid, user.displayName);
      }
    } catch (err) {
      setText("");
      if (err instanceof Error) Alert.alert("Error", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex justify-center mt-2 items-center">
        <Text className="text-secondary-200 text-2xl text-semibold font-psemibold text-center">
          {section.split("-")[0]}
        </Text>
      </View>
      <View className="flex-1 mx-5 my-5">
        <FlatList
          data={messages}
          renderItem={({ item }) => {
            return (
              <View>
                {allDates.includes(item.id) ? (
                  <Text className="text-gray-100 text-center mb-2 text-xs">
                    {item.time.toDate().toDateString()}
                  </Text>
                ) : (
                  <></>
                )}
                <Message
                  message={item.text}
                  from={item.from}
                  time={item?.time ? item.time?.toDate() : new Date()}
                  self={user ? item.uid === user.uid : false}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          inverted
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <View className="z-10">
              <MessageInput
                value={text}
                handleChangeText={(e) => setText(e)}
                containerStyles="mt-7 "
                onSend={send}
                isLoading={isLoading}
                showMore={()=>setMore((prev) => !prev)}
              />
            </View>
          }
          ListEmptyComponent={
            isLoading ? (
              <ActivityIndicator size="large" color="#FF9C01" />
            ) : (
              <View className="justify-center items-center">
                <Text className="text-gray-100 font-pregular text-xs  mb-2">
                  No chats!
                </Text>
              </View>
            )
          }
        />
        {more ? <MsgDropDown /> : <></>}
      </View>
    </SafeAreaView>
  );
};

export default Section;
