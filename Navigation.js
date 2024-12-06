import { NavigationContainer } from "@react-navigation/native";
import Feed from "./screens/tabScreens/Feed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Notifications from "./screens/tabScreens/Notifications";
import Settings from "./screens/tabScreens/Settings";
import { Ionicons } from "@expo/vector-icons";
import TweetDetailScreen from "./screens/homeStack/TweetDetailScreen";

// Stack
const HomeStack = createNativeStackNavigator();
const HomeStackGroup = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Feed"
        component={Feed}
        options={{ headerTitleAlign: "center" }}
      />
      <HomeStack.Screen
        name="TweetDetailScreen"
        component={TweetDetailScreen}
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
          route.name === "HomeStackGroup" &&
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
        name="HomeStackGroup"
        component={HomeStackGroup}
        options={{ headerShown: false, tabBarLabel: "Home" }}
      />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <TabGroup />
    </NavigationContainer>
  );
}
