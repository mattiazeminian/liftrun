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
import BodyweightRow from '../../components/exerciserow/bodyweightrow';

export default function Bodyweight() {
  // State to control title editing and its value
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('Strength Exercise');
  const [tempTitle, setTempTitle] = useState(title);
  const inputRef = useRef(null);

  // Rows of sets with id and reps (minutes)
  const [rows, setRows] = useState([
    { id: 1, reps: 8 },
    { id: 2, reps: 7 },
  ]);

  // Start title editing mode and focus input
  const startEditing = () => {
    setTempTitle(title);
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Save title changes or cancel editing
  const handleCloseOrSave = () => {
    if (tempTitle !== title) setTitle(tempTitle);
    setEditing(false);
    Keyboard.dismiss();
  };

  // Add a new set with default reps = 0 and unique id
  const handleAddRow = () => {
    const newId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 1;
    setRows(prev => [...prev, { id: newId, reps: 0 }]);
  };

  // Update reps value of a set by id
  const handleRowChange = (id, value) => {
    setRows(prev =>
      prev.map(row =>
        row.id === id ? { ...row, reps: value } : row
      )
    );
  };

  // Delete a set with haptic feedback
  const handleDeleteRow = id => {
    setRows(prevRows => prevRows.filter(row => row.id !== id));
    ReactNativeHapticFeedback.trigger('notificationError', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
  };

  // Swipeable right action rendering (remove button)
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

    // Auto remove on drag beyond threshold
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
        <SmallButton
          style={{ marginLeft: 8 }}
          onPress={() => handleDeleteRow(id)}
          variant="danger"
        >
          <Text>Remove</Text>
        </SmallButton>
      </Animated.View>
    );
  };

  // Sort rows ascending by id for consistent order
  const sortedRows = [...rows].sort((a, b) => a.id - b.id);

  return (
    <View style={[styles.container, Shadows.lg]}>
      {/* Title bar with edit mode and buttons */}
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
              <Text>Delete</Text>
            </SmallButton>
          )}
          <SmallButton
            onPress={editing ? handleCloseOrSave : startEditing}
            variant={editing && tempTitle !== title ? 'active' : 'default'}
          >
            <Text>{editing ? (tempTitle !== title ? 'SAVE' : 'CLOSE') : 'Edit'}</Text>
          </SmallButton>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Table header */}
      <View style={styles.legend}>
        <View style={styles.setCol}>
          <Text style={styles.legendText}>Set</Text>
        </View>
        <View style={styles.repsCol}>
          <Text style={styles.legendText}>Reps</Text>
        </View>
        <View style={styles.iconContainer}>
          <RadioIcon width={16} height={16} />
        </View>
      </View>

      {/* List of sets */}
      <View style={styles.exercisesContainer}>
        {sortedRows.map((row, idx) => (
          <Swipeable
            key={row.id}
            renderRightActions={(progress, dragX) =>
              renderRightActions(progress, dragX, row.id)
            }
          >
            <BodyweightRow
              setNumber={idx + 1}                // Dynamic set number
              initialNumber={String(row.reps)}   // Pass reps as initialNumber
              onChangeValue={(val) => handleRowChange(row.id, val)}  // Update handler
            />
          </Swipeable>
        ))}
      </View>

      {/* Add new set button */}
      <SmallButton
        onPress={handleAddRow}
        variant="default"
        style={{ alignSelf: 'center', flexDirection: 'row' }}
      >
        <Text style={{ marginRight: 4 }}>+</Text>
        <Text>ADD</Text>
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
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    textAlign: 'left',
  },
  setCol: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  repsCol: {
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
});
