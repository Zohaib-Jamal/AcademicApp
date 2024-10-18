import { View, Text, Image, ImageSourcePropType } from 'react-native'
import {Tabs} from 'expo-router';
import { icons } from '../../constants';

const TabIcon = ({icon, color, name, focused}: {icon:ImageSourcePropType, color:string, name: string, focused:boolean}) => {
  return (
    <View
      className="items-center justify-center"
    > 
      <Image 
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs p-{1} pt-{2}`} style={{color:color}}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel:false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            
            borderTopColor: '#232533',
            height: 84,
          }
        }}
      >
         <Tabs.Screen 
         name="home"
         options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
              <TabIcon 
                icon={icons.house}
                color={color}
                name="Home"
                focused={focused}
              />
          )
         }}
         />
         
         <Tabs.Screen 
         name="chat"
         options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
              <TabIcon 
                icon={icons.chat}
                color={color}
                name="Chat"
                focused={focused}
              />
          )
         }}
         />
         <Tabs.Screen 
         name="events"
         options={{
          title: 'Events',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.events}
              color={color}
              name="Events"
              focused={focused}
            />
          )
         }}
         />
          <Tabs.Screen 
         name="forum"
         options={{
          title: 'Forum',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.forum}
              color={color}
              name='Forum'
              focused={focused}
            />
          )
         }}
         />
      </Tabs>
    </>
  )
}

export default TabsLayout;