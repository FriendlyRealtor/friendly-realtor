import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Text, FormErrorMessage } from '../../components';
import axios from 'axios';
import { numberWithCommas } from '../../utils';
import { Formik, useFormik } from 'formik';
import { locationValidationSchema } from '../../utils';
import { Divider } from '@ui-kitten/components';
import { Button, Container } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Constants from 'expo-constants';
import _ from 'lodash';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config';
import { getAuth } from 'firebase/auth';
import { HomeScreenStyles } from './HomeScreenStyles';
import { StatusBar } from 'expo-status-bar';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export const HomeScreen = () => {
  const isFocused = useIsFocused();

  const styles = HomeScreenStyles;

  const [errorState, setErrorState] = useState('');
  const userAuth = getAuth();
  const [crmEstimate, setCrmEstimate] = useState(null);
  const { handleChange, values, setValues, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues: {
      location: '',
    },
    onSubmit: () => {
      getCrmValuation();
    },
  });

  const { location } = values;

  useEffect(() => {
    resetForm({
      values: {
        location: '',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const getCrmValuation = useCallback(
    () => {
      const regex = /[,#-\/\s\!\@\$.....]/gi; // regex to test if valid street address

      if (regex.test(location)) {
        axios({
          method: 'get',
          url: `${Constants.manifest?.extra?.serverUrl}/crm?location=${location}`,
        })
          .then(async (response) => {
            if (response.data) {
              const { value } = response.data;
              setCrmEstimate(value);

              if (value) {
                const { uid } = userAuth.currentUser;
                const docRef = await doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                  const data = docSnap.data();
                  let cmaEvaluations = [];
                  if (data.cmaEvaluations && _.size(data.cmaEvaluations) > 0) {
                    const concatEvalutions = data.cmaEvaluations.concat({
                      location: location,
                      price: value.price,
                      priceRangeLow: value.priceRangeLow,
                      priceRangeHigh: value.priceRangeHigh,
                    });

                    cmaEvaluations = _.uniqBy(concatEvalutions, 'location');
                  } else {
                    cmaEvaluations.push({
                      location: location,
                      price: value.price,
                      priceRangeLow: value.priceRangeLow,
                      priceRangeHigh: value.priceRangeHigh,
                    });
                  }

                  if (docRef) {
                    await updateDoc(docRef, { cmaEvaluations: cmaEvaluations });
                    setErrorState('');
                  }
                } else {
                  // doc.data() will be undefined in this case
                  console.log('No such document!');
                }
              }
            }
          })
          .catch((error) => {
            setErrorState(error.message);
          });
      } else {
        setErrorState('Invalid Street Address, Please Try Again.');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location, Constants.manifest?.extra?.serverUrl],
  );

  return (
    <Container style={styles.layout}>
      <StatusBar style="auto" />
      <KeyboardAwareScrollView style={styles.keyboard}>
        <Formik validationSchema={locationValidationSchema}>
          <View style={styles.card}>
            <View style={styles.crmHeader}>
              <Text category="h6">Get CRM Valuation on the go!</Text>
              <Text category="s1" status="info" style={styles.search}>
                Search for property by address.
              </Text>
            </View>
            <View style={styles.textArea}>
              <Text>
                A Comparative Market Analysis (CMA) is a crucial tool for real estate agents to
                accurately price and sell properties. The importance of a good CMA cannot be
                overstated, as it allows agents to provide their clients with a comprehensive
                understanding of the local real estate market and make informed decisions about
                buying or selling a property
              </Text>
              <GooglePlacesAutocomplete
                placeholder="Enter address you are interested in"
                onPress={(data, details = null) => {
                  setValues({ location: data.description });
                }}
                query={{
                  key: Constants.manifest?.extra?.googleApiKey,
                  language: 'en',
                }}
                styles={{
                  textInputContainer: {
                    paddingTop: 8,
                    marginTop: 16,
                    borderWidth: 1,
                    borderColor: 'black',
                  },
                  textInput: {
                    height: 38,
                    color: '#5d5d5d',
                    fontSize: 16,
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                }}
              />
              {errorState !== '' ? <FormErrorMessage error={errorState} visible={true} /> : null}
            </View>
            <View style={styles.footerContainer}>
              <Divider />
              <Button style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Get Valuation</Text>
              </Button>
              <Text style={styles.hintText} appearance="hint">
                Valuation is calculated by default 10 properties in the area.
              </Text>
            </View>
            {crmEstimate ? (
              <Container level="4" style={styles.layout}>
                <Text
                  style={styles.estimatedValue}
                  category="h6"
                >{`Estimated CMA value $${numberWithCommas(crmEstimate.price)}`}</Text>
                <Divider />
                <Text
                  style={styles.estimatedValue}
                  category="h6"
                >{`CMA Price Low $${numberWithCommas(crmEstimate.priceRangeLow)}`}</Text>
                <Divider />
                <Text
                  style={styles.estimatedValue}
                  category="h6"
                >{`CMA Price High $${numberWithCommas(crmEstimate.priceRangeHigh)}`}</Text>
              </Container>
            ) : null}

            {crmEstimate && crmEstimate.listings && _.size(crmEstimate.listings) && (
              <Container level="4" style={styles.layoutCrm}>
                <Text style={styles.comparables} category="h6">
                  10 Comparables
                </Text>
                {crmEstimate.listings.map((listing, idx) => {
                  const key = uuid.v4();
                  return (
                    <View key={key}>
                      <Text style={styles.formattedValue} category="h6">
                        {`${idx + 1}.) ${listing.formattedAddress}`}
                      </Text>
                      <Divider />
                      <View style={styles.estimateContainer}>
                        <Text
                          style={styles.estimatedValue}
                          appearance="hint"
                          status="info"
                          category="h6"
                        >{`Price $${numberWithCommas(listing.price)}`}</Text>
                        <View style={styles.iconFlex}>
                          <Icon style={styles.icon} name="bed" size={24} />
                          <Text status="info" appearance="hint">
                            {listing.bedrooms}
                          </Text>
                        </View>
                        <View style={styles.iconFlex}>
                          <Icon style={styles.icon} name="bath" size={24} />
                          <Text status="info" appearance="hint">
                            {listing.bathrooms}
                          </Text>
                        </View>
                      </View>
                      <Divider />
                    </View>
                  );
                })}
              </Container>
            )}
          </View>
        </Formik>
      </KeyboardAwareScrollView>
    </Container>
  );
};
