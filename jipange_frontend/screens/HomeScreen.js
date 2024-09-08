import * as React from 'react';
import { ScrollView, Animated, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import { Feather, Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ViewAtom from '../components/Atoms/ViewAtom';
import TextAtom from '../components/Atoms/TextAtom';
import LinearAtom from '../components/Atoms/LinearAtom';
import MyInput from '../components/Atoms/Input';
import PlanCard from '../components/Molecules/PlanCard';
import GoalModal from '../components/Molecules/GoalModal';
import DateSelector from '../components/Molecules/DateSelector';
import PlansTitle from '../components/Molecules/PlansTitle';
import PlaceholderComponent from '../components/Molecules/PlaceHolder';

import { COLORS, SIZES } from '../constants/theme';
import { addGoal, removeGoal } from '../utils/apiCalls';

const HomeScreen = ({ navigation }) => {
  const goals = useSelector(state => state.userReducer.goals);
  const [user, setUser] = React.useState('');
  const [goalTitle, setGoalTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [deadline, setDeadline] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const modalizeRef = React.useRef(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchUser = async () => {
      const user = await AsyncStorage.getItem('user');
      setUser(JSON.parse(user));
    };
    fetchUser();
  }, []);

  const handleDelete = async (goalId) => {
    try {
      await removeGoal(goalId);
      const updatedGoals = goals.filter(goal => goal._id !== goalId);
      dispatch({
        type: 'FETCH_GOALS',
        payload: updatedGoals,
      });
    } catch (error) {
      console.error('Failed to delete goal:', error);
    }
  };

  const handleAddGoal = async () => {
    setLoading(true);
    try {
      const response = await addGoal(goalTitle, description, deadline, priority, user.uid);
      dispatch({
        type: 'FETCH_GOALS',
        payload: [...goals, response],
      });
      modalizeRef.current?.close();
      setGoalTitle('');
      setDescription('');
      setDeadline('');
      setPriority('');
    } catch (error) {
      console.error('Failed to add goal:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
      <LinearAtom w="100%" bg={COLORS.white} colors={[COLORS.accentBlue, COLORS.black]}>
        <ScrollView style={styles.scrollView}>
          <ViewAtom fd="column" pv={SIZES.padding * 4} ph={SIZES.padding * 2}>
            {/* Header */}
            <ViewAtom fd="row" jc="space-between" ai="center" pv={SIZES.padding * 3}>
              <ViewAtom>
                <TextAtom text={`Hi ${user?.username}`} c={COLORS.white} f="Poppins1" s={SIZES.h2} />
                <TextAtom text="Let's organize your plans" c={COLORS.lightGray} f="Poppins" s={SIZES.body4} />
              </ViewAtom>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <TouchableOpacity onPress={openMenu} style={styles.menuAnchor}>
                    <Entypo name="grid" size={SIZES.h2} color={COLORS.white} />
                  </TouchableOpacity>
                }
              >
                <Menu.Item onPress={() => { /* Handle Edit User */ }} title="Edit User" />
                <Menu.Item onPress={() => {
                  navigation.navigate('Login');
                }} title="Log Out" />
                <Divider />
                <Menu.Item onPress={() => { /* Handle Other Actions */ }} title="Other Action" />
              </Menu>
            </ViewAtom>

            <PlansTitle goalsCount={goals.length-1} />
            <DateSelector />

            {goals.length === 1 ? (
              <PlaceholderComponent onOpen={() => modalizeRef.current?.open()} />
            ) : (
              <Animated.FlatList
                data={goals}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={0}
                decelerationRate="fast"
                contentContainerStyle={styles.flatListContent}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
                renderItem={({ item, index }) => (
                  <PlanCard item={item} index={index} scrollX={scrollX} onOpen={() => modalizeRef.current?.open()} navigation={navigation} handleDelete={handleDelete} />
                )}
              />
            )}
          </ViewAtom>
        </ScrollView>

        {/* Goal Modal */}
        <GoalModal
          modalizeRef={modalizeRef}
          handleAddGoal={handleAddGoal}
          goalTitle={goalTitle}
          setGoalTitle={setGoalTitle}
          description={description}
          setDescription={setDescription}
          deadline={deadline}
          setDeadline={setDeadline}
          priority={priority}
          setPriority={setPriority}
          loading={loading}
        />
      </LinearAtom>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 0,
    height: 350,
  },
  menuAnchor: {
    padding: SIZES.base,
    backgroundColor: COLORS.mistyGray,
    borderRadius: 50,
  },
});

export default HomeScreen;