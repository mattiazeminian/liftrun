import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Navigation from '../components/navigation';
import Button from '../components/button';

import Spacing from '../variables/spacing';
import Typography from '../variables/typography';

import ArrowLeft from '../icons/arrowleft';

import { auth } from '../config/firebaseConfig';

const window = Dimensions.get('window');

export default function IntroOnboarding() {
  const navigation = useNavigation();
  const currentUser = auth.currentUser;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/bgonboarding.png')}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        {/* Overlay leggero grigio */}
        <View style={styles.overlay} />

        {/* Contenuti sopra l'overlay e immagine */}
        <View style={styles.content}>
          {/* Navigation fixa in alto */}
          <Navigation
            style={styles.navigationOverlay}
            leftContent={<ArrowLeft></ArrowLeft>}
            rightContent={null}
            showCenter={false}
            onLeftClick={() => navigation.goBack()}
          />
          {/* Container hero + button*/}
          <View style={styles.containerText}>
            <View style={styles.hero}>
              <Text style={styles.heroTitle}>Let’s personalize your plan.</Text>

              <Text style={styles.heroDescription}>
                Answer a few quick questions so we can build the perfect plan
                for you.
              </Text>
            </View>
            <Button
              variant="primary"
              style={styles.button}
              onPress={() =>
                navigation.navigate('Onboarding_FitnessGoal', {
                  uid: currentUser.uid,
                })
              }
            >
              GET STARTED
            </Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
  },
  navigationOverlay: {
    position: 'absolute', // posizione assoluta per sovrapporre la navigation
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10, // zIndex alto per sovrapposizione
    backgroundColor: 'transparent',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // posizione assoluta su tutta l'area dell'immagine
    // backgroundColor: 'rgba(255, 255, 255, 0.2)', // grigio semi-trasparente, regola alpha come vuoi
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.md,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  containerText: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 92,
  },
  hero: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  heroTitle: {
    textAlign: 'center',
    ...Typography.robotoSerif.displayMdRegular,
  },
  heroDescription: {
    textAlign: 'center',
    ...Typography.manrope.mdRegular,
  },
});
