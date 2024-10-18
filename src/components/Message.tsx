import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type MessagePropTypes = {
  message: string;
  from: string;
  time: Date;
  self: boolean;
};

const Message: React.FC<MessagePropTypes> = ({ message, from, time, self }) => {
  const today = new Date().toISOString().split("T")[0];
  const msgDate = time.toISOString().split("T")[0];

  

  let hours = time.getHours();

  let amp = hours > 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const sentTime = `${hours}:${time.getMinutes().toString().padStart(2, "0")} ${amp}`;

  return (
    <TouchableOpacity
      className={`h-17 py-1 px-4 w-min bg-black-100 mb-3 rounded-2xl justify-center self-start ${
        self ? "rounded-br-none self-end bg-secondary-200" : "rounded-bl-none"
      }`}
    >
      {!self ? (
        <Text className={` font-pmedium text-xs text-gray-100 self-start`}>
          {from}
        </Text>
      ) : (
        <></>
      )}

      <Text className="text-white font-psemibold text-base">{message}</Text>
      <Text
        className={` font-pmedium text-xs self-end ml-5 ${
          self ? "text-black-200" : "text-gray-100"
        }`}
      >
        {today === msgDate ? sentTime : `${sentTime}`}
      </Text>
    </TouchableOpacity>
  );
};

export default Message;
