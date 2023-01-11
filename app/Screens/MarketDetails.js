import { FlatList, StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import Colors from '../Config/Colors';
import { OutlineBtn } from '../Components/AppBtn';
import AppText, { BoldText, MeidumText } from '../Components/AppText';
import Card from '../Components/Card';
import axios from 'axios';
import ActivityIndicator from '../Components/ActivityIndicator';
import { base_url } from '../Constants/api';
import * as SecureStore from 'expo-secure-store';

const key = 'authToken';

const token = SecureStore.getItemAsync(key);

export default function MarketDetails({ navigation, route }) {
  const { id, other } = route.params;
  const [topProducts, setTopProducts] = useState([]);
  const [curentMerchant, setCurrentMerchant] = useState({});
  const [curentMerchantDet, setCurrentMerchantDet] = useState({});
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const apiEndpoint = base_url;

  useEffect(() => {
    setLoading(true);
    const getCurrentMerchant = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${apiEndpoint}/afro-market/v1/merchant/view/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token['_3']}`,
          },
        }
      );
      setCurrentMerchant(data.data, 'current Merchant');
      setCurrentMerchantDet(data.data.merchant, 'current Merchant');
    };

    const getMerchantProducts = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${apiEndpoint}/afro-market/v1/product/by-merchant/${id}?limit=10&page=1`,
        {
          headers: {
            Authorization: `Bearer ${token['_3']}`,
          },
        }
      );
      setTopProducts(data.data.products.data.rows);
      setLoading(false);
    };

    const getMerchantReview = async () => {
      console.log(id);
      console.log(token['_3']);
      setLoading(true);
      const { data } = await axios.get(
        `${apiEndpoint}/afro-market/v1/review/merchant/${id}?limit=10&page=1`,
        {
          headers: {
            Authorization: `Bearer ${token['_3']}`,
          },
        }
      );
      console.log(data.data.reviews.data, 'reviews');
      setReviews(data.data.reviews.data.rows);
      setLoading(false);
    };
    getCurrentMerchant();
    getMerchantProducts();
    getMerchantReview();
  }, []);

  if (loading) {
    return <ActivityIndicator visible={loading} />;
  }

  return (
    <>
      <View style={styles.list}>
        <FlatList
          ListHeaderComponent={
            <>
              <Card
                address={' ' + curentMerchantDet.address}
                numReviews={`${curentMerchant.no_of_reviews}`}
                rating={curentMerchantDet.ratings}
                title={curentMerchantDet.business_name}
                img={curentMerchantDet.brand_image}
                style={{
                  backgroundColor: Colors.light,
                  padding: 10,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              />
              {topProducts.length > 0 ? (
                <MeidumText
                  style={{
                    fontSize: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                  }}
                  text='Top Products'
                />
              ) : (
                <MeidumText
                  style={{
                    fontSize: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    textAlign: 'center',
                  }}
                  text='No Product Available'
                />
              )}
            </>
          }
          numColumns={2}
          data={topProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              handlePress={() =>
                navigation.navigate('productDetails', { id: item.id })
              }
              img={item.images[0]}
              price={item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              title={item.name}
            />
          )}
          ListFooterComponent={
            <>
              {topProducts.length > 0 ? (
                <OutlineBtn
                  style={{
                    alignSelf: 'center',
                    width: '90%',
                    padding: 10,
                  }}
                  title='View All Products'
                  color={Colors.primary}
                />
              ) : null}

              <View style={styles.rating}>
                {reviews.length > 0 ? (
                  <>
                    <View style={styles.ratingTxt}>
                      <MeidumText text='Ratings & Reviews' />
                      <AppText text='View All' />
                    </View>
                    <FlatList
                      data={reviews}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        <View style={{ paddingVertical: 10 }}>
                          <AppText text={item.text} />
                          {/* <MeidumText
                  text={item.customer}
                  style={{ fontSize: 16, paddingTop: 5 }}
                /> */}
                        </View>
                      )}
                    />
                  </>
                ) : (
                  <MeidumText
                    style={{
                      fontSize: 20,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      textAlign: 'center',
                    }}
                    text='No Ratings & Reviews yet'
                  />
                )}
              </View>

              <View style={styles.footer}>
                <OutlineBtn
                  title='Contact Merchant'
                  color={Colors.white}
                  style={{ backgroundColor: Colors.primary, width: '49%' }}
                  iconFam='chatbox-ellipses-outline'
                  iconColor={Colors.white}
                />
                <OutlineBtn
                  title='Add to Customers'
                  color={Colors.white}
                  style={{ backgroundColor: Colors.primary, width: '49%' }}
                  icon='staro'
                  iconColor={Colors.white}
                />
              </View>
            </>
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    flex: 1,
    backgroundColor: Colors.light,
  },
  rating: {
    padding: 20,
  },
  ratingTxt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});
