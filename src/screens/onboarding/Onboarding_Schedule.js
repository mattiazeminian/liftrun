import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


import HeaderOnboarding from '../../components/headeronboarding';
import CustomSlider from '../../components/slider';
import Button from '../../components/button';

import Colors from '../../variables/colors';
import Spacing from '../../variables/spacing';
import Typography from '../../variables/typography';

import CalendarIcon from '../../icons/calendaricon';

export default function Onboarding_Schedule() {
  const navigation = useNavigation();
  // Stato di esempio per progress (da 0 a 1)
  const [progress, setProgress] = React.useState(0.6);

  // Stati per sliders
  const [sliderValueDays, setSliderValueDays] = useState(3);
  const [sliderValueMinutes, setSliderValueMinutes] = useState(60);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={120} // o altro valore per margine sotto tastiera
      >
        <View style={styles.container}>
          <View style={styles.containerText}>
            <HeaderOnboarding
              iconSource={<CalendarIcon />}
              title="How many days can you train per week?"
              description="To adapt the plan to your weekly schedule."
            />
          </View>

          {/* CHECKBOX GROUP */}
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
          <Button
            variant="primary"
            style={styles.button}
            onPress={() => navigation.navigate('Onboarding_Equipment')}
          >
            NEXT
          </Button>
        </View>
      </KeyboardAvoidingView>
    </>
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
    justifyContent: 'center', // opzionale, centra verticalmente il contenuto
    alignItems: 'center', // centra orizzontalmente il contenuto
  },
  slidersContainer: {
    gap: Spacing.xl,
    width: '100%', // fai in modo che il container occupi tutta la larghezza disponibile
    flexDirection: 'column',
  },
  slidersContainerText: {
    gap: Spacing.xs,
    width: '100%', // fai in modo che il container occupi tutta la larghezza disponibile
    flexDirection: 'column',
    ...Typography.manrope.xsRegular,
    color: Colors.grey600,
  },
});
