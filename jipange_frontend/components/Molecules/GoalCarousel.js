// components/GoalCarousel.js
import React from 'react';
import { Animated, FlatList } from 'react-native';
import GoalCard from './GoalCard'; // Update the import path if needed
import { SIZES } from '../../constants/theme';

const PLAN_ITEM_SIZE = SIZES.width * 0.85;
const GoalCarousel = ({ plans, scrollX }) => {
  return (
    <Animated.FlatList
      data={plans}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={PLAN_ITEM_SIZE}
      decelerationRate="fast"
      contentContainerStyle={{
        paddingHorizontal: (SIZES.padding / 2),
        height: 350,
      }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false } // Set to false for debugging, switch to true if everything works
      )}
      renderItem={({ item, index }) => (
        <GoalCard item={item} index={index} scrollX={scrollX} />
      )}
    />
  );
};


export default GoalCarousel;
