import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";

export default function App() {
  return (
    <SafeAreaProvider style={{ backgroundColor: "blue", flex: 1 }}>
      <Navigation />
    </SafeAreaProvider>
  );
}
