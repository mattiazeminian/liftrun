import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Text from 'react-native-paper/lib/commonjs/components/Typography/Text';
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
  const [progress, setProgress] = React.useState(0.6);

  // Stati per sliders con inizializzazione corretta
  const [sliderValueDays, setSliderValueDays] = useState(3);
  const [sliderValueMinutes, setSliderValueMinutes] = useState(60);

  // Se vuoi far scattare altre azioni alla modifica valori, usa useEffect qui
  useEffect(() => {
    // esempi di side effect se serve
  }, [sliderValueDays, sliderValueMinutes]);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoiding}
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
            <Text style={styles.textDescription}>
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
  );
}

const styles = StyleSheet.create({
  keyboardAvoiding: { flex: 1 },
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
  },
  textDescription: {
    ...Typography.manrope.xsRegular,
    color: Colors.grey600,
  },
  button: {
    width: '100%',
  },
});
