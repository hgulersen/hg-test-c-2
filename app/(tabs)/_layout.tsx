import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Text, Pressable, View, useColorScheme } from "react-native";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import config from "../../config";
import useTimeSpentStore from "../../stores/timeSpentStore";
import SessionTimeSpent from "../../components/SessionTimeSpent";

const CustomHeaderTitle = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
        For You
      </Text>
      <View
        style={{ width: 36, height: 4, backgroundColor: "white", marginTop: 6 }}
      />
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "black",
          height: config.tabBarHeight,
        },
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: () => <CustomHeaderTitle />,
          headerTransparent: true,
          tabBarIcon: ({ focused }) => (
            <Entypo name="home" size={24} color={focused ? "white" : "gray"} />
          ),
          headerRight: () => (
            <FontAwesome
              style={{ marginRight: 12 }}
              name="search"
              size={24}
              color="white"
            />
          ),
          headerLeft: () => (
            <View
              style={{
                marginLeft: 12,
              }}
            >
              <SessionTimeSpent />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
          },
        }}
        options={{
          title: "Discover",
          tabBarIcon: ({ focused }) => (
            <Ionicons name="compass" size={24} color="gray" />
          ),
        }}
      />
      <Tabs.Screen
        name="three"
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
          },
        }}
        options={{
          title: "Activity",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="timer" size={24} color="gray" />
          ),
        }}
      />
      <Tabs.Screen
        name="four"
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
          },
        }}
        options={{
          title: "Bookmark",
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="bookmark" size={24} color="gray" />
          ),
        }}
      />
      <Tabs.Screen
        name="five"
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
          },
        }}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Ionicons name="person-circle" size={24} color="gray" />
          ),
        }}
      />
    </Tabs>
  );
}
