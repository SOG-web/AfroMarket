import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import Screen from './Screen';
import Colors from '../Config/Colors';
import AppInput from '../Components/AppInput';
import AppText, { MeidumText } from '../Components/AppText';
import CheckBox from '../Components/CheckBox';
import { Feather } from '@expo/vector-icons';
import AppBtn, { OutlineBtn } from '../Components/AppBtn';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import ActivityIndicator from '../Components/ActivityIndicator';
import { base_url } from '../Constants/api';
export default function Markets() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiEndpoint = base_url;
  useEffect(() => {
    const getAllMerchants = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${apiEndpoint}/afro-market/v1/merchant/all?limit=10&page=1`
      );
      setMerchants(data.data.allMerchants.data.rows);
      setLoading(false);
    };
    getAllMerchants();
  }, []);

  if (loading) {
    return <ActivityIndicator visible={loading} />;
  }

  return (
    <>
      <View style={styles.market}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <MaterialCommunityIcons
            name='menu'
            size={30}
            style={{ margin: 10, marginLeft: 25 }}
            onPress={() => navigation.openDrawer()}
          />
          <MaterialCommunityIcons
            color={Colors.primary}
            name='filter'
            size={23}
            style={{ margin: 10, marginRight: 20 }}
            onPress={() => setVisible(true)}
          />
        </View>
        <View style={styles.search}>
          <AppInput
            iconName='ios-search-outline'
            style={{ backgroundColor: Colors.light }}
            placeholder='Search here'
          />
        </View>
        <FlatList
          style={styles.list}
          showsVerticalScrollIndicator={false}
          data={merchants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableHighlight
              underlayColor={Colors.white}
              onPress={() =>
                navigation.navigate('marketDetails', {
                  id: item.id,
                  other: { name: item.business_name },
                })
              }
            >
              <Card
                img={item.brand_image}
                title={item.business_name}
                address={item.address}
                rating={item.ratings}
              />
            </TouchableHighlight>
          )}
        />
        <Modal visible={visible} transparent>
          <View style={styles.filter}>
            <View style={styles.top}>
              <Feather
                name='x-circle'
                size={20}
                onPress={() => setVisible((prevState) => !prevState)}
              />
              <AppText text='Filter' style={{ fontWeight: '700' }} />
              <AppText text='Clear All' />
            </View>

            <AppText text='Location' style={{ fontWeight: '700' }} />
            <AppInput
              style={{ backgroundColor: '#dadada' }}
              placeholder='Location'
            />
            <AppText
              text='Filter by'
              style={{ marginTop: 20, fontWeight: '700' }}
            />
            <CheckBox text='All (24 merchants)' />
            <CheckBox text='Closest to me (10 merchants)' />
            <CheckBox text='Still open (33 merchants)' />
            <CheckBox text='Top Rated (10 merchants)' />

            <AppText
              text='Sort by'
              style={{ marginTop: 20, fontWeight: '700' }}
            />
            <CheckBox text='Newest to oldest' />
            <CheckBox text='Oldest to newest' />
            <CheckBox text='A-Z' />
            <View style={{ width: '100%' }}></View>
            <AppBtn
              title='Show All 12 Merchants'
              color={Colors.primary}
              style={{ marginTop: 20 }}
            />
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: Colors.light,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  search: {
    paddingHorizontal: 10,
  },
  market: {
    paddingTop: 15,
    flex: 1,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  filter: {
    elevation: 30,
    position: 'absolute',
    width: '100%',
    height: '80%',
    backgroundColor: Colors.white,
    bottom: 0,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
