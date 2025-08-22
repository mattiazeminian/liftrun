import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
} from 'react-native';

import Colors from '../../variables/colors';
import Typography from '../../variables/typography';
import Borders from '../../variables/borders';
import Shadows from '../../variables/shadows';
import Spacing from '../../variables/spacing';

import RadioIcon from '../../icons/radioicon';
import WarmUpRow from '../../components/exerciserow/warmuprow';
import SmallButton from '../../components/buttonsmall';

export default function Warmup() {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('Warmup Exercise');
  const [tempTitle, setTempTitle] = useState(title);
  const inputRef = useRef(null);

  const [warmupRow, setWarmupRow] = useState({ id: 1, mins: 0 });

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

  const handleMinsChange = newMins => {
    setWarmupRow(row => ({ ...row, mins: newMins }));
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
          <SmallButton
            onPress={editing ? handleCloseOrSave : startEditing}
            variant={editing && tempTitle !== title ? 'active' : 'default'}
          >
            <Text>
              {editing ? (tempTitle !== title ? 'SAVE' : 'CLOSE') : 'Edit'}
            </Text>
          </SmallButton>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.legend}>
        <View style={styles.mins}>
          <Text style={styles.legendText}>Mins</Text>
        </View>
        <View style={styles.iconContainer}>
          <RadioIcon width={16} height={16} />
        </View>
      </View>

      <View style={styles.exercisesContainer}>
        {/* Singola riga, mai rimossa, parte da mins 0 */}
        <WarmUpRow
          initialNumber={String(warmupRow.mins)}
          onValueChange={val =>
            handleMinsChange(parseInt(val, 10))
          }
        />
      </View>
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
    textAlign: 'center',
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
});
