import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import "react-native-gesture-handler";
import { StyleSheet} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "./utils/colors";
import { enableScreens } from "react-native-screens";
import { HomeStackScreen } from "./screens/Home/Home";
import { AccountStackScreen } from "./screens/Account/Account";
import { MoreStackScreen } from "./screens/More/More";
import { SettingsStackScreen } from "./screens/Settings/Settings";
enableScreens();

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const routeName = route.name;
            let iconName;

            if (routeName === "Home") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            }

            if (routeName === "More") {
              iconName = focused
                ? "ios-ellipsis-horizontal"
                : "ios-ellipsis-horizontal-outline";
            }

            if (routeName === "Settings") {
              iconName = focused ? "ios-settings" : "ios-settings-outline";
            }

            if (routeName === "Account") {
              iconName = focused
                ? "ios-person-circle"
                : "ios-person-circle-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: colors.brand.accent,
          inactiveTintColor: colors.gray,
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="More" component={MoreStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
        <Tab.Screen name="Account" component={AccountStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
