import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Feed from "./screens/tabScreens/Feed";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Notifications from "./screens/tabScreens/Notifications";
import Settings from "./screens/tabScreens/Settings";
import { Ionicons } from "@expo/vector-icons";
import TweetDetailScreen from "./screens/homeStack/TweetDetailScreen";
import Payments from "./screens/drawerScreens/Payments";
import { useLayoutEffect } from "react";
import { Image, Pressable } from "react-native";

// Custom tabBar with swiping
const Menu = createMaterialTopTabNavigator();

const MenuGroup = () => {
  return;
};

// Simple TopTabs
const TopTabs = createMaterialTopTabNavigator();

const TopTabGroup = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => navigation.openDrawer()}>
          <Image
            source={require("./assets/beto.jpeg")}
            style={{ width: 40, height: 40, borderRadius: 100, marginLeft: 15 }}
          />
        </Pressable>
      ),
      // headerRight: () => <Button title="Test"/>,
    });
  }, []);
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          height: 5,
          borderRadius: 5,
          backgroundColor: "#1DA1F2",
        },
      }}
    >
      <TopTabs.Screen
        name="main"
        component={Feed}
        options={{
          tabBarLabel: "Feed",
        }}
      />
      <TopTabs.Screen name="Following" component={Payments} />
      <TopTabs.Screen name="View" component={Payments} />
    </TopTabs.Navigator>
  );
};

// Stack
const HomeStack = createNativeStackNavigator();
const HomeStackGroup = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="TabGroup"
        component={TabGroup}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="TweetDetailScreen"
        component={TweetDetailScreen}
        options={{ presentation: "modal" }}
      />
    </HomeStack.Navigator>
  );
};

// Bottom Tab
const Tab = createBottomTabNavigator();

const TabGroup = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          route.name === "Feed" &&
            (iconName = focused ? "home" : "home-outline");
          route.name === "Settings" &&
            (iconName = focused ? "settings" : "settings-outline");
          route.name === "Notifications" &&
            (iconName = focused ? "notifications" : "notifications-outline");

          return <Ionicons name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: "#1DA1F2",
        tabBarInactiveTintColor: "gray",
        headerTitleAlign: "center",
      })}
    >
      <Tab.Screen
        name="Feed"
        component={TopTabGroup}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

// Drawer
const Drawer = createDrawerNavigator();

const DrawerGroup = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="HomeStackGroup"
        component={HomeStackGroup}
        options={{ drawerLabel: "Home" }}
      />
      <Drawer.Screen
        name="Payments"
        component={Payments}
        options={{ headerShown: true }}
      />
    </Drawer.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      {/* <HomeStackGroup /> */}
      <DrawerGroup />
    </NavigationContainer>
  );
}
