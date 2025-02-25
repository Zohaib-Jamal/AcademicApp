import React from "react";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import Camera from "./camera";


const MoreLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="camera"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default MoreLayout;
