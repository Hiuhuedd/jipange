import React from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import { Feather } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';

const PlaceholderComponent = ({ onOpen }) => {
  return (
    <View style={{ transform: [{ scale: 0.9 }] }}>
      <ViewAtom fd="row" mv={SIZES.body3} jc="space-between">
        <TouchableOpacity onPress={onOpen}>
          <ViewAtom ai="center" jc="center" mr={SIZES.h3}>
            <ViewAtom ai="center" jc="center" bg={COLORS.mistyGray} br={SIZES.h4} h={300} ph={SIZES.base}>
              <Feather name="plus" size={SIZES.h2} color={COLORS.white} onPress={onOpen} />
            </ViewAtom>
          </ViewAtom>
        </TouchableOpacity>
        
        <ImageBackground
          source={require('../../assets/card.jpg')}
          style={{
            width: '95%',
            height: 300,
          }}
          imageStyle={{ borderRadius: SIZES.body1 }}
        >
          <ViewAtom bg="transparent" br={SIZES.body1} pv={SIZES.padding * 2} ph={SIZES.padding} mh={0}>
            <ViewAtom fd="row" jc="space-between" ai="center" mb={SIZES.padding}>
              <ViewAtom ph={SIZES.base} pv={4} br={SIZES.base} bg={COLORS.mistyGray}>
              </ViewAtom>
            </ViewAtom>
            <ViewAtom fd="row" jc="space-between" ai="center" mv={20}>
            </ViewAtom>
            <ViewAtom fd="column" w="60%" mv={20}>
              <TextAtom text={"Lets create Your Goals"} c={COLORS.black} f="Poppins" s={SIZES.h0} mb={SIZES.padding} />
              <Feather name="corner-down-left" size={SIZES.h2} color={COLORS.black} onPress={onOpen} />
            </ViewAtom>
            <ViewAtom fd="row" jc="space-between" ai="center">
            </ViewAtom>
          </ViewAtom>
        </ImageBackground>
      </ViewAtom>
    </View>
  );
};

export default PlaceholderComponent;