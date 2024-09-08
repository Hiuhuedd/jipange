import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ProgressBar } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Audio } from 'expo-av';
import ViewAtom from '../components/Atoms/ViewAtom';
import TextAtom from '../components/Atoms/TextAtom';
import LinearAtom from '../components/Atoms/LinearAtom';
import MyInput from '../components/Atoms/Input';
import { Button } from '../components/Atoms/Button';
import { Modalize } from 'react-native-modalize';
import TaskModal from '../components/Molecules/TaskModal';
import TaskItem from '../components/Molecules/TaskItem';
import { addTask, fetchTask, removeTask, updateTaskCompletion } from '../utils/apiCalls';
import { COLORS, SIZES } from '../constants/theme';

const DOUBLE_TAP_THRESHOLD = 300;

export default function GoalsScreen({ navigation, route }) {
  const { goalId } = route.params;
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const tasks = useSelector(state => state.userReducer.tasks);
  const goals = useSelector(state => state.userReducer.goals);
  const dispatch = useDispatch();
  const modalizeRef = useRef(null);
  let lastTap = null;

  const currentDate = new Date(); // Define currentDate here

  useEffect(() => {
    Toast.show({
      type: 'info',
      text1: 'Double-Tap Feature',
      text2: 'Double-tap a task to mark it as completed and track progress.',
      position: 'top',
      visibilityTime: 4000,
    });
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetchTask(goalId);
        dispatch({ type: 'UPDATE_TASKS', payload: response });
        calculateProgress();
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    const calculateProgress = () => {
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.completed).length;
      setProgress(totalTasks > 0 ? completedTasks / totalTasks : 0);
    };

    fetchTasks();
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, [goalId, tasks]);

  useEffect(() => {
    const goal = goals.find(goal => goal._id === goalId);
    setSelectedPlan(goal);
  }, [goalId, goals]);

  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };

  const handleAddTask = async () => {
    setLoading(true);
    try {
      const response = await addTask(taskTitle, selectedPlan._id);
      dispatch({ type: 'UPDATE_TASKS', payload: [...tasks, response] });
      modalizeRef.current?.close();
      setTaskTitle('');
    } catch (error) {
      console.error('Failed to add task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await removeTask(taskId);
      const updatedTasks = tasks.filter(t => t._id !== taskId);
      dispatch({ type: 'UPDATE_TASKS', payload: updatedTasks });
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleDoubleTap = async (task) => {
    const isCompleted = !task.completed;
    try {
      await updateTaskCompletion(task._id, isCompleted);
      const updatedTasks = tasks.map(t =>
        t._id === task._id ? { ...t, completed: isCompleted } : t
      );
      dispatch({ type: 'UPDATE_TASKS', payload: updatedTasks });
      if (isCompleted) {
        setConfetti(true);
        await playCompletionSound();
      }
    } catch (error) {
      console.error('Failed to update task completion:', error);
    }
  };

  const playCompletionSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/completion.mp3')
    );
    await sound.playAsync();
  };

  const handleTaskTap = (task) => {
    const now = Date.now();
    if (lastTap && now - lastTap < DOUBLE_TAP_THRESHOLD) {
      handleDoubleTap(task);
    } else {
      lastTap = now;
    }
  };

  const onOpen = () => modalizeRef.current?.open();

  return (
    <>
      <LinearAtom w="100%" pv={0} ph={0} bg={COLORS.white} br={0} mv={0} mh={0} el={0} sh='#000' colors={[COLORS.accentRed, COLORS.black]}>
        <ScrollView style={{ flex: 1 }}>
          <ViewAtom fd="column" pv={SIZES.padding * 4} ph={SIZES.padding * 2}>
            {selectedPlan && (
              <>
                <ViewAtom mv={SIZES.padding * 4}>
                  <TextAtom text={selectedPlan.title} c={COLORS.white} f="Poppins" s={SIZES.mediumTitle} ls={-2} />
                  <TextAtom
                    text={`Today · ${currentDate.toLocaleString('default', { month: 'long' })}, ${currentDate.getFullYear()}`}
                    c={COLORS.lightGray}
                    f="Poppins1"
                    s={SIZES.body3}
                    mb={SIZES.padding}
                  />
                  <ViewAtom fd="row" jc="space-between" ai="center" pv={SIZES.padding * 2}>
                    <TextAtom text="Progress" c={COLORS.white} f="Poppins1" s={SIZES.h4} />
                    <TextAtom text={`${Math.floor(progress * 100)}%`} c={COLORS.white} f="Poppins1" s={SIZES.h4} />
                  </ViewAtom>
                  <ProgressBar progress={progress} color={COLORS.white} style={styles.progressBar} />
                </ViewAtom>
                <ViewAtom
                  fd="column"
                  w="60%"
                  ph={SIZES.padding}
                  pv={SIZES.base - 3}
                  br={SIZES.padding}
                  bg={COLORS.mistyGray}
                  as={'flex-end'}
                >
                  <TouchableOpacity onPress={onOpen}>
                    <ViewAtom fd="column" jc="center" ai="center" mb={SIZES.padding}>
                      <TouchableOpacity onPress={onOpen} style={{ padding: SIZES.base, backgroundColor: COLORS.white, borderRadius: 50 }}>
                        <Feather name="plus" size={SIZES.h4} color={COLORS.black} />
                      </TouchableOpacity>
                      <TextAtom text="Add task" c={COLORS.white} f="Poppins" s={SIZES.h4} />
                    </ViewAtom>
                  </TouchableOpacity>
                </ViewAtom>
                {tasks?.map((task, index) => (
                  <TaskItem 
                    key={task._id} 
                    task={task} 
                    handleTaskTap={handleTaskTap} 
                    handleDelete={handleDelete} 
                    index={index} 
                  />
                ))}
              </>
            )}
          </ViewAtom>
        </ScrollView>
        <Toast />
        {confetti && (
          <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} fadeOut={true} />
        )}
        <TaskModal
          modalizeRef={modalizeRef}
          taskTitle={taskTitle}
          setTaskTitle={setTaskTitle}
          handleAddTask={handleAddTask}
          loading={loading}
        />
      </LinearAtom>
    </>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    width: '100%',
    height: 2.5,
    borderRadius: 4,
    backgroundColor: COLORS.mistyLGray,
    marginTop: SIZES.padding * -2,
  },
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
