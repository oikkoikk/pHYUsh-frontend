/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import NotFoundScreen from "../screens/NotFoundScreen";
import MainScreen from "../screens/MainScreen";
import SettingScreen from "../screens/SettingScreen";
import SearchScreen from "../screens/SearchScreen";
import { RootStackParamList, RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import LimitedScreen from "../screens/LimitedScreen";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="LimitedScreen" component={LimitedScreen} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = React.memo(function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="notification"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {
          borderTopColor: Colors[colorScheme].seperator,
          paddingBottom: 10,
          height: 60,
        },
        tabBarIconStyle: {
          height: 30,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: -5,
        },
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: {
          height: 15,
          lineHeight: 15,
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "NotoSans-Regular",
          fontWeight: "normal",
          fontSize: 10,
        },
      }}
    >
      <BottomTab.Screen
        name="notification"
        component={MainScreen}
        options={{
          title: "빈자리 알림",
          tabBarIcon: ({ color }) => <Entypo size={20} name="bell" color={color} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="settings"
        component={SettingScreen}
        options={{
          title: "설정",
          tabBarIcon: ({ color }) => <Ionicons size={20} name="md-settings-outline" color={color} />,
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
});
