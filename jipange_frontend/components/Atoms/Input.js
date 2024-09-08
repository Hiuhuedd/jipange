import React, { useRef, useState, useEffect } from 'react';
import { TextInput ,ActivityIndicator} from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const MyInput = ({ editable, keyboardType, secureTextEntry, style, placeholder, maxLength, label, isUpdated, setisUpdated, handleFocus, amount }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    // Update the text when the amount prop changes
    if (amount !== undefined) {
      setText(amount);
      setisUpdated(amount);
    }
  }, [amount, setisUpdated]);

  const handleChange = (value) => {
    // Update the text state and notify the parent component
    setText(value);
    setisUpdated(value);
  };

  return (
    <TextInput 
      autoFocus={editable}
      value={text}
      onChangeText={(v) => handleChange(v)}
      placeholder={placeholder}
      placeholderTextColor={COLORS.gray2}
      keyboardType={keyboardType}
      textContentType="none"
      secureTextEntry={secureTextEntry}
      autoCompleteType="off"
      autoCapitalize="sentences"
      maxLength={maxLength}
      editable={editable}
      style={style}
      // onFocus={handleFocus}
    />
  );
};

export default MyInput;
