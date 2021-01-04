import * as React from "react";
import {
  Animated,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";

const NAVBAR_HEIGHT = 90;
const STATUSBAR_HEIGHT = Platform.select({
  ios: 20,
  default: StatusBar.currentHeight,
});

const Header = (props: {
  headerTranslateY: Animated.AnimatedInterpolation;
  headerOpacity: Animated.AnimatedInterpolation;
}) => {
  const categoriesHeader = [
    { name: "TV Programmes" },
    { name: "Films" },
    { name: "My List" },
  ];

  const renderItem = ({ item }: { item: { name: string } }) => (
    <View style={styles.categoryHeader}>
      <Text style={{ color: "#fff" }}>{item.name}</Text>
    </View>
  );
  console.log("opacity", props.headerOpacity);

  return (
    <Animated.View
      style={[
        styles.navBar,
        {
          backgroundColor: props.headerOpacity,
          transform: [{ translateY: props.headerTranslateY }],
        },
      ]}
    >
      <Text style={styles.logo}>J</Text>
      <FlatList
        horizontal={true}
        data={categoriesHeader}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.name + index}
      />
    </Animated.View>
  );
};

export interface HomeScreenProps {}

export interface HomeScreenState {
  scrollAnim: Animated.Value;
  offsetAnim: Animated.Value;
  clampedScroll: Animated.AnimatedDiffClamp;
}
export default class HomeScreenScreen extends React.Component<
  HomeScreenProps,
  HomeScreenState
> {
  constructor(props: HomeScreenProps) {
    super(props);

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.state = {
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: "clamp",
          }),
          offsetAnim
        ),
        0,
        NAVBAR_HEIGHT
      ),
    };
  }

  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;

  _scrollEndTimer?: ReturnType<typeof setTimeout>;

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  _onScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
  };

  _onMomentumScrollBegin = () => {
    this._scrollEndTimer && clearTimeout(this._scrollEndTimer);
  };

  _onMomentumScrollEnd = () => {
    const toValue =
      this._scrollValue > NAVBAR_HEIGHT &&
      this._clampedScrollValue > NAVBAR_HEIGHT / 2
        ? this._offsetValue + NAVBAR_HEIGHT
        : this._offsetValue - NAVBAR_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: false,
    }).start();
  };

  _getHeaderTranslateY = () => {
    const { clampedScroll } = this.state;

    return clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT],
      outputRange: [0, -NAVBAR_HEIGHT],
      extrapolate: "clamp",
    });
  };

  _getHeaderOpacity = () => {
    const { scrollAnim } = this.state;

    return scrollAnim.interpolate({
      inputRange: [0, NAVBAR_HEIGHT],
      outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,1)"],
      extrapolate: "clamp",
    });
  };

  public render() {
    const headerTranslateY = this._getHeaderTranslateY();
    const headerOpacity = this._getHeaderOpacity();

    console.log(headerTranslateY);
    console.log(headerOpacity);
    return (
      <SafeAreaView>
        <Header
          headerTranslateY={headerTranslateY}
          headerOpacity={headerOpacity}
        />
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
            { useNativeDriver: false }
          )}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollEndDrag={this._onScrollEndDrag}
        >
          <Text>{"test".repeat(10000)}</Text>
        </Animated.ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: NAVBAR_HEIGHT,
    paddingTop: STATUSBAR_HEIGHT,
    paddingHorizontal: 20,
    zIndex: 100,
  },
  logo: {
    color: Colors.logo,
    fontSize: 40,
    fontWeight: "bold",
  },
  categoryHeader: {
    paddingLeft: 40,
  },
});
