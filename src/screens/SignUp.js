import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform } from 'react-native';

import Spacing from '../variables/spacing';
import Typography from '../variables/typography';
import Colors from '../variables/colors';

import Button from '../components/button';
import TextInput from '../components/textinput';
import Navigation from '../components/navigation';

// Importa la tua icona ArrowLeft (adatta il percorso se serve)
import ArrowLeft from '../icons/arrowleft';

const window = Dimensions.get('window');

export default function SignUpScreen() {
  const navigation = useNavigation();

  // Stati
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Handler validazione email
  function validateEmail(text) {
    setEmail(text);

    if (text.length === 0) {
      setEmailError('');
      return;
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domain = text.split('@')[1];

    if (!regex.test(text) || !domain || domain.indexOf('.') === -1) {
      setEmailError('Email is not valid or domain missing!');
    } else {
      setEmailError('');
    }
  }

  function isEmailValid(email) {
    if (!email) return false;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domain = email.split('@')[1];

    return regex.test(email) && domain && domain.indexOf('.') !== -1;
  }

  // Handler validazione password
  function validatePassword(text) {
    setPassword(text);
    if (text.length === 0) {
      setPasswordError('');
    } else if (text.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError('');
    }
  }

  // Funzioni pure di validità (NON fanno setState)
  function isPasswordValid(password) {
    return password.length >= 8;
  }

  const isButtonDisabled = !(isEmailValid(email) && isPasswordValid(password));

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10} // o altro valore per margine sotto tastiera
    >
      <View style={styles.container}>
        {/* Navigation */}
        <Navigation
          style={styles.navigationOverlay}
          leftContent={<ArrowLeft></ArrowLeft>}
          rightContent={null}
          showCenter={false}
          onLeftClick={() => navigation.goBack()}
        />
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
                Let’s get {'\n'}
                started.
              </Text>
            </View>
          </View>

          {/* InputText and Button */}
          <View style={styles.inputContainer}>
            <TextInput
              label="Email"
              placeholder="What's your email?"
              value={email}
              onChangeText={validateEmail}
              autoComplete="on"
              keyboardType="email-address"
              errorMessage={emailError}
              autoCapitalize="none"
            />
            <TextInput
              label="Password"
              placeholder="Choose a password"
              value={password}
              onChangeText={validatePassword}
              secureTextEntry={true}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              errorMessage={passwordError}
            />

            <Button
              variant="primary"
              onPress={() => {
                alert('Primario premuto');
                navigation.navigate('IntroOnboarding');
              }}
              disabled={isButtonDisabled} // disabilita se email e/o password sono validi
              style={[
                styles.button,
                {
                  marginTop: Spacing.md,
                },
              ]}
            >
              SIGN UP
            </Button>
          </View>

          <Text style={styles.disclaimer}>
            By creating an account, you agree to our{' '}
            <Text
              style={styles.linkText}
              onPress={() => {
                /* apri Terms */
              }}
            >
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text
              style={styles.linkText}
              onPress={() => {
                /* apri Privacy */
              }}
            >
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    gap: Spacing.xxl,
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
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: Spacing.m,
  },
  disclaimer: {
    ...Typography.manrope.xsRegular,
    textAlign: 'center',
  },
  linkText: {
    textDecorationLine: 'underline',
  },
});
