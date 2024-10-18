import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "components/CustomButton";
import { useUser } from "context/UserContext";
import { getAllCourses } from "lib/firestore";
import { setCourse } from "lib/auth";
import { useRouter } from "expo-router";

const SectionButton = ({
  selected,
  section,
  course,
  addOrRemoveSection,
}: {
  selected: SelectedCourseType[] | null;
  section: string;
  course: string;
  addOrRemoveSection: Function;
}) => {
  const isSelected = selected?.some(
    (sel: SelectedCourseType) =>
      sel.course === course && sel.section === section
  );
  return (
    <TouchableOpacity
      className={` border-2 border-black-200 h-16 w-16 mx-2 p-4 bg-black-100 mb-3 rounded-2xl focus:border-secondary justify-center items-center flex-row ${
        isSelected ? `bg-secondary` : ""
      }`}
      onPress={() => addOrRemoveSection(course, section)}
    >
      <Text
        className="flex text-white  font-psemibold text-base"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {section}
      </Text>
    </TouchableOpacity>
  );
};

const CourseButton = ({
  selected,
  m,
  addOrRemoveCourse,
  addOrRemoveSection,
}: {
  selected: SelectedCourseType[] | null;
  m: CourseType;
  addOrRemoveCourse: Function;
  addOrRemoveSection: Function;
}) => {
  const isSelected = selected?.some(
    (course: SelectedCourseType) => course.course === m.course
  );

  const chunkArray = (arr: string[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  return (
    <View>
      <TouchableOpacity
        className={` border-2 border-black-200 w-full h-16 px-4 bg-black-100 mb-3 rounded-2xl focus:border-secondary items-center flex-row ${
          isSelected ? `bg-secondary` : ""
        }`}
        onPress={() => addOrRemoveCourse(m.course)}
      >
        <Text
          className="flex-1 text-white  font-psemibold text-base"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {m.course}
        </Text>
      </TouchableOpacity>
      {isSelected ? (
        chunkArray(m.sections, 4).map((chunk, chunkIndex) => (
          <View
            key={chunkIndex}
            className="flex flex-row w-full  justify-center items-center"
          >
            {chunk.map((sec, key) => (
              <SectionButton
                key={key}
                selected={selected}
                section={sec}
                course={m.course}
                addOrRemoveSection={addOrRemoveSection}
              />
            ))}
          </View>
        ))
      ) : (
        <View></View>
      )}
    </View>
  );
};

const Courses = () => {
  const [selected, setSelected] = useState<SelectedCourseType[] | null>(null);
  const [courses, setCourses] = useState<CourseType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, userData, setUserData } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fn = async () => {
      try {
        if (!userData) throw new Error("User not Logged In");
        if (!userData.major) throw new Error("Major  not selected!");
        if (!userData.semester) throw new Error("Semester not selected!");

        const data = await getAllCourses(
          userData.major,
          Number(userData.semester)
        );
        if (!data) throw new Error("Courses not loaded");
        setCourses(data);
      } catch (err) {
        if (err instanceof Error) Alert.alert("Error", err.message);
      }
    };

    fn();
  }, []);

  const submit = async () => {
    try {
      setIsLoading(true);
      if (
        !selected ||
        selected.length === 0 ||
        selected.some((item) => !item.section)
      ) {
        throw new Error(
          "Please select valid fields and ensure sections are selected."
        );
      }

      if (!user || !userData?.semester || !userData?.major) {
        throw new Error("Not Logged In!");
      }

      await setCourse(selected, user.uid, userData.semester, userData.major);

      setUserData({ ...userData, enrolled: true });

      router.replace("/home");
    } catch (err) {
      if (err instanceof Error) Alert.alert("Error", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addOrRemoveCourse = (item: string) => {
    setSelected((prev) => {
      if (!prev || prev.length === 0) return [{ course: item, section: null }];

      const isSelected = prev.some((course) => course.course === item);

      if (isSelected)
        return prev.filter((i) => {
          return i.course !== item;
        });

      return [...prev, { course: item, section: null }];
    });
  };

  const addOrRemoveSection = (course: string, section: string) => {
    setSelected((prev) => {
      if (!prev || prev.length === 0)
        return [{ course: course, section: section }];

      return prev.map((item) =>
        item.course === course ? { ...item, section: section } : item
      );
    });
  };

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <View className="flex justify-center items-center">
          <Text className="text-secondary-200 text-2xl text-semibold mt-10 font-psemibold">
            Select Your Courses!
          </Text>
        </View>
        {courses ? (
          <View className="flex-1 mx-5 my-5">
            <ScrollView className="mb-20">
              {courses.map((m, key) => (
                <CourseButton
                  key={key}
                  selected={selected}
                  m={m}
                  addOrRemoveCourse={addOrRemoveCourse}
                  addOrRemoveSection={addOrRemoveSection}
                />
              ))}
            </ScrollView>
            <View className="absolute bottom-0 w-full justify-between flex-row items-center flex-1">
              <CustomButton
                title="Back"
                handlePress={() => router.replace("/semester")}
                isLoading={isLoading}
                containerStyles="mt-7 w-20 mr-5"
              />
              <CustomButton
                title="Finish"
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

export default Courses;
