import React from 'react';
import { View } from 'react-native';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import { COLORS, SIZES } from '../../constants/theme';

const DateSelector = () => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
  const currentDate = new Date();

  return (
    <ViewAtom fd="column" mb={SIZES.padding * 2}>
      <TextAtom
        text={`Today · ${currentDate.toLocaleString('default', { month: 'long' })}, ${currentDate.getFullYear()}`}
        c={COLORS.lightGray}
        f="Poppins1"
        s={SIZES.body3}
        mb={SIZES.padding}
      />
      <ViewAtom fd="row" jc="space-between">
        {weekDays.map((day, index) => (
          <ViewAtom
            key={index}
            bg={index === 0 ? COLORS.white : COLORS.mistyGray}
            br={SIZES.h3}
            pv={SIZES.padding}
            ph={SIZES.padding * 1.5}
            ai="center"
            mh={2}
          >
            <TextAtom
              text={day}
              c={index === 0 ? COLORS.darkGray : COLORS.mistyLGray}
              f="Poppins1"
              s={SIZES.body3}
              mb={-SIZES.base}
            />
            <TextAtom
              text={(currentDate.getDate() + index).toString()}
              c={index === 0 ? COLORS.darkGray : COLORS.white}
              f="Poppins2"
              s={SIZES.body3}
            />
          </ViewAtom>
        ))}
      </ViewAtom>
    </ViewAtom>
  );
};

export default DateSelector;