import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

import HeaderOnboarding from '../../components/headeronboarding';
import CustomSlider from '../../components/slider';
import Button from '../../components/button';

import Colors from '../../variables/colors';
import Spacing from '../../variables/spacing';
import Typography from '../../variables/typography';

import CalendarIcon from '../../icons/calendaricon';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export default function Onboarding_Schedule() {
  const navigation = useNavigation();
  const route = useRoute();

  // Recupera uid
  const { uid } = route.params || {};

  // Stato di esempio per progress (da 0 a 1)
  const [sliderValueDays, setSliderValueDays] = useState(3);
  const [sliderValueMinutes, setSliderValueMinutes] = useState(60);

  async function handleNext() {
    if (!uid) {
      Alert.alert(
        'Errore',
        'Utente non autenticato. Impossibile salvare i dati.',
      );
      return;
    }

    try {
      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, {
        trainingDays: sliderValueDays,
        trainingMinutes: sliderValueMinutes,
      });
      navigation.navigate('Onboarding_Equipment', { uid });
    } catch (error) {
      Alert.alert('Errore', 'Non è stato possibile salvare il piano. Riprova.');
      console.error('Errore aggiornando dati allenamento:', error);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={120}
    >
      <View style={styles.container}>
        <View style={styles.containerText}>
          <HeaderOnboarding
            iconSource={<CalendarIcon />}
            title="How many days can you train per week?"
            description="To adapt the plan to your weekly schedule."
          />
        </View>

        <View style={styles.slidersContainer}>
          <CustomSlider
            label="DAYS"
            value={sliderValueDays}
            onValueChange={setSliderValueDays}
            min={0}
            max={7}
            step={1}
            style={{ width: '100%' }}
          />
          <View style={styles.slidersContainerText}>
            <Text style={styles.slidersContainerText}>
              How long each session can be?
            </Text>
            <CustomSlider
              label="MINUTES"
              value={sliderValueMinutes}
              onValueChange={setSliderValueMinutes}
              min={0}
              max={120}
              step={5}
              style={{ width: '100%' }}
            />
          </View>
        </View>

        <Button variant="primary" style={styles.button} onPress={handleNext}>
          NEXT
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.md,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerText: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slidersContainer: {
    gap: Spacing.xl,
    width: '100%',
    flexDirection: 'column',
  },
  slidersContainerText: {
    gap: Spacing.xs,
    width: '100%',
    flexDirection: 'column',
    ...Typography.manrope.xsRegular,
    color: Colors.grey600,
  },
});
