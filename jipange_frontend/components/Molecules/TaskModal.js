// components/TaskModal.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import ViewAtom from '../Atoms/ViewAtom';
import MyInput from '../Atoms/Input';
import { Button } from '../Atoms/Button';
import { COLORS, SIZES } from '../../constants/theme';
import TextAtom from '../Atoms/TextAtom';

const TaskModal = ({ modalizeRef, taskTitle, setTaskTitle, handleAddTask, loading }) => {
  return (
    <Modalize ref={modalizeRef} snapPoint={550} modalHeight={700}>
      <ViewAtom fd="column" pv={SIZES.padding * 2} ph={SIZES.padding * 2}>
        <TextAtom text="Add New Task" c={COLORS.accentBlue} f="Poppins2" s={SIZES.h2} mb={SIZES.padding} />
        <MyInput
          editable={true}
          keyboardType="default"
          secureTextEntry={false}
          style={styles.input}
          placeholder="Enter your task title"
          maxLength={25}
          value={taskTitle}
          setisUpdated={setTaskTitle}
          label=""
        />
        <Button
          text="Add Task"
          width="100%"
          pv={15}
          bg={COLORS.accentBlue}
          s={SIZES.h4}
          tc={COLORS.white}
          borderRadius={5}
          onMethodSelected={handleAddTask}
          loading={loading}
        />
      </ViewAtom>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    backgroundColor: '#ededed',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    color: COLORS.textPrimary,
  },
});

export default TaskModal;
