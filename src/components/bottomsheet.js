import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  PanResponder,
} from 'react-native';
import Colors from '../variables/colors';
import Spacing from '../variables/spacing';
import Typography from '../variables/typography';
import Borders from '../variables/borders';
import Shadows from '../variables/shadows';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CLOSE_DISTANCE = 100; // px di drag per trigger chiusura

export default function BottomSheet({
  children,
  open,
  onClose,
  title = 'Titolo bottom sheet',
  style = {},
}) {
  const [isRendered, setIsRendered] = useState(false);
  const translateY = useRef(new Animated.Value(300)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 5,
      onPanResponderGrant: () => {
        pan.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          // solo trascinamenti verso il basso
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > CLOSE_DISTANCE) {
          // chiudi
          Animated.timing(translateY, {
            toValue: 300,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            onClose && onClose();
          });
        } else {
          // ripristina alla posizione zero
          Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (open) {
      setIsRendered(true);
      translateY.setValue(300);
      opacity.setValue(0);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 300,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsRendered(false);
      });
    }
  }, [open]);

  if (!isRendered) return null;

  return (
    <>
      {/* Overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.overlay, { opacity }]} />
      </TouchableWithoutFeedback>

      {/* BottomSheet */}
      <Animated.View
        style={[
          styles.bottomSheet,
          style,
          {
            transform: [{ translateY }],
            opacity,
            width: SCREEN_WIDTH, // larghezza 100% device
          },
        ]}
      >
        {/* Barra superiore */}
        <View style={styles.handleWrapper}>
          <View style={styles.handleBar} />
        </View>

        {/* Titolo */}
        <Text style={styles.title}>{title}</Text>

        {/* Contenuto passato come children */}
        <View style={styles.childrenList}>{children}</View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Borders.radius.xl,
    borderTopRightRadius: Borders.radius.xl,
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: Spacing.md,
    ...Shadows.lg, // Ombra dalle tue variabili
    zIndex: 1000,
  },
  handleWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  handleBar: {
    width: 32,
    height: 4,
    borderRadius: Borders.radius.round,
    backgroundColor: Colors.darkBlue,
  },
  title: {
    width: '100%',
    textAlign: 'left',
    ...Typography.manrope.lg,
    color: Colors.darkBlue,
  },
  childrenList: {
    width: '100%',
    flexDirection: 'column',
    gap: Spacing.sm,
  },
});
