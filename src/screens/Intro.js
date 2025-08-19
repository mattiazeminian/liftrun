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

import Button from '../components/button';

import Spacing from '../variables/spacing';
import Typography from '../variables/typography';
import Colors from '../variables/colors';

const window = Dimensions.get('window');

export default function IntroPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/backgroundintro.png')}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        {/* Overlay leggero grigio */}
        <View style={styles.overlay} />

        {/* Contenuti sopra l'overlay e immagine */}
        <View style={styles.content}>
          {/* Container logo + hero */}
          <View style={styles.headerContainer}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <View style={styles.hero}>
              <Text style={styles.heroTitle}>
                Your training plan. Upgraded by AI.
              </Text>

              <Text style={styles.heroDescription}>
                Custom workout plans that fit your life, not the other way
                around.
              </Text>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <Button
              style={styles.button}
              variant="secondary"
              onPress={() => navigation.navigate('Login')}
            >
              SIGN IN
            </Button>

            <Button
              variant="primary"
              style={styles.button}
              onPress={() => navigation.navigate('SignUp')}
            >
              SIGN UP
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
    paddingTop: 80,
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.md,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 384, //Spacing.xxl,
  },
  logo: {
    width: 210,
    height: 60,
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
    color: Colors.grey600,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    gap: Spacing.m,
  },
  button: {
    flex: 1,
  },
});
