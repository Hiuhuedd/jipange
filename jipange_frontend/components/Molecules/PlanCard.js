// components/PlanCard.js
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, Animated, ImageBackground, StyleSheet } from 'react-native';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import { Feather } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import { ProgressBar } from 'react-native-paper';
import { fetchTask, removeGoal } from '../../utils/apiCalls';

const PLAN_ITEM_SIZE = SIZES.width * 0.9;

const PlanCard = ({ item, index, scrollX, onOpen, navigation, handleDelete }) => {
  const [progress, setProgress] = useState(0);

  const inputRange = [
    (index - 1) * PLAN_ITEM_SIZE,
    index * PLAN_ITEM_SIZE,
    (index + 1) * PLAN_ITEM_SIZE,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
    extrapolate: 'clamp',
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.9, 1, 0.7],
    extrapolate: 'clamp',
  });

  const dateString = item.createdAt;
  const date = new Date(dateString);
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await fetchTask(item._id);
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        if (totalTasks > 0) {
          setProgress(completedTasks / totalTasks);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [item._id]);

  return (
    <>
      {item._id === '0' ? (
        <TouchableOpacity onPress={onOpen}>
          <ViewAtom ai="center" jc="center" h="100%" mr={-20}>
            <ViewAtom ai="center" jc="center" bg={COLORS.mistyGray} br={SIZES.h5} pv={SIZES.padding * 1.5} ph={SIZES.base} h="80%">
              <Feather name="plus" size={SIZES.icon} color={COLORS.white} onPress={onOpen} />
            </ViewAtom>
          </ViewAtom>
        </TouchableOpacity>
      ) : (
        <Animated.View
          style={{
            width: PLAN_ITEM_SIZE,
            transform: [{ scale }],
            opacity,
            height: '100%',
          }}
        >
          <TouchableOpacity 
            onPress={() => navigation.navigate('GoalsScreen', { goalId: item._id })} 
            activeOpacity={0.8}
          >
            <ImageBackground
              source={require('../../assets/card.jpg')}
              style={{ width: '100%', height: '100%' }}
              imageStyle={{ borderRadius: SIZES.body1 }}
            >
              <ViewAtom bg="transparent" br={SIZES.body1} pv={SIZES.padding * 2} ph={SIZES.padding} mh={0} h="80%">
                <ViewAtom fd="row" jc="space-between" ai="center" mb={SIZES.padding}>
                  <ViewAtom ph={SIZES.base} pv={4} br={SIZES.base} bg={COLORS.mistyGray}>
                    <TextAtom text={formattedTime} c={COLORS.black} f="Poppins1" s={SIZES.body4} />
                  </ViewAtom>
                  <TouchableOpacity onPress={() => handleDelete(item._id)} style={{ padding: 10, backgroundColor: COLORS.white, borderRadius: 10 }}>
                    <Feather name="trash" size={SIZES.icon} color={COLORS.black} />
                  </TouchableOpacity>
                </ViewAtom>
                <ViewAtom fd="row" jc="space-between" ai="center" mv={20} />
                <ViewAtom fd="row" jc="space-between" ai="center" mv={40}>
                  <TextAtom text={item.title} c={COLORS.black} f="Poppins" s={SIZES.h0} mb={SIZES.padding} />
                </ViewAtom>
                <ProgressBar progress={progress} color={COLORS.accentBlue} style={styles.progressBar} />
                <ViewAtom fd="row" jc="space-between" ai="center" pv={SIZES.padding}>
                  <TextAtom text="Progress" c={COLORS.darkGray} f="Poppins1" s={SIZES.h4} />
                  <TextAtom text={`${Math.floor(progress * 100)}%`} c={COLORS.darkGray} f="Poppins1" s={SIZES.h4} />
                </ViewAtom>
              </ViewAtom>
            </ImageBackground>
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: '100%',
    height: 2.5,
    borderRadius: 4,
    backgroundColor: COLORS.lightGray,
    marginTop: SIZES.padding,
  },
});

export default PlanCard;
