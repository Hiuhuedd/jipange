// components/GoalCard.js
import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import { Feather } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';

const PLAN_ITEM_SIZE = SIZES.width * 0.85;

const GoalCard = ({ item, index, scrollX }) => {
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
    outputRange: [0.8, 1, 0.4],
    extrapolate: 'clamp',
  });

  return (
    <>
      {item.id === "0" ? (
        <ViewAtom ai="center" jc="center" h="100%">
          <ViewAtom ai="center" jc="center" bg={COLORS.mistyGray} br={SIZES.radius * 2} pv={SIZES.padding * 1.5} ph={SIZES.base} h="80%">
            <Feather name="plus" size={SIZES.icon} color={COLORS.white} />
          </ViewAtom>
        </ViewAtom>
      ) : (
        <Animated.View
          style={{
            width: PLAN_ITEM_SIZE,
            transform: [{ scale }],
            opacity,
            height: "100%",
          }}
        >
          <ViewAtom bg={item.color} br={SIZES.body1} pv={SIZES.padding * 2} ph={SIZES.padding * 2} mh={0} h="100%">
            <ViewAtom fd="row" jc="space-between" ai="center" mb={SIZES.padding}>
              <ViewAtom ph={SIZES.base} pv={4} br={SIZES.base} bg={COLORS.lightGray}>
                <TextAtom text={item.time} c={COLORS.black} f="Poppins1" s={SIZES.body4} />
              </ViewAtom>
              <TouchableOpacity style={{ padding: 10, backgroundColor: COLORS.white, borderRadius: 10 }}>
                <Feather name="arrow-up-right" size={SIZES.icon} color={COLORS.black} />
              </TouchableOpacity>
            </ViewAtom>
            <ViewAtom fd="row" jc="space-between" ai="center" mv={30}>
              {/* Additional content can be added here */}
            </ViewAtom>
            <ViewAtom fd="row" jc="space-between" ai="center" mv={40}>
              <TextAtom text={item.title} c={COLORS.white} f="Poppins2" s={SIZES.h1 + 5} mb={SIZES.padding} />
            </ViewAtom>
            <ViewAtom fd="row" jc="space-between" ai="center">
              <TextAtom text={item.progress} c={COLORS.white} f="Poppins" s={SIZES.body5} />
              <TextAtom text={item.duration} c={COLORS.white} f="Poppins" s={SIZES.body5} />
            </ViewAtom>
          </ViewAtom>
        </Animated.View>
      )}
    </>
  );
};

export default GoalCard;
