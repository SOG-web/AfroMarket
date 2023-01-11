import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProductItems } from '../../Components/OpenItems';
import Colors from '../../Config/Colors';
import axios from 'axios';
import { base_url } from '../../Constants/api';
import * as SecureStore from 'expo-secure-store';
import ActivityIndicator from '../../Components/ActivityIndicator';
import { MeidumText } from '../../Components/AppText';

const key = 'authToken';

const token = SecureStore.getItemAsync(key);

export default function MyProduct() {
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const HandleFetch = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${base_url}/afro-market/v1/product/my-all?limit=10&page=1`,
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
            text='You have no Products'
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 10,
    // paddingTop: 10,
    flex: 1,
    backgroundColor: Colors.light,
  },
});
