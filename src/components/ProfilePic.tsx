import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {images} from "../constants"
import {Ionicons} from "@expo/vector-icons"
//import * as ImagePicker from 'expo-image-picker';

const ProfilePic = ({avatar}:{avatar:Function}) => {
    const [image, setImage] = useState("")
    const chooseImage = async () => {
        /*
        try{
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [1,1],
            quality:1
        })
        if(!result.canceled){
            //setImage(result.assets[0].uri)
            setImage(result.assets[0].uri)
            avatar(result.assets[0].uri)
        }
        console.log("req:", result.assets[0].uri)
      
    }catch(err){
        console.log(err.message)
    }
          */
    }

  return (
    <View className="justify-center items-center mt-2.5">
    <TouchableOpacity className=" justify-center items-center w-[120px] h-[120px] rounded-full  border-4  border-black-200 focus:border-secondary" onPress={chooseImage} >
      <Image source={image ? ({uri:image}): images.profilePic} resizeMode="contain" className="w-[115px] h-[115px]  rounded-full "/>
      <View  className="absolute border-2  bottom-0.5 items-center justify-center align-bottom  bg-black-100 border-black-200  rounded-full p-2  ">
        <Ionicons name="pencil-outline" color="white" size={20}/>
      </View>
    </TouchableOpacity>
    </View>
  )
}

export default ProfilePic