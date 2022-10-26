import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Modal,
} from "react-native";
import React, { useState } from "react";
import AppText, { MeidumText } from "../Components/AppText";
import Colors from "../Config/Colors";
import AppBtn, { OutlineBtn } from "../Components/AppBtn";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import { ProductItems } from "../Components/OpenItems";
import AppInput from "../Components/AppInput";
export default function ListingDetails() {
  const [visible, setVisible] = useState(false);
  const [visibleTwo, setVisibleTwo] = useState(false);
  const ratingReviews = [
    {
      id: 1,
      rating: 4.2,
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptates quisquam amet non veritatis inventore dolores assumenda repudiandae dicta voluptatem.",
      customer: "Jameson Iweala",
    },
    {
      id: 2,
      rating: 3.9,
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptates quisquam amet non veritatis inventore dolores assumenda repudiandae dicta voluptatem.",
      customer: "Samson Iweala",
    },
    {
      id: 3,
      rating: 4.2,
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptates quisquam amet non veritatis inventore dolores assumenda repudiandae dicta voluptatem dolores assumenda repudiandae dicta voluptatem dolores assumenda repudiandae dicta voluptatem.",
      customer: "John Iweala",
    },
  ];
  const qualities = [
    {
      id: 1,
      quality: "BRAND",
      name: "Apple",
    },
    {
      id: 2,
      quality: "BRAND",
      name: "iPhone 11",
    },
    {
      id: 3,
      quality: "INTERNAL STORAGE",
      name: "64GB",
    },
    {
      id: 4,
      quality: "MAIN CAMERA",
      name: "Dual 12MP / 12MP",
    },
    {
      id: 5,
      quality: "SELFIE CAMERA",
      name: "7 MP (f/2.2)",
    },
    {
      id: 6,
      quality: "COLOR",
      name: "Green",
    },
  ];
  return (
    <>
      <ScrollView style={styles.prodDetails}>
        <View>
          <Image
            source={require("../assets/image5.jpg")}
            style={styles.img}
            resizeMode="contain"
          />
        </View>

        <View style={styles.txtCont}>
          <MeidumText
            text="Apple iPhone 11 Green 64GB"
            style={{ fontSize: 23 }}
          />
          <MeidumText
            text="₦ 450,000"
            style={{ marginTop: 10, color: Colors.primary, fontSize: 23 }}
          />
          <View style={styles.btnCont}>
            <OutlineBtn
              handlePress={() => setVisibleTwo(true)}
              title="Make offer"
              color={Colors.white}
              style={{ backgroundColor: Colors.primary, width: "47%" }}
              iconFam="chatbox-ellipses-outline"
              iconColor={Colors.white}
            />
            <OutlineBtn
              title="Contact merchant"
              color={Colors.primary}
              style={{ width: "49%" }}
              iconName="phone"
              iconColor={Colors.primary}
            />
          </View>
        </View>
        <View style={styles.smallTxtCont}>
          <AppText
            style={{ color: Colors.dark_light }}
            text="
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores est omnis veniam quis architecto quae fuga quas! Cupiditate aperiam in animi voluptates odio fugiat iste, porro tempore ipsam. Ipsum, cumque.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores est omnis veniam quis."
          />
          <AppText
            style={{ color: Colors.dark_light }}
            text="
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores est omnis veniam quis architecto quae fuga quas! Cupiditate aperiam in animi voluptates odio fugiat iste,."
          />
        </View>
        <View style={styles.rating}>
          <FlatList
            // horizontal={true}
            numColumns={2}
            data={qualities}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ index, item }) => (
              <View style={[{ width: "50%" }]}>
                <View style={{ paddingVertical: 10 }}>
                  <MeidumText text={item.name} style={{ fontSize: 16 }} />
                  <AppText text={item.quality} style={{ fontSize: 12 }} />
                </View>
              </View>
            )}
          />
        </View>
        <View style={styles.rating}>
          <View style={styles.ratingTxt}>
            <MeidumText text="Ratings & Reviews" />
            <AppText text="View All" />
          </View>
          <FlatList
            data={ratingReviews}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ paddingVertical: 10 }}>
                <AppText text={item.review} />
                <MeidumText
                  text={item.customer}
                  style={{ fontSize: 16, paddingTop: 5 }}
                />
              </View>
            )}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <OutlineBtn
          title="Add to cart"
          color={Colors.white}
          style={{ backgroundColor: Colors.primary, width: "47%" }}
          feather="shopping-cart"
          iconColor={Colors.white}
        />
        <OutlineBtn
          handlePress={() => setVisible(true)}
          title="Add to inventory"
          color={Colors.white}
          style={{ backgroundColor: Colors.primary, width: "49%" }}
          feather="shopping-bag"
          iconColor={Colors.white}
        />
      </View>
      <Modal visible={visible} transparent>
        <View style={styles.modal}>
          <View style={styles.top2}>
            <View>
              <Feather
                name="x-circle"
                size={20}
                onPress={() => setVisible((prevState) => !prevState)}
              />
            </View>
            <AppText
              text="Add to Inventory"
              style={{ fontWeight: "700", textAlign: "center" }}
            />
            <View />
          </View>
          <ProductItems
            title="iPhone 11 Green 64GB"
            subTitle="450,000"
            img
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <AppText
            text="How much are you willing to sell this product?"
            style={{ fontWeight: "700" }}
          />
          <AppInput placeholder="450,000" />
          <View
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              width: "100%",
            }}
          >
            <OutlineBtn
              handlePress={() => {
                setVisible(false);
              }}
              title="Negotiate Cost Price"
              color={Colors.primary}
              style={{ borderColor: Colors.primary }}
            />
            <AppBtn
              handlePress={() => setVisible(false)}
              title="Add to Inventory"
              color={Colors.primary}
              style={{ marginTop: 20 }}
            />
          </View>
        </View>
      </Modal>
      <Modal visible={visibleTwo} transparent>
        <View style={styles.modal}>
          <View style={styles.top2}>
            <View>
              <Feather
                name="x-circle"
                size={20}
                onPress={() => setVisibleTwo((prevState) => !prevState)}
              />
            </View>
            <AppText
              text="Make Offer"
              style={{ fontWeight: "700", textAlign: "center" }}
            />

            <View />
          </View>
          <ProductItems
            title="iPhone 11 Green 64GB"
            subTitle="450,000"
            img
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <AppText
            text="How much are you willing to pay?"
            style={{ fontWeight: "700" }}
          />
          <AppInput placeholder="450,000" />
          <View
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              width: "100%",
            }}
          >
            <AppBtn
              handlePress={() => setVisibleTwo(false)}
              title="Send Bid"
              color={Colors.primary}
              style={{ marginTop: 20 }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  txtCont: {
    padding: 10,
    backgroundColor: Colors.white,
  },
  smallTxtCont: {
    padding: 15,
    backgroundColor: Colors.white,
    marginTop: 20,
  },
  img: {
    width: "100%",
    height: 267,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  btnCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 10,
  },
  prodDetails: {
    backgroundColor: Colors.medium,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  rating: {
    padding: 20,
    backgroundColor: Colors.white,
    marginTop: 20,
  },
  ratingTxt: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  top2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  modal: {
    elevation: 40,
    width: "100%",
    height: "80%",
    backgroundColor: Colors.white,
    bottom: 0,
    position: "absolute",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
