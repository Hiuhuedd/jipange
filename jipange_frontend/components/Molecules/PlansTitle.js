import React from 'react';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import { COLORS, SIZES } from '../../constants/theme';

const PlansTitle = ({ goalsCount }) => {
  return (
    <ViewAtom mv={SIZES.padding * 4}>
      <ViewAtom mv={SIZES.padding * -2}>
        <TextAtom text="Your" c={COLORS.white} f="Poppins" s={SIZES.largeTitle} ls={-3} />
      </ViewAtom>
      <ViewAtom mv={SIZES.padding * -2}>
        <TextAtom 
          text={`Goals(${goalsCount})`} 
          c={COLORS.white} 
          f="Poppins" 
          s={SIZES.largeTitle} 
          ls={-3} 
        />
      </ViewAtom>
    </ViewAtom>
  );
};

export default PlansTitle;