// TaskItem.js
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import { COLORS, SIZES } from '../../constants/theme';
import { Feather } from '@expo/vector-icons';

const TaskItem = ({ task, handleTaskTap, handleDelete, index }) => {
  const dateString = task.createdAt;
  const date = new Date(dateString);
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <TouchableOpacity key={task._id} onPress={() => handleTaskTap(task)}>
      <ViewAtom
        fd="column"
        w="60%"
        ph={SIZES.base}
        pv={SIZES.base - 3}
        br={SIZES.h3}
        mv={SIZES.padding}
        bg={task.completed ? COLORS.accentRed : COLORS.mistyGray}
        as={index % 2 === 0 ? 'flex-start' : 'flex-end'}
      >
        <ViewAtom ph={SIZES.base} pv={4} br={SIZES.base} bg={COLORS.mistyGray} w="30%">
          <TextAtom text={formattedTime} c={COLORS.white} f="Poppins1" s={SIZES.h6} />
        </ViewAtom>
        <TextAtom
          text={task.title}
          c={COLORS.white}
          f={task.completed ? 'Poppins' : 'PoppinsL'}
          s={SIZES.h2}
          completed={task.completed}
        />
        <ViewAtom fd="row" jc="space-between" ai="center" as="flex-end" mb={SIZES.padding}>
          <TouchableOpacity onPress={() => handleDelete(task._id)} style={styles.deleteButton}>
            <Feather name="trash" size={SIZES.h5 - 2} color={COLORS.black} />
          </TouchableOpacity>
        </ViewAtom>
      </ViewAtom>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    padding: SIZES.base - 4,
    backgroundColor: COLORS.white,
    borderRadius: 50,
  },
});

export default TaskItem;
