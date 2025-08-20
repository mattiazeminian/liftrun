import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import Colors from '../variables/colors';
import Spacing from '../variables/spacing';
import Typography from '../variables/typography';
import Borders from '../variables/borders';
import Shadows from '../variables/shadows';

const ITEM_HEIGHT = 50;
const { height, width } = Dimensions.get('window');
const MODAL_HEIGHT = height * 0.5;

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function PickerInput({
  value,
  unitTitle = 'This is the title',
  onValueChange,
  placeholder = '',
  label = '',
  disabled = false,
  errorMessage = '',
  style,
  min = 110,
  max = 210,
  unitText = 'KG',
  defaultIndex,
}) {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const effectiveDefaultIndex =
    defaultIndex !== undefined &&
    defaultIndex >= 0 &&
    defaultIndex < numbers.length
      ? defaultIndex
      : Math.floor(numbers.length / 2);

  const [modalVisible, setModalVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(
    value ? numbers.indexOf(parseInt(value, 10)) : effectiveDefaultIndex,
  );

  const flatListRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(MODAL_HEIGHT)).current;
  const lastHapticTimeRef = useRef(0);

  useEffect(() => {
    if (modalVisible && flatListRef.current) {
      const index = value ? numbers.indexOf(parseInt(value, 10)) : effectiveDefaultIndex;
      const validIndex = index !== -1 ? index : effectiveDefaultIndex;
      setSelectedIndex(validIndex);
      flatListRef.current.scrollToOffset({
        offset: validIndex * ITEM_HEIGHT,
        animated: false,
      });
    }
  }, [modalVisible]);

  const triggerHaptic = () => {
    ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
  };

  const openModal = () => {
    if (disabled || modalVisible || animating) return;
    triggerHaptic();
    setModalVisible(true);
    setAnimating(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setAnimating(false);
    });
  };

  const closeModal = () => {
    if (animating) return;
    setAnimating(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: MODAL_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setAnimating(false);
      setModalVisible(false);
      onValueChange(numbers[selectedIndex].toString());
    });
  };

  const handleOpen = () => openModal();

  const handleClose = () => closeModal();

  const handleSelectIndex = (index) => {
    triggerHaptic();
    setSelectedIndex(index);
    closeModal();
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setSelectedIndex(Math.max(0, Math.min(numbers.length - 1, index)));

    const now = Date.now();
    if (now - lastHapticTimeRef.current > 200) {
      triggerHaptic();
      lastHapticTimeRef.current = now;
    }
  };

  const handleMomentumScrollEnd = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setSelectedIndex(Math.max(0, Math.min(numbers.length - 1, index)));
  };

  const borderColor = disabled
    ? Colors.grey200
    : value
    ? Colors.darkBlue
    : Colors.grey200;

  const labelColor = disabled ? Colors.grey200 : Colors.darkBlue;

  const isError = !!errorMessage;

  return (
    <View style={[styles.wrapper, style]}>
      {label ? (
        <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      ) : null}

      <TouchableWithoutFeedback onPress={handleOpen}>
        <View
          style={[
            styles.inputContainer,
            { borderColor, opacity: disabled ? 0.6 : 1 },
            Shadows.sm,
            isError && { borderColor: Colors.error },
          ]}
        >
          <Text
            style={[
              styles.input,
              { color: value ? Colors.darkBlue : Colors.grey400 },
              isError && { color: Colors.error },
            ]}
          >
            {value || placeholder}
          </Text>
          <Text style={styles.cmText}>{unitText}</Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.errorWrapper}>
        {isError ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : (
          <Text style={styles.errorText}></Text>
        )}
      </View>

      <Modal visible={modalVisible} transparent animationType="none" onRequestClose={handleClose}>
        <View style={styles.wrapperModal}>
          <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
            <TouchableWithoutFeedback onPress={handleClose}>
              <View style={styles.overlayTouchable} />
            </TouchableWithoutFeedback>
          </Animated.View>

          <Animated.View
            style={[styles.modalWrapper, { width, transform: [{ translateY: slideAnim }] }]}
          >
            <View style={styles.handleWrapper}>
              <View style={styles.handleBar} />
            </View>

            <Text style={styles.title}>{unitTitle}</Text>

            <View style={styles.scrollWrapper}>
              <FlatList
                keyboardShouldPersistTaps="handled"
                ref={flatListRef}
                data={numbers}
                keyExtractor={(item) => item.toString()}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
                getItemLayout={(_, index) => ({
                  length: ITEM_HEIGHT,
                  offset: ITEM_HEIGHT * index,
                  index,
                })}
                onScroll={handleScroll}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <TouchableOpacity
                      style={isSelected ? styles.selectedItemContainer : styles.modalItem}
                      activeOpacity={0.7}
                      onPress={() => handleSelectIndex(index)}
                    >
                      <Text
                        style={[styles.modalItemText, isSelected && styles.selectedItemText]}
                      >
                        {item}{' '}
                        <Text style={styles.cmTextInline}>{unitText}</Text>
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    display: 'flex',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    zIndex: 1,
    marginLeft: Spacing.md,
    marginRight: Spacing.md,
    paddingHorizontal: Spacing.xs,
    position: 'relative',
    top: 9,
    textTransform: 'uppercase',
    backgroundColor: Colors.white,
    ...Typography.googleSansCode.xsRegular,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Borders.widths.thin,
    borderRadius: Borders.radius.regular,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    ...Typography.manrope.smRegular,
  },
  cmText: {
    ...Typography.googleSansCode.xsMedium,
    fontSize: 10,
    lineHeight: 24,
  },
  wrapperModal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  overlayTouchable: {
    flex: 1,
    width: '100%',
  },
  modalWrapper: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Borders.radius.xl,
    borderTopRightRadius: Borders.radius.xl,
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
    flexDirection: 'column',
    alignItems: 'center',
    gap: Spacing.md,
    ...Shadows.lg,
    maxHeight: height * 0.5,
  },
  handleWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.m,
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
    marginBottom: 8,
  },
  scrollWrapper: {
    height: ITEM_HEIGHT * 5,
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  modalItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
  },
  selectedItemContainer: {
    backgroundColor: Colors.grey100,
    borderRadius: Borders.radius.large,
    paddingHorizontal: 92,
    paddingVertical: Spacing.sm,
    marginVertical: 2,
  },
  modalItemText: {
    ...Typography.manrope.mdRegular,
    color: Colors.grey600,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  selectedItemText: {
    fontWeight: '700',
    color: Colors.darkBlue,
    fontSize: 28,
    lineHeight: 32,
  },
  cmTextInline: {
    ...Typography.googleSansCode.xsRegular,
    color: Colors.darkBlue,
    fontSize: 14,
  },
  errorWrapper: {
    minHeight: 18,
    marginLeft: Spacing.md,
  },
  errorText: {
    color: Colors.error,
    ...Typography.manrope.xsMedium,
  },
});
