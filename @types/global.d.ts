import { Timestamp } from "firebase/firestore";
/*
type MsgUnit = {
  time: Timestamp;
  from: string;
  uid: string;
  text: string;
};
*/
declare global {
  type userdata = {
    enrolled: boolean;
    major: string | null;
    semester: string | null;
  };

  type CourseType = {
    course: string;
    sections: string[] | [];
  };

  type SelectedCourseType = {
    course: string;
    section: string | null;
  };

  //type MessageType = [string, MsgUnit]
  type MessageType = {
    id: string;
    time: Timestamp;
    from: string;
    uid: string;
    text: string;
  };
}

export {};
