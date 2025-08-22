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

const ITEM_HEIGHT = 50; // Height of each item in the FlatList
const { height, width: SCREEN_WIDTH } = Dimensions.get('window');
const MODAL_HEIGHT = height * 0.5; // Half the screen height for modal

// Haptic feedback options
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
  step = 1, // 👈 nuova prop per gestire i decimali
}) {
  // Generate an array of numbers from min to max
  const numbers = Array.from(
    { length: Math.floor((max - min) / step) + 1 },
    (_, i) => parseFloat((min + i * step).toFixed(1))
  );

  // Clamp initial value between min and max
  const initialNumber = parseFloat(value);
  const clampedValue = Math.max(
    min,
    Math.min(max, isNaN(initialNumber) ? min : initialNumber),
  );
  const initialIndex = numbers.indexOf(clampedValue);

  // State
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [animating, setAnimating] = useState(false); // Animation state
  const [selectedIndex, setSelectedIndex] = useState(initialIndex); // Currently selected index

  const flatListRef = useRef(null); // Reference to FlatList for scrolling
  const fadeAnim = useRef(new Animated.Value(0)).current; // Fade animation for overlay
  const slideAnim = useRef(new Animated.Value(MODAL_HEIGHT)).current; // Slide animation for modal
  const lastHapticTimeRef = useRef(0); // Throttle haptic feedback

  // Scroll to selected item when modal opens
  useEffect(() => {
    if (modalVisible && flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: selectedIndex * ITEM_HEIGHT,
        animated: false,
      });
    }
  }, [modalVisible]);

  // Trigger haptic feedback
  const triggerHaptic = () => {
    ReactNativeHapticFeedback.trigger('selection', hapticOptions);
  };

  // Open modal with animation
  const openModal = () => {
    if (disabled || modalVisible || animating) return;
    triggerHaptic();
    setModalVisible(true);
    setAnimating(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0.5, // Semi-transparent overlay
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0, // Slide modal up
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setAnimating(false));
  };

  // Close modal with animation and call onValueChange
  const closeModal = () => {
    if (animating) return;
    setAnimating(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0, // Fade out overlay
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: MODAL_HEIGHT, // Slide modal down
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setAnimating(false);
      setModalVisible(false);
      onValueChange(numbers[selectedIndex].toString()); // Pass selected value
    });
  };

  // Handle item selection
  const handleSelectIndex = index => {
    triggerHaptic();
    setSelectedIndex(index);
    closeModal();
  };

  // Handle scrolling to update selected index and trigger haptic feedback
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

  // Snap FlatList to nearest item after scrolling stops
  const handleMomentumScrollEnd = e => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setSelectedIndex(Math.max(0, Math.min(numbers.length - 1, index)));
  };

  const borderColor = Colors.grey200;
  const isError = !!errorMessage;

  return (
    <View style={[styles.wrapper, style, { width }]}>
      {/* Input area */}
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

      {/* Error message */}
      <View style={styles.errorWrapper}>
        {isError ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : (
          <Text style={styles.errorText}></Text>
        )}
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={closeModal}
      >
        <View style={styles.wrapperModal}>
          {/* Overlay with fade animation */}
          <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
            <TouchableWithoutFeedback onPress={closeModal}>
              <View style={styles.overlayTouchable} />
            </TouchableWithoutFeedback>
          </Animated.View>

          {/* Sliding modal */}
          <Animated.View
            style={[
              styles.modalWrapper,
              { width: SCREEN_WIDTH, transform: [{ translateY: slideAnim }] },
            ]}
          >
            {/* Drag handle */}
            <View style={styles.handleWrapper}>
              <View style={styles.handleBar} />
            </View>

            {/* Title */}
            <Text style={styles.title}>{unitTitle}</Text>

            {/* Scrollable number list */}
            <View style={styles.scrollWrapper}>
              <FlatList
                keyboardShouldPersistTaps="handled"
                ref={flatListRef}
                data={numbers}
                keyExtractor={item => item.toString()}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT} // Snap to item height
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
                        {step === 1 ? item : item.toFixed(1)}{' '}
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
