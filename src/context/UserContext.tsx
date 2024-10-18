import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FIREBASE_AUTH } from "../lib/firebase";
import { User } from "firebase/auth";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { getUserData } from "../lib/firestore";
import { BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserContextType = {
  user: User | null;
  userData: userdata | null;
  isLoading: boolean;
  checkData: Function;
  setUserData: Function;
};

const defaultUserContext: UserContextType = {
  user: null,
  userData: null,
  isLoading: true,
  checkData: () => false,
  setUserData: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<userdata | null>(null);
  const router = useRouter();

  const checkData = (u: User, data: userdata) => {
    if (u) {
      if (!data.major) {
        router.replace("/major");
        return;
      }
      if (!data.semester) {
        router.replace("/semester");
        return;
      }
      if (!data.enrolled) {
        router.replace("/courses");
        return;
      }

      router.replace("/home");
      return;
    }
    router.replace("/");
    return;
  };

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(
        FIREBASE_AUTH,
        async (u) => {
          setIsLoading(true);
          if (u) {
            setUser(u);

            let data = null;

            data = await AsyncStorage.getItem("userData");

            data = data != null ? JSON.parse(data) : null;

            if (!data) data = await getUserData(u.uid);

            if (!data) throw new Error("An error occured");

            setUserData(data);

            if (data.enrolled && data.major && data.semester) {
              await AsyncStorage.setItem("userData", JSON.stringify(data));
            }

            checkData(u, data);
          }
          setIsLoading(false);
        },
        (error) => {
          Alert.alert("Error", error.message);
        }
      );

      return () => {
        unsubscribe();
      };
    } catch (err) {
      if (err instanceof Error) Alert.alert("Error", err.message);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, userData, isLoading, checkData, setUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
