import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, SafeAreaView, Button } from "react-native";
import TweetContent from "../../components/TweetContent";
import { useLayoutEffect } from "react";

export default function TweetDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { params } = route;

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: params.tweet.author.name });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Button title="Go back" onPress={() => { navigation.goBack() }}></Button> */}
      <TweetContent tweet={params.tweet} />
    </SafeAreaView>
  );
}
