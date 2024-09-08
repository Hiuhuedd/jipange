import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ViewAtom from '../components/Atoms/ViewAtom';
import TextAtom from '../components/Atoms/TextAtom';
import { fetchGoal } from '../utils/apiCalls';
import { COLORS, SIZES } from '../constants/theme';

const API_KEY = 'bfXLA26/2012bIAYeD+3GA==HkVTLHFb6OYXJGXI'; // API key should be securely managed

export default function QuotesScreen({ navigation }) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  // Fetch a quote from the API
  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
        headers: { 'X-Api-Key': API_KEY },
      });
      setQuote(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setLoading(false); // Ensure loading state is turned off on error
    }
  };

  // Fetch goals and handle progress
  const handleFetchGoal = async () => {
    dispatch({
      type: 'FETCH_GOALS',
      payload: [{ _id: '0' }],
    });
    try {
      const user = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(user);
      const response = await fetchGoal(parsedUser.uid);

      dispatch({
        type: 'FETCH_GOALS',
        payload: [{ _id: '0' }, ...response],
      });
    } catch (error) {
      console.error('Failed to fetch goal:', error);
    } finally {
      setLoading(false); // Ensure loading state is turned off after fetching goals
    }
  };

  useEffect(() => {
    fetchQuote();
    handleFetchGoal();

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 1) {
          clearInterval(interval);
          navigation.navigate('HomeScreen'); // Navigate to HomeScreen after progress completes
          return 1;
        }
        return prev + 0.0067; // Increment progress for smoother animation
      });
    }, 100);

    return () => clearInterval(interval);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.white} />
      ) : (
        <ViewAtom mv={50}>
          <ProgressBar progress={progress} color={COLORS.white} style={styles.progressBar} />
          <ViewAtom mv={SIZES.padding * 8} bg={COLORS.accentBlue} />

          <TextAtom text={`" ${quote?.quote} "`} c={COLORS.white} f="Poppins" s={SIZES.h1} ls={-2} />
          <ViewAtom mv={SIZES.padding} as="flex-end">
            <TextAtom text={`~ ${quote?.author} `} c={COLORS.mistyLGray} f="Poppins" s={SIZES.h4} ls={0} />
          </ViewAtom>
        </ViewAtom>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
    padding: SIZES.padding * 2,
  },
  progressBar: {
    width: '100%',
    height: 2.5,
    borderRadius: 4,
    backgroundColor: COLORS.mistyLGray,
    marginTop: SIZES.padding * -2,
  },
});
