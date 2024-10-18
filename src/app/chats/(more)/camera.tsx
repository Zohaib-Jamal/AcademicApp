/*import { View, Text, Image, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useRef, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import {
  Camera,
  CameraView,
  CameraViewRef,
  CameraType,
  CameraCapturedPicture,
} from "expo-camera";

const CameraComponent: React.FC = () => {
  const cameraRef = useRef<CameraType | null>(null); // Use ref with proper Camera type
  const [hasCameraPermission, setHasCameraPermission] =
    useState<boolean>(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState<boolean>(false);
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    if (cameraRef.current) {
      let newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto);
    }
  };

  if (photo) {
    const savePhoto = async () => {
      if (photo.uri) {
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        setPhoto(null);
      }
    };

    return (
      <SafeAreaView className="bg-primary h-full">
        <Image
          className="self-stretch flex-1"
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        {hasMediaLibraryPermission ? (
          <Button title="Save" onPress={savePhoto} />
        ) : null}
        <Button title="Discard" onPress={() => setPhoto(null)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <CameraView
        className="flex-1 items-center justify-center"
        ref={cameraRef}
      >
        <View className="bg-white self-end">
          <Button title="Take Pic" onPress={takePic} />
        </View>
      </CameraView>
    </SafeAreaView>
  );
};

export default CameraComponent;
*/

import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Camera, CameraView, CameraViewRef } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import LeftArrow from "../../../../assets/svgs/LeftArrow";
import { useRouter } from "expo-router";

const CameraComponent = () => {
  const router = useRouter();

  const [hasPermission, setHasPermission] = useState(false);
  const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef && isCameraReady) {
      try {
        const options = {
          quality: 0.5,
          base64: true,
          exif: true,
          skipProcessing: false,
        };
        const data = await cameraRef.takePictureAsync(options);
        console.log("Picture taken:", data);
        if (data) setPhotoUri(data.uri);
      } catch (error) {
        console.error("Error taking picture", error);
      }
    } else {
      console.log("Camera not ready or not available");
    }
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute left-5 top-10 z-10"
      >
        <View className="w-10 h-10 ">
          <LeftArrow color="#FF9C01" />
        </View>
      </TouchableOpacity>
      <CameraView
        ref={(ref) => setCameraRef(ref)}
        onCameraReady={onCameraReady}
        className="flex-1 bg-primary items-center w-full h-full justify-center flex-row"
      >
        <View className="self-end">
          <TouchableOpacity onPress={takePicture}>
            <View className="border-2 border-secondary w-15 y-15 flex rounded-full my-5 justify-center items-center">
              <View className="bg-secondary w-10 y-10 rounded-full p-7 m-1"></View>
            </View>
          </TouchableOpacity>
        </View>
      </CameraView>
    </SafeAreaView>
  );
};

export default CameraComponent;
