import {
  doc,
  collection,
  getDocs,
  getDocFromCache,
  getDoc,
} from "firebase/firestore";
import { DB } from "./firebase";

const getAllMajors = async (): Promise<string[] | null> => {
  const collectionRef = collection(DB, "courses");
  try {
    const snap = await getDocs(collectionRef);

    const ids: string[] = [];

    snap.forEach((c) => ids.push(c.id));

    return ids;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("An Error Occured");
  }
};

const getAllSemesters = async (major: string): Promise<number[] | null> => {
  const docRef = doc(DB, "courses", major);
  try {
    const snap = await getDoc(docRef);

    if (!snap.exists()) throw new Error("Nothing Found");
    const result = snap.data().semesters;

    return result as number[];
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("An Error Occured");
  }
};

const getAllCourses = async (
  major: string,
  sem: number
): Promise<CourseType[] | null> => {
  const docRef = collection(DB, `/courses/${major}/${sem}`);

  try {
    const snap = await getDocs(docRef);

    const result = snap.docs.map((c) => {
      const sections = c.get("sections");

      const obj = {
        course: c.id,
        sections: sections || [],
      };
      return obj as CourseType;
    });

    return result as CourseType[];
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("An Error Occured");
  }
};

const getUserData = async (uid: string): Promise<null | userdata> => {
  try {
    const docRef = doc(DB, "users", uid);

    console.log("used server")

    const snap = await getDoc(docRef);
    

    return snap.data() as userdata;
  } catch (err) {
    if (err instanceof Error) throw err;
    else throw new Error("An Error Occured");
  }
};

export { getAllMajors, getUserData, getAllSemesters, getAllCourses };
