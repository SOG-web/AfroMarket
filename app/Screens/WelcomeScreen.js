import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "./Screen";
import { LinearGradient } from "expo-linear-gradient";
import AppText, { BoldText } from "../Components/AppText";
import AppBtn from "../Components/AppBtn";
import Line from "../Components/Line";
import Colors from "../Config/Colors";

export default function WelcomeScreen({ navigation }) {
  return (
    <ScrollView>
      <Image
        source={require("../assets/afroimage1.png")}
        resizeMode="cover"
        blurRadius={0.3}
        style={styles.img}
      />
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.9)", "rgba(255, 255, 255, 1)"]}
        style={styles.txtContainer}
      >
        <View style={{ padding: 15 }}>
          <BoldText text="Buy from" />
          <BoldText text="the best" />
          <View style={{ height: 10 }}></View>
          <AppText text="Buy Products at the best" />
          <AppText text="price you can ever get" />
          <Line start={0.5} stop={0.5} />
        </View>
      </LinearGradient>
      <View style={styles.btnContainer}>
        <AppBtn
          title="Next"
          color={Colors.primary}
          style={styles.btn}
          handlePress={() => navigation.navigate("welcome2")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 380,
  },
  txtContainer: {
    marginTop: -30,
    height: 450,
    width: "100%",
    shadowOpacity: 0.1,
  },
  btn: {
    position: "absolute",
    bottom: 130,
  },
  btnContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});