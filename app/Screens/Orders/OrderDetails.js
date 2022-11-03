import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../Config/Colors";
import { Items } from "../../Components/OpenItems";
import Screen from "../Screen";
import AppText, { MeidumText } from "../../Components/AppText";
import {
  Feather,
  SimpleLineIcons,
  Ionicons,
  Fontisto,
} from "@expo/vector-icons";
import AppBtn, { OutlineBtn } from "../../Components/AppBtn";
import AppInput from "../../Components/AppInput";
export default function OrderDetails({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [visibleTwo, setVisibleTwo] = useState(false);
  return (
    <Screen>
      <View style={styles.top}>
        <TouchableHighlight
          underlayColor={Colors.light}
          onPress={() => navigation.goBack()}
          style={{ padding: 15, borderRadius: 25 }}
        >
          <SimpleLineIcons name="arrow-left" color={Colors.black} size={20} />
        </TouchableHighlight>
        <View style={styles.flexRow}>
          <MeidumText text="View Order" style={{ fontSize: 16 }} />
        </View>
        <View></View>
      </View>
      <ScrollView style={styles.details}>
        <Items
          title="Order #132557"
          subTitle="Order Made on Thursday, April 30, 2022"
          label="pending"
          date="Delivery on Friday May 1, 2022"
          labelColor={Colors.pending}
        />
        <View>
          <MeidumText
            text="Order items"
            style={{ marginVertical: 12, fontSize: 19 }}
          />
          <Items title="iPhone 11 Green 64GB" />
          <View style={styles.txtCont}>
            <MeidumText text="Total 1" style={{ fontSize: 19 }} />
            <MeidumText
              text="450,000"
              style={{ fontSize: 19, color: Colors.primary }}
            />
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <MeidumText
            text="Order status"
            style={{ fontSize: 19, marginVertical: 12 }}
          />
          <View style={styles.delivery}>
            <MeidumText
              text="Shipped"
              style={{ fontSize: 18, fontWeight: "300" }}
            />
            <AppText
              text="May 1, 2022"
              style={{
                fontSize: 18,
                fontWeight: "400",
                paddingTop: 10,
                marginBottom: 20,
              }}
            />

            <TouchableOpacity style={styles.tapToChange}>
              <MeidumText text="View tracking history" style={styles.txt} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <MeidumText
            text="Delivery Details"
            style={{ fontSize: 19, marginVertical: 12 }}
          />
          <View style={styles.delivery}>
            <MeidumText
              text="John Doe"
              style={{ fontSize: 18, fontWeight: "300" }}
            />
            <AppText
              text="30 Turnbull Road, Ikoyi"
              style={{
                fontSize: 18,
                fontWeight: "400",
                paddingTop: 10,
                marginBottom: 20,
              }}
            />
            <AppText
              text="Lagos, Nigeria"
              style={{
                fontSize: 18,
                fontWeight: "400",
                // paddingTop: 10,
                marginBottom: 20,
              }}
            />

            <TouchableOpacity style={styles.tapToTrack}>
              <Ionicons name="cube-outline" size={30} />
              <MeidumText
                text="Door delivery"
                style={{ fontSize: 20, paddingLeft: 8 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            backgroundColor: Colors.white,
            marginTop: 40,
            padding: 10,
            paddingBottom: 20,
          }}
        >
          <View style={styles.deliveryBox}>
            <MeidumText text="Total Items" style={{ fontSize: 18 }} />
            <MeidumText text="450,000" style={{ fontSize: 20 }} />
          </View>
          <View style={styles.deliveryBox}>
            <MeidumText text="VAT" style={{ fontSize: 18 }} />
            <MeidumText text="1,000" style={{ fontSize: 20 }} />
          </View>
          <View style={styles.deliveryBox}>
            <MeidumText text="Delivery Fee" style={{ fontSize: 18 }} />
            <MeidumText text="0" style={{ fontSize: 20 }} />
          </View>
          <View style={styles.deliveryBox}>
            <MeidumText text="Total Fee" style={{ fontSize: 18 }} />
            <MeidumText
              text="451,000"
              style={{ fontSize: 20, fontWeight: "800" }}
            />
          </View>
        </View>
        <View style={styles.rider}>
          <Image
            style={styles.riderImg}
            source={require("../../assets/rider.jpg")}
          />
          <MeidumText
            text="Emeka Anyawu"
            style={{ fontSize: 18, padding: 10 }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View style={styles.riderInfo}>
              <Ionicons name="md-cube-outline" size={25} />
              <AppText text="35 deliveries" style={{ padding: 8 }} />
            </View>
            <View style={styles.riderInfo}>
              <Fontisto name="star" size={25} color={Colors.star} />
              <AppText text="4/5" style={{ padding: 8 }} />
            </View>
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <OutlineBtn
            title="Contact Dispatch Rider"
            color={Colors.white}
            style={{ backgroundColor: Colors.primary }}
          />
          <OutlineBtn
            handlePress={() => setVisible((prevState) => !prevState)}
            title="Contact buyer"
            color={Colors.white}
            style={{ backgroundColor: Colors.primary }}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <AppBtn title="Contact Merchant" color={Colors.primary} />
          <OutlineBtn
            title="Raise Dispute"
            color={Colors.danger}
            style={{ borderColor: Colors.danger }}
          />
          <OutlineBtn
            handlePress={() => setVisible((prevState) => !prevState)}
            title="Cancel Order"
            color={Colors.danger}
            style={{ borderColor: Colors.danger }}
          />
        </View>

        <View style={{ padding: 30 }} />
      </ScrollView>
      <Modal visible={visible} transparent>
        <View style={styles.modal}>
          <View style={styles.top2}>
            <View />
            <AppText
              text="Cancel Order"
              style={{ fontWeight: "700", textAlign: "center" }}
            />
            <Feather
              name="x-circle"
              size={20}
              onPress={() => setVisible((prevState) => !prevState)}
            />
          </View>
          <AppText
            text="Cancelling this order cannot be undone"
            style={{ fontWeight: "600", textAlign: "center" }}
          />
          <AppText text="Are you Sure? " style={{ textAlign: "center" }} />
          <View
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              width: "100%",
            }}
          >
            <AppBtn
              handlePress={() => setVisible(false)}
              title="Go back"
              color={Colors.primary}
              style={{ marginTop: 20 }}
            />
            <OutlineBtn
              handlePress={() => {
                setVisible(false);
                setVisibleTwo(true);
              }}
              title="Yes, Cancel order"
              color={Colors.danger}
              style={{ borderColor: Colors.danger }}
            />
          </View>
        </View>
      </Modal>
      <Modal visible={visibleTwo} transparent>
        <View style={[styles.modal, { height: "50%" }]}>
          <View style={styles.top2}>
            <View />
            <AppText
              text="Cancel Order"
              style={{ fontWeight: "700", textAlign: "center" }}
            />
            <Feather
              name="x-circle"
              size={20}
              onPress={() => setVisibleTwo((prevState) => !prevState)}
            />
          </View>

          <AppText
            text="Order Successfully cancelled"
            style={{ textAlign: "center", marginTop: -20 }}
          />
          <AppInput placeholder="Reason for cancelling" numberOfLines={6} />
          <AppBtn
            title="Continue"
            color={Colors.primary}
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
            }}
          />
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  txtCont: {
    borderTopColor: Colors.light,
    borderTopWidth: 1.6,
    marginTop: -10,
    padding: 10,
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deliveryBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  details: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: Colors.light,
  },
  delivery: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  tapToChange: {
    alignItems: "center",
    borderTopColor: Colors.light,
    borderTopWidth: 1.9,
    paddingVertical: 8,
    paddingTop: 15,
  },
  tapToTrack: {
    alignItems: "center",
    flexDirection: "row",
    borderTopColor: Colors.light,
    borderBottomColor: Colors.light,
    borderTopWidth: 1.9,
    borderBottomWidth: 1.9,
    paddingVertical: 8,
    paddingTop: 15,
  },
  txt: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "400",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
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
    height: "40%",
    backgroundColor: Colors.white,
    bottom: 0,
    position: "absolute",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  rider: {
    backgroundColor: Colors.white,
    marginTop: 40,
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  riderImg: {
    borderRadius: 45,
    width: 100,
    height: 100,
  },
  riderInfo: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
