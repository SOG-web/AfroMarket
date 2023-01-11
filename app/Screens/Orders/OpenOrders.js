import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import OpenItems from '../../Components/OpenItems';
import Colors from '../../Config/Colors';
import { base_url } from '../../Constants/api';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { MeidumText } from '../../Components/AppText';
import ActivityIndicator from '../../Components/ActivityIndicator';

const key = 'authToken';

const token = SecureStore.getItemAsync(key);

export default function OpenOrders({ navigation }) {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${base_url}/afro-market/v1/order/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${token['_3']}`,
          },
        }
      );
      console.log(data.data['active_orders']);
      setOrders(data.data['active_orders']);
      setLoading(false);
    };
    getOrders();
  }, []);

  const items = [
    {
      id: 2,
      title: 'iPhone 11 Green 64gb',
      subtitle: 'Order #123456',
      label: 'Active',
      date: 'Friday May 1, 2022',
    },
    {
      id: 3,
      title: 'iPhone 11 Green 64gb',
      subtitle: 'Order #123456',
      label: 'Pending',
      date: 'Friday May 1, 2022',
    },
    {
      id: 4,
      title: 'iPhone 11 Green 64gb',
      subtitle: 'Order #123456',
      label: 'Active',
      date: 'Friday May 1, 2022',
    },
    {
      id: 5,
      title: 'iPhone 11 Green 64gb',
      subtitle: 'Order #123456',
      label: 'Pending',
      date: 'Friday May 1, 2022',
    },
    {
      id: 6,
      title: 'iPhone 11 Green 64gb',
      subtitle: 'Order #123456',
      label: 'Active',
      date: 'Friday May 1, 2022',
    },
    {
      id: 7,
      title: 'iPhone 11 Green 64gb',
      subtitle: 'Order #123456',
      label: 'Active',
      date: 'Friday May 1, 2022',
    },
    {
      id: 8,
      title: 'iPhone 11 Green 64gb',
      subtitle: 'Order #123456',
      label: 'Pending',
      date: 'Friday May 1, 2022',
    },
    {
      id: 9,
      title: 'iPhone 11 Green 64gb',
      subtitle: 'Order #123456',
      label: 'Pending',
      date: 'Friday May 1, 2022',
    },
    {
      id: 10,
      title: 'iPhone 11 Green 64gb',
      subtitle: 'Order #123456',
      label: 'Active',
      date: 'Friday May 1, 2022',
    },
  ];

  if (loading) {
    return <ActivityIndicator visible={loading} />;
  }

  return (
    <View style={styles.list}>
      {orders.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('orderDetails')}
            >
              <OpenItems
                labelColor={
                  item.label === 'Active' ? Colors.primary : Colors.pending
                }
                label={item.label}
                title={item.title}
                subTitle={item.subtitle}
                date={item.date}
              />
            </TouchableOpacity>
          )}
        />
      ) : (
        <MeidumText
          style={{
            fontSize: 20,
            paddingHorizontal: 20,
            paddingVertical: 5,
            textAlign: 'center',
          }}
          text='No Open Orders yet'
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
    flex: 1,
    backgroundColor: Colors.light,
    paddingHorizontal: 10,
  },
});
