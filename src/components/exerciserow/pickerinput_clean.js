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

import Colors from '../../variables/colors';
import Spacing from '../../variables/spacing';
import Typography from '../../variables/typography';
import Borders from '../../variables/borders';
import Shadows from '../../variables/shadows';

const ITEM_HEIGHT = 50;
const { height, width: SCREEN_WIDTH } = Dimensions.get('window');
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
  disabled = false,
  errorMessage = '',
  style,
  min = 110,
  max = 210,
  unitText = 'KG',
  width = 'auto',
  showUnitText = true,
}) {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  const initialNumber = parseInt(value, 10);
  const clampedValue = Math.max(
    min,
    Math.min(max, isNaN(initialNumber) ? min : initialNumber),
  );
  const initialIndex = numbers.indexOf(clampedValue);

  const [modalVisible, setModalVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const flatListRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(MODAL_HEIGHT)).current;
  const lastHapticTimeRef = useRef(0);

  useEffect(() => {
    if (modalVisible && flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: selectedIndex * ITEM_HEIGHT,
        animated: false,
      });
    }
  }, [modalVisible]);

  const triggerHaptic = () => {
    ReactNativeHapticFeedback.trigger('selection', hapticOptions);
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
    ]).start(() => setAnimating(false));
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

  const handleSelectIndex = index => {
    triggerHaptic();
    setSelectedIndex(index);
    closeModal();
  };

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setSelectedIndex(Math.max(0, Math.min(numbers.length - 1, index)));

    const now = Date.now();
    if (now - lastHapticTimeRef.current > 200) {
      triggerHaptic();
      lastHapticTimeRef.current = now;
    }
  };

  const handleMomentumScrollEnd = e => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setSelectedIndex(Math.max(0, Math.min(numbers.length - 1, index)));
  };

  const borderColor = Colors.grey200;
  const isError = !!errorMessage;

  return (
    <View style={[styles.wrapper, style, { width }]}>
      <TouchableWithoutFeedback onPress={openModal}>
        <View
          style={[
            styles.inputContainer,
            style,
            { borderColor, opacity: disabled ? 0.6 : 1 },
            { borderWidth: '0' },
            Shadows.sm,
            isError && { borderColor: Colors.error },
            { width: '100%' },
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
          {showUnitText ? <Text style={styles.cmText}>{unitText}</Text> : null}
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.errorWrapper}>
        {isError ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : (
          <Text style={styles.errorText}></Text>
        )}
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={closeModal}
      >
        <View style={styles.wrapperModal}>
          <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
            <TouchableWithoutFeedback onPress={closeModal}>
              <View style={styles.overlayTouchable} />
            </TouchableWithoutFeedback>
          </Animated.View>

          <Animated.View
            style={[
              styles.modalWrapper,
              { width: SCREEN_WIDTH, transform: [{ translateY: slideAnim }] },
            ]}
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
                keyExtractor={item => item.toString()}
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
                scrollEventThrottle={10}
                renderItem={({ item, index }) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <TouchableOpacity
                      style={
                        isSelected
                          ? styles.selectedItemContainer
                          : styles.modalItem
                      }
                      activeOpacity={0.7}
                      onPress={() => handleSelectIndex(index)}
                    >
                      <Text
                        style={[
                          styles.modalItemText,
                          isSelected && styles.selectedItemText,
                        ]}
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
    flexDirection: 'row',
    alignItems: 'center',
    height: 'auto',
    padding: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    justifyContent: 'center',
    paddingHorizontal: 10,
    gap: Spacing.xs,
  },
  input: { ...Typography.googleSansCode.input },
  cmText: { ...Typography.googleSansCode.xsMedium, fontSize: 10 },
  wrapperModal: { flex: 1, justifyContent: 'flex-end' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'black' },
  overlayTouchable: { flex: 1, width: '100%' },
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: ITEM_HEIGHT,
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
    ...Typography.googleSansCode.xsMedium,
    fontSize: 14,
    color: Colors.darkBlue,
    lineHeight: 14,
  },
  errorWrapper: { minHeight: 20, marginTop: 2 },
  errorText: { color: Colors.error, fontSize: 12 },
});
