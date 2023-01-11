import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProductItems } from '../../Components/OpenItems';
import Screen from '../Screen';
import Colors from '../../Config/Colors';
import axios from 'axios';
import { base_url } from '../../Constants/api';
import * as SecureStore from 'expo-secure-store';
import ActivityIndicator from '../../Components/ActivityIndicator';
import { MeidumText } from '../../Components/AppText';

const key = 'authToken';

const token = SecureStore.getItemAsync(key);

export default function OtherProduct() {
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const HandleFetch = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${base_url}/afro-market/v1/product/get-all?limit=10&page=1`,
        {
          headers: {
            Authorization: `Bearer ${token['_3']}`,
          },
        }
      );
      setMyProducts(data.data.products.data.rows);
      setLoading(false);
      console.log(data.data.products.data.rows);
    };
    HandleFetch();
    console.log(myProducts);
  }, []);

  if (loading) {
    return <ActivityIndicator visible={loading} />;
  }

  const Products = [
    {
      id: 2,
      title: 'iPhone 11 Green 64gb',
      label: 'Mobile Phones',
      price: 450000,
    },
    {
      id: 3,
      title: 'iPhone 11 Green 64gb',
      label: 'Pending',
      price: 450000,
    },
    {
      id: 4,
      title: 'iPhone 11 Green 64gb',
      label: 'Mobile Phones',
      price: 450000,
    },
    {
      id: 5,
      title: 'iPhone 11 Green 64gb',
      label: 'Pending',
      price: 450000,
    },
    {
      id: 6,
      title: 'iPhone 11 Green 64gb',
      label: 'Mobile Phones',
      price: 450000,
    },
    {
      id: 7,
      title: 'iPhone 11 Green 64gb',

      label: 'Active',
      price: 450000,
    },
    {
      id: 8,
      title: 'iPhone 11 Green 64gb',

      label: 'Pending',
      price: 450000,
    },
    {
      id: 9,
      title: 'iPhone 11 Green 64gb',

      label: 'Pending',
      date: 'Friday May 1, 2022',
    },
    {
      id: 10,
      title: 'iPhone 11 Green 64gb',

      label: 'Mobile Phones',
      price: 450000,
    },
  ];

  if (loading) {
    return <ActivityIndicator visible={loading} />;
  }

  return (
    <>
      <View style={styles.main}>
        {myProducts.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={myProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductItems
                title={item.name}
                subTitle={item.price}
                label={item.category}
                imgSrc={item.images[0]}
                img
              />
            )}
          />
        ) : (
          <MeidumText
            style={{
              fontSize: 20,
              paddingHorizontal: 20,
              paddingVertical: 5,
            }}
            text='No Products yet'
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 10,
    flex: 1,
    backgroundColor: Colors.light,
  },
});
