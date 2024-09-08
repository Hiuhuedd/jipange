// components/GoalModal.js
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import TextAtom from '../Atoms/TextAtom';
import MyInput from '../Atoms/Input';
import { Button } from '../Atoms/Button';
import { COLORS, SIZES } from '../../constants/theme';

const GoalModal = ({ modalizeRef, handleAddGoal, goalTitle, setGoalTitle, description, setDescription, deadline, setDeadline, priority, setPriority, loading }) => {
  return (
    <Modalize ref={modalizeRef} snapPoint={550} modalHeight={700}>
      <View style={styles.container}>
        <TextAtom text="Add New Goal" c={COLORS.accentBlue} f="Poppins" s={SIZES.h2} mb={SIZES.padding} />
        <View style={styles.form}>
          <TextAtom text="Goal Title" c={COLORS.textPrimary} f="Poppins1" s={SIZES.h5} w="500" />
          <MyInput
            editable={true}
            keyboardType="default"
            secureTextEntry={false}
            style={styles.input}
            placeholder="Enter your goal title"
            maxLength={20}
            value={goalTitle}
            setisUpdated={setGoalTitle}
            label={""}
          />

          <TextAtom text="Description" c={COLORS.textPrimary} f="Poppins1" s={SIZES.h5} w="500" />
          <MyInput
            editable={true}
            keyboardType="default"
            secureTextEntry={false}
            style={styles.input}
            placeholder="Describe your goal"
            maxLength={200}
            value={description}
            setisUpdated={setDescription}
            label={""}
          />

          <TextAtom text="Deadline" c={COLORS.textPrimary} f="Poppins1" s={SIZES.h5} w="500" />
          <MyInput
            editable={true}
            keyboardType="default"
            secureTextEntry={false}
            style={styles.input}
            placeholder="Enter the deadline (YYYY-MM-DD)"
            maxLength={10}
            value={deadline}
            setisUpdated={setDeadline}
            label={""}
          />

          <TextAtom text="Priority" c={COLORS.textPrimary} f="Poppins1" s={SIZES.h5} w="500" />
          <MyInput
            editable={true}
            keyboardType="default"
            secureTextEntry={false}
            style={styles.input}
            placeholder="Enter priority (High, Medium, Low)"
            maxLength={10}
            value={priority}
            setisUpdated={setPriority}
            label={""}
          />
        </View>
        <Button
          text="Add Goal"
          width="100%"
          pv={15}
          bg={COLORS.accentBlue}
          s={SIZES.h4}
          tc={COLORS.white}
          borderRadius={5}
          onMethodSelected={handleAddGoal}
          loading={loading}
        />
      </View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.padding * 2,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 45,
    backgroundColor: "#ededed",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "100%",
    color: COLORS.textPrimary,
  },
});

export default GoalModal;
