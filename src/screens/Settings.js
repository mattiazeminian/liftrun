import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from 'react-native';

import Colors from '../variables/colors';
import Spacing from '../variables/spacing';
import Typography from '../variables/typography';
import Borders from '../variables/borders';
import Shadows from '../variables/shadows';

import Navigation from '../components/navigation';
import SettingsItem from '../components/settingsitem';
import Button from '../components/button';
import InputOptionBottomsheet from '../components/inputbottomsheet';

import ArrowLeftIcon from '../icons/arrowleft';
import IdIcon from '../icons/idicon';
import CalendarIcon from '../icons/calendaricon';
import TrainIcon from '../icons/trainicon';
import EquipmentIcon from '../icons/equipmenticon';
import FitnessLevelIcon from '../icons/fitnesslevelicon';
import AwardIcon from '../icons/awardicon';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CLOSE_DISTANCE = 100; // px drag threshold to close

export default function SettingsScreen({ navigation }) {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  // BottomSheet animated values and state
  const translateY = React.useRef(new Animated.Value(300)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;
  const [isRendered, setIsRendered] = React.useState(false);

  // Pan responder for drag to close
  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 5,
      onPanResponderGrant: () => {
        translateY.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > CLOSE_DISTANCE) {
          closeBottomSheet();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  // Open BottomSheet with animation
  const openBottomSheet = () => {
    setIsRendered(true);
    translateY.setValue(300);
    opacity.setValue(0);
    setBottomSheetOpen(true);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Close BottomSheet with animation
  const closeBottomSheet = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsRendered(false);
      setBottomSheetOpen(false);
    });
  };

  return (
    <View style={styles.container}>
      {/* Navigation */}
      <Navigation
        leftContent={<ArrowLeftIcon />}
        onLeftClick={() => navigation.goBack()}
        showCenter={true}
        centerContent={
          <Image
            source={require('../assets/images/logo_text.png')}
            style={{ width: 270, height: 40, resizeMode: 'contain' }}
          />
        }
      />

      {/* Fixed content */}
      <View style={styles.content}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Hi [user name]!</Text>
          <Text style={styles.heroDescription}>
            You started this plan on 17/05/2024
          </Text>
          <Text style={styles.heroDescription}>That was 234 days ago</Text>
        </View>

        {/* Items container */}
        <View style={styles.itemsContainer}>
          <SettingsItem
            label="Personal data"
            icon={<IdIcon />}
            onPress={() => navigation.navigate('PersonalDataSettings')}
          />
          <SettingsItem
            label="Fitness goal"
            icon={<AwardIcon />}
            onPress={() => navigation.navigate('FitnessGoalSettings')}
          />
          <SettingsItem
            label="Type of training"
            icon={<TrainIcon />}
            onPress={() => navigation.navigate('TypeofTrainingSettings')}
          />
          <SettingsItem
            label="Schedule"
            icon={<CalendarIcon />}
            onPress={() => navigation.navigate('ScheduleSettings')}
          />
          <SettingsItem
            label="Equipment"
            icon={<EquipmentIcon />}
            onPress={() => navigation.navigate('EquipmentSettings')}
          />
          <SettingsItem
            label="Fitness level"
            icon={<FitnessLevelIcon />}
            onPress={() => navigation.navigate('FitnessLevelSettings')}
          />
        </View>

        {/* Bottom button */}
        <View style={styles.buttonContainer}>
          <Button
            variant="primary"
            style={styles.button}
            onPress={openBottomSheet}
          >
            Create a new plan 🚀{' '}
          </Button>
        </View>
      </View>

      {/* BottomSheet */}
      {isRendered && (
        <>
          <TouchableWithoutFeedback onPress={closeBottomSheet}>
            <Animated.View style={[styles.overlay, { opacity }]} />
          </TouchableWithoutFeedback>

          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.bottomSheet,
              { transform: [{ translateY }], opacity, width: SCREEN_WIDTH },
            ]}
          >
            <View style={styles.handleWrapper}>
              <View style={styles.handleBar} />
            </View>

            <Text style={styles.title}>
              Are you sure you want to create a new plan? This will overwrite
              the current one.
            </Text>

            <View style={styles.childrenList}>
              <Button
                variant="primary"
                style={{ marginBottom: Spacing.sm }}
                onPress={() => {
                  closeBottomSheet();
                  // handle primary option action here
                }}
              >
                CONFIRM 🚀{' '}
              </Button>
              <Button
                variant="secondary"
                onPress={() => {
                  closeBottomSheet();
                  // handle secondary option action here
                }}
              >
                DISMISS
              </Button>
            </View>
          </Animated.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hero: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: Spacing.m,
    width: '100%',
    paddingBottom: Spacing.xxl,
  },
  heroTitle: {
    color: Colors.darkBlue,
    ...Typography.robotoSerif.mdRegular,
  },
  heroDescription: {
    color: Colors.darkBlue,
    textAlign: 'left',
    ...Typography.manrope.smRegular,
  },
  itemsContainer: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: Spacing.xl,
  },
  button: {
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Borders.radius.xl,
    borderTopRightRadius: Borders.radius.xl,
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: Spacing.md,
    ...Shadows.lg,
    zIndex: 1000,
  },
  handleWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  handleBar: {
    width: 32,
    height: 4,
    borderRadius: Borders.radius.round,
    backgroundColor: Colors.darkBlue,
  },
  title: {
    width: '100%',
    textAlign: 'left',
    ...Typography.manrope.lg,
    color: Colors.darkBlue,
  },
  childrenList: {
    width: '100%',
    flexDirection: 'column',
    gap: Spacing.sm,
  },
});
