import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Screen from '../Screen';
import AppText, { MeidumText } from '../../Components/AppText';
import Colors from '../../Config/Colors';
import AppFormField from '../../Components/Forms/AppFormField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ActivityIndicator from '../../Components/ActivityIndicator';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import SubmitButton from '../../Components/Submit';
import Details from './Details';
import { useNavigation } from '@react-navigation/native';
import ErrorMessage from '../../Components/ErrorMessage';
import { base_url } from '../../Constants/api';

const ValidationSchema = Yup.object({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required('Password field is required'),
  fullName: Yup.string().required('FullName field is required'),
  confirm_password: Yup.string().when('password', {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref('password')],
      'Both password need to be the same'
    ),
  }),
});
const apiEndpoint = `${base_url}/afro-market/v1/user/signup`;
export default function Register() {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [errorContext, setErrorContext] = useState(false);
  const [loading, setLoading] = useState(false);
  if (errorMsg) {
    setTimeout(() => {
      setErrorMsg(false);
    }, 2000);
  }
  const navigation = useNavigation();
  const handleSubmit = async (values) => {
    setLoading(true);
    delete values.confirm_password;
    try {
      const data = await axios.post(apiEndpoint, values);
      console.log(data.data);

      setLoading(false);
      if (data.data.status === 'success') {
        navigation.navigate('login');
      }
      alert(data.data.message);
    } catch (error) {
      console.log(error.message);
      setErrorMsg(true);
      setLoading(false);
      setErrorContext('Invalid user credential: Email already exist');
      return;
    }
  };

  if (loading) {
    return <ActivityIndicator visible={loading} />;
  }

  return (
    <Screen>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          confirm_password: '',
        }}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        <>
          <ScrollView style={styles.container}>
            <MeidumText text='Welcome' />
            <AppText text="Let's get you started" />

            <View style={styles.form}>
              <ErrorMessage visible={errorMsg} error={errorContext} />
              <AppFormField placeholder='Full Name' name='fullName' />
              <AppFormField
                placeholder='Email Address'
                name='email'
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
                  keyboardType={'default'}
                  autoCorrect={false}
                  autoCapitalize='none'
                  spellCheck={false}
                  placeholder='Create password'
                  secureTextEntry={!visible}
                  name='password'
                />
              </View>
              <View>
                <MaterialCommunityIcons
                  name={!visible1 ? 'eye' : 'eye-off'}
                  color={Colors.dark_light}
                  size={30}
                  style={styles.passEye}
                  onPress={() => setVisible1((prevState) => !prevState)}
                />
                <AppFormField
                  multiline={false}
                  keyboardType={'default'}
                  autoCorrect={false}
                  autoCapitalize='none'
                  spellCheck={false}
                  placeholder='Confirm password'
                  secureTextEntry={!visible1}
                  name='confirm_password'
                />
              </View>
            </View>
            <View style={{ padding: 30 }} />
            <View style={styles.footer}>
              <SubmitButton
                title='Continue'
                color={Colors.primary}
                style={styles.btn}
              />
              <AppText
                text='Already have an account?'
                style={{ fontSize: 18, marginBottom: 6 }}
              />
              <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <AppText
                  text='Login'
                  style={{
                    fontSize: 18,
                    color: Colors.primary,
                    fontWeight: '700',
                  }}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      </Formik>
    </Screen>
  );
}

export function RegisterUser({ navigation }) {
  const [data, setData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    country: '',
    state: '',
    phone_number: '',
    fullName: '',
  });
  const [currentStep, setCurrentStep] = useState(0);

  const makeRequest = (formData) => {
    console.log('Form Submitted', formData);
    navigation.navigate('appNav');
  };

  const handleNextStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (currentStep >= steps.length - 1) {
      makeRequest(newData);
      return;
    }

    setCurrentStep((prev) => prev + 1);
    console.log(currentStep);
  };
  const steps = [
    <Register handleNext={handleNextStep} data={data} />,
    <Details handleNext={handleNextStep} data={data} />,
  ];

  return <Screen>{steps[currentStep]}</Screen>;
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
    height: '100%',
  },
  passEye: {
    position: 'absolute',
    right: 10,
    zIndex: 10,
    top: 25,
  },
  form: {
    paddingTop: 60,
  },
  btn: {
    marginBottom: 30,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30,
  },
});
