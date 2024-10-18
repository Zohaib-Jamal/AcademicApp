import Semester from "app/(auth)/semester";
import { FIREBASE_AUTH, DB } from "./firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  arrayUnion
} from "firebase/firestore";

const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    await sendEmailVerification(user);
    if (!FIREBASE_AUTH.currentUser) throw new Error("An Error Occured!");
    await updateProfile(FIREBASE_AUTH.currentUser, {
      displayName: username,
    });
    const docRef = doc(DB, "users", user.uid);
    await setDoc(docRef, {
      major: null,
      semester: null,
      enrolled: [],
    });

    await signOut(FIREBASE_AUTH);
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
  }
};

const signIn = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    if (!user.emailVerified) {
      await signOut(FIREBASE_AUTH);
      throw new Error("Verify your email!");
    }
  } catch (err) {
    if (err instanceof Error) throw err;
    else throw new Error("An Error Occured");
  }
};

const setMajor = async (major: string, uid: string) => {
  const docRef = doc(DB, "users", uid);
  try {
    await setDoc(
      docRef,
      {
        major: major,
      },
      { merge: true }
    );
  } catch (err) {
    if (err instanceof Error) throw err;
    else throw new Error("An Error Occured");
  }
};

const setSemester = async (semester: number, uid: string) => {
  const docRef = doc(DB, "users", uid);
  try {
    await setDoc(
      docRef,
      {
        semester: semester,
      },
      { merge: true }
    );
  } catch (err) {
    if (err instanceof Error) throw err;
    else throw new Error("An Error Occured");
  }
};

const setCourse = async (
  courses: SelectedCourseType[],
  uid: string,
  semester: string,
  major: string
) => {
  try {
    courses.forEach(async (item) => {
      const docRef = doc(
        DB,
        "chat",
        `${item.course}-${semester}${item.section}-${major}`
      );
      await setDoc(
        docRef,
        {
          enrolled: arrayUnion(uid),
        },
        { merge: true }
      );
    });

    const docRef = doc(DB, "users", uid);
    await setDoc(
      docRef,
      {
        enrolled: true,
      },
      { merge: true }
    );
  } catch (err) {
    if (err instanceof Error) throw err;
    else throw new Error("An Error Occured");
  }
};

export { createUser, signIn, setMajor, setSemester, setCourse };
