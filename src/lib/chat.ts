import {
  doc,
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { DB } from "lib/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getAllChats = async (uid: string): Promise<string[] | null> => {
  const collectionRef = collection(DB, "chat");
  try {
    let ids = await AsyncStorage.getItem("chatroom-ids");

    ids = ids != null ? JSON.parse(ids) : null;

    if (!ids) {
      const id_s: string[] = [];
      const snap = await getDocs(
        query(collectionRef, where("enrolled", "array-contains", uid))
      );

      snap.docs.forEach((c) => id_s.push(c.id));

      await AsyncStorage.setItem("chatroom-ids", JSON.stringify(id_s));
      console.log("server")
      return id_s as string[];
    }

    console.log("cache chat")

    if (Array.isArray(ids)) return ids as string[];

    return null;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("An Error Occured");
  }
};

const sendMsg = async (
  section: string,
  text: string,
  uid: string,
  from: string
) => {
  //const docRef = doc(DB, "chat", `${section}/messages`);
  const collectionRef = collection(DB, `/chat/${section}/messages`);

  try {
    const time = serverTimestamp();
    const uniqueId = Date.now().toString();
    await addDoc(collectionRef, {
      text: text,
      from: from,
      time: time,
      uid: uid,
    });
    /*
    const time = serverTimestamp();
    const uniqueId = Date.now().toString();
    await setDoc(
      docRef,
      {
        [uniqueId]: {
          text: text,
          from: from,
          time: time,
          uid: uid
        },
      },
      { merge: true }
    );*/
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("An Error Occured");
  }
};
/*
const getMsgs = async (section: string): Promise<MessageType[] | null> => {
  const docRef = doc(DB, "chat", section);
  try {
    const snap = await getDoc(docRef);

    if (!snap.exists()) throw new Error("No chat exists");
    const result = snap.data();

    const arr = Object.entries(result);

    return arr as MessageType[];

    //return result as MessageType[]
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("An Error Occured");
  }
};
*/
export { getAllChats, sendMsg };
