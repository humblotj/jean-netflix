import * as React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface HomeScreenProps {}

export interface HomeScreenState {}

export default class HomeScreenScreen extends React.Component<
  HomeScreenProps,
  HomeScreenState
> {
  constructor(props: HomeScreenProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <SafeAreaView style={{ backgroundColor: "red" }}>
        <Text>Test</Text>
      </SafeAreaView>
    );
  }
}
