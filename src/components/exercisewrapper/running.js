import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  Animated,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import Colors from '../../variables/colors';
import Typography from '../../variables/typography';
import Borders from '../../variables/borders';
import Shadows from '../../variables/shadows';
import Spacing from '../../variables/spacing';

import SmallButton from '../../components/buttonsmall';
import RadioIcon from '../../icons/radioicon';
import RunningRow from '../../components/exerciserow/runningrow';

export default function Running() {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('Running Exercise');
  const [tempTitle, setTempTitle] = useState(title);
  const inputRef = useRef(null);

  const [rows, setRows] = useState([
    { id: 1, distance: 5, mins: 30 },
    { id: 2, distance: 3, mins: 20 },
  ]);

  const startEditing = () => {
    setTempTitle(title);
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleCloseOrSave = () => {
    if (tempTitle !== title) setTitle(tempTitle);
    setEditing(false);
    Keyboard.dismiss();
  };

  const handleAddRow = () => {
    const newId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 1;
    setRows(prev => [...prev, { id: newId, distance: 0, mins: 0 }]);
  };

  const handleDeleteRow = id => {
    setRows(prevRows => prevRows.filter(row => row.id !== id));
    ReactNativeHapticFeedback.trigger('notificationError', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
  };

  const renderRightActions = (progress, dragX, id) => {
    const translateX = dragX.interpolate({
      inputRange: [-48, 0],
      outputRange: [0, 0],
      extrapolate: 'clamp',
    });

    const opacity = dragX.interpolate({
      inputRange: [-48, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    dragX.addListener(({ value }) => {
      if (value < -100) {
        handleDeleteRow(id);
      }
    });

    return (
      <Animated.View
        style={{
          justifyContent: 'center',
          marginVertical: Spacing.xs,
          transform: [{ translateX }],
          opacity,
        }}
      >
        <SmallButton onPress={() => handleDeleteRow(id)} variant="danger">
          Remove
        </SmallButton>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, Shadows.lg]}>
      <View style={styles.exerciseTitle}>
        {editing ? (
          <View style={styles.inputWrapper}>
            <TextInput
              ref={inputRef}
              value={tempTitle}
              onChangeText={setTempTitle}
              style={styles.input}
              maxLength={25}
              cursorColor={Colors.darkBlue}
              selectionColor={Colors.darkBlue}
            />
          </View>
        ) : (
          <Text style={styles.titleText}>{title}</Text>
        )}

        <View style={styles.buttonsRow}>
          {editing && (
            <SmallButton
              onPress={() => console.log('Remove pressed')}
              variant="danger"
              style={{ marginRight: 8 }}
            >
              Delete
            </SmallButton>
          )}
          <SmallButton
            onPress={editing ? handleCloseOrSave : startEditing}
            variant={editing && tempTitle !== title ? 'active' : 'default'}
          >
            {editing ? (tempTitle !== title ? 'SAVE' : 'CLOSE') : 'Edit'}
          </SmallButton>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.legend}>
        <View style={styles.km}>
          <Text style={styles.legendText}>Distance</Text>
        </View>
        <View style={styles.mins}>
          <Text style={styles.legendText}>Mins</Text>
        </View>
        <View style={styles.iconContainer}>
          <RadioIcon width={16} height={16} />
        </View>
      </View>

      <View style={styles.exercisesContainer}>
        {rows.map(row => (
          <Swipeable
            key={row.id}
            renderRightActions={(progress, dragX) =>
              renderRightActions(progress, dragX, row.id)
            }
          >
            <RunningRow initialNumber={String(row.distance)} showText={true} />
          </Swipeable>
        ))}
      </View>

      <SmallButton
        onPress={handleAddRow}
        variant="default"
        style={{ alignSelf: 'center', flexDirection: 'row' }}
      >
        <Text style={{ marginRight: 4 }}>+</Text>
        ADD
      </SmallButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: Borders.radius.xl,
    borderWidth: Borders.widths.thin,
    borderColor: Colors.grey200,
    backgroundColor: Colors.white,
  },
  exerciseTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  titleText: {
    ...Typography.googleSansCode.smRegular,
    fontSize: 14,
    lineHeight: 20,
    padding: 0,
  },
  inputWrapper: {
    height: 20,
    justifyContent: 'center',
    flexShrink: 1,
  },
  input: {
    ...Typography.googleSansCode.smRegular,
    fontSize: 14,
    lineHeight: 20,
    textTransform: 'uppercase',
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginVertical: 0,
    textAlignVertical: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: Colors.grey200,
    alignSelf: 'stretch',
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  legend: {
    display: 'flex',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  legendText: {
    ...Typography.googleSansCode.smRegular,
    color: Colors.grey600,
    textAlign: 'center',
  },
  km: {
    display: 'flex',
    width: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mins: {
    display: 'flex',
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exercisesContainer: {
    width: '100%',
    flexDirection: 'column',
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
