import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Navigation from '../../components/navigation';
import Button from '../../components/button';
import CustomSlider from '../../components/slider';

import Colors from '../../variables/colors';
import Spacing from '../../variables/spacing';
import Typography from '../../variables/typography';

import ArrowLeftIcon from '../../icons/arrowleft';

export default function SettingsSchedule() {
  const navigation = useNavigation();

  // Initial slider values for comparison
  const initialDays = 3;
  const initialMinutes = 60;

  // Slider states
  const [sliderValueDays, setSliderValueDays] = useState(initialDays);
  const [sliderValueMinutes, setSliderValueMinutes] = useState(initialMinutes);

  // Track if values have been modified from initial
  const [modified, setModified] = useState(false);

  // Update modified flag when slider values change
  useEffect(() => {
    setModified(
      sliderValueDays !== initialDays || sliderValueMinutes !== initialMinutes,
    );
  }, [sliderValueDays, sliderValueMinutes]);

  return (
    <View style={styles.container}>
      <Navigation
        leftContent={<ArrowLeftIcon />}
        onLeftClick={() => navigation.goBack()}
        showCenter={true}
        centerContent={
          <Image
            source={require('../../assets/images/logo_text.png')}
            style={styles.logo}
          />
        }
      />

      <View style={styles.content}>
        <View style={styles.slidersContainer}>
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Personal Schedule</Text>
          </View>
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

        <View style={styles.buttonsContainer}>
          <Button
            variant="primary"
            style={styles.button}
            disabled={!modified}
            onPress={() => {
              alert(`Days: ${sliderValueDays}\nMinutes: ${sliderValueMinutes}`);
            }}
          >
            SAVE CHANGES
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logo: {
    width: 270,
    height: 40,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  hero: {
    paddingBottom: Spacing.xl,
  },
  heroTitle: {
    ...Typography.robotoSerif.mdRegular,
    color: Colors.darkBlue,
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
  buttonsContainer: {
    width: '100%',
    marginTop: Spacing.xl,
  },
  button: {
    width: '100%',
  },
});
