import React from "react";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import SignIn from "./sign-in";
import SignUp from "./sign-up";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="major"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="semester"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="courses"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
