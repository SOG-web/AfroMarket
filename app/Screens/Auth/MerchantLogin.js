import jwtDecode from 'jwt-decode';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Screen from '../Screen';
import AppText, { MeidumText } from '../../Components/AppText';

import { OutlineBtn } from '../../Components/AppBtn';
import Colors from '../../Config/Colors';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AppFormField from '../../Components/Forms/AppFormField';
import SubmitButton from '../../Components/Submit';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import ErrorMessage from '../../Components/ErrorMessage';

import UseAuth from '../../Context/UseAuth';
import ActivityIndicator from '../../Components/ActivityIndicator';
import { base_url } from '../../Constants/api';

const ValidationSchema = Yup.object({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required('Password field is required'),
});

const apiEndpoint = base_url;
export default function MerchantLogin({ navigation }) {
  const auth = UseAuth();
  const [visible, setVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  if (errorMsg === true) {
    setTimeout(() => {
      setErrorMsg(false);
    }, 3000);
  }
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${apiEndpoint}/afro-market/v1/merchant/login`,
        values
      );
      if (data.status !== 'success') {
        return setErrorMsg(true);
      }
      auth.logIn(data.data.accesstoken);
      setLoading(false);
    } catch (error) {
      return setErrorMsg(true);
    }
  };
  return (
    <Screen>
      <ActivityIndicator visible={loading} />
      <Formik
        validationSchema={ValidationSchema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={handleSubmit}
      >
        <ScrollView>
          <View style={styles.container}>
            <MeidumText text='Welcome Back Merchant!' />
            <AppText text="Let's pick up where you left off" />

            <View style={styles.form}>
              <ErrorMessage
                visible={errorMsg}
                error='Invalid email or password'
              />
              <AppFormField
                name='email'
                placeholder='Email Address'
                keyboardType='email-address'
              />
              <View>
                <MaterialCommunityIcons
                  name={!visible ? 'eye' : 'eye-off'}
                  color={Colors.dark_light}
                  size={30}
                  style={styles.passEye}
                  onPress={() => setVisible((prevState) => !prevState)}
                />

                <AppFormField
                  multiline={false}
                  autoCorrect={false}
                  autoCapitalize='none'
                  spellCheck={false}
                  placeholder='Password'
                  secureTextEntry={!visible}
                  name='password'
                />
              </View>
              <TouchableOpacity style={styles.forgot}>
                <Text
                  style={{
                    fontWeight: '500',
                    fontFamily: 'lato-bold',
                    fontSize: 15,
                  }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnContainer}>
              <SubmitButton
                title='Login'
                color={Colors.primary}
                style={styles.btn}
              />
            </View>
          </View>
          <View style={styles.footer}>
            <AppText
              text='Are you new here?'
              style={{ fontSize: 18, marginBottom: 5 }}
            />
            <TouchableOpacity onPress={() => navigation.navigate('merchant')}>
              <AppText
                text='Create Merchant account'
                style={{
                  fontSize: 18,
                  color: Colors.primary,
                  fontWeight: '700',
                }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  forgot: {
    right: -200,
  },
  container: {
    mtop: 500,
    width: '100%',
    padding: 20,
    flex: 1,
  },
  form: {
    paddingTop: 60,
  },
  btn: {
    marginBottom: 30,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -150,
    marginBottom: 90,
  },
  passEye: {
    position: 'absolute',
    right: 10,
    zIndex: 10,
    top: 25,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    bottom: -20,
    // position: "absolute",
  },
});
