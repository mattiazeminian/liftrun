import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import Colors from '../variables/colors';
import Spacing from '../variables/spacing';
import Typography from '../variables/typography';
import Borders from '../variables/borders';
import Shadows from '../variables/shadows';

const ITEM_HEIGHT = 50;
const { height, width } = Dimensions.get('window');

export default function PickerInput({
  value,
  onValueChange,
  placeholder = '',
  label = '',
  disabled = false,
  style,
  min = 110,
  max = 210,
}) {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const initialIndex = numbers.indexOf(parseInt(value, 10));
  const [modalVisible, setModalVisible] = useState(false);
  const [tempIndex, setTempIndex] = useState(
    initialIndex !== -1 ? initialIndex : 60,
  );
  const flatListRef = useRef(null);

  // Scroll al numero corretto all’apertura
  useEffect(() => {
    if (modalVisible && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: tempIndex,
        animated: false,
        viewPosition: 0.5,
      });
    }
  }, [modalVisible]);

  const handleContainerPress = () => {
    if (!disabled) setModalVisible(true);
  };

  const handleSelect = index => {
    setTempIndex(index);
    onValueChange(numbers[index].toString());
    setModalVisible(false);
  };

  const handleScrollEnd = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(numbers.length - 1, index));
    setTempIndex(clampedIndex);
    onValueChange(numbers[clampedIndex].toString());
  };

  // Colore label e bordo dinamico
  const borderColor = disabled
    ? Colors.grey200
    : value
    ? Colors.darkBlue
    : Colors.grey200;

  const labelColor = disabled
    ? Colors.grey200
    : value
    ? Colors.darkBlue
    : Colors.darkBlue;

  return (
    <View style={[styles.wrapper, style]}>
      {label ? (
        <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      ) : null}

      <TouchableWithoutFeedback onPress={handleContainerPress}>
        <View
          style={[
            styles.inputContainer,
            { borderColor, opacity: disabled ? 0.6 : 1 },
            Shadows.sm,
          ]}
        >
          <Text
            style={[
              styles.input,
              { color: value ? Colors.darkBlue : Colors.grey400 },
            ]}
          >
            {value || placeholder}
          </Text>
          <Text style={styles.cmText}>CM</Text>
        </View>
      </TouchableWithoutFeedback>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalWrapper}>
          {/* Evidenziatore centrale */}
          <View style={styles.highlightOverlay} pointerEvents="none" />

          <FlatList
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
            onMomentumScrollEnd={handleScrollEnd}
            renderItem={({ item, index }) => {
              const isSelected = index === tempIndex;
              return (
                <TouchableWithoutFeedback onPress={() => handleSelect(index)}>
                  <View style={styles.modalItem}>
                    <Text
                      style={[
                        styles.modalItemText,
                        isSelected && styles.selectedItemText,
                      ]}
                    >
                      {item}
                    </Text>
                    <Text style={styles.cmOverlayText}>CM</Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
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
    marginLeft: 16,
    marginRight: 16,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 0, // esplicito
    position: 'relative',
    top: 9, // verrà applicato visto che c'è position relative
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
    paddingVertical: Spacing.m,
    backgroundColor: Colors.white,
  },
  input: { flex: 1, ...Typography.manrope.smRegular },
  cmText: {
    ...Typography.googleSansCode.xsMedium,
    fontSize: 10,
  },
  modalWrapper: {
    position: 'absolute',
    bottom: 0,
    width: width,
    maxHeight: height * 0.35,
    backgroundColor: Colors.white,
    borderWidth: Borders.widths.thin,
    borderColor: Colors.grey200,
    borderTopLeftRadius: Borders.radius.large,
    borderTopRightRadius: Borders.radius.large,
  },
  highlightOverlay: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    left: 0,
    width: '100%',
    height: ITEM_HEIGHT,
    borderWidth: 2,
    borderColor: Colors.grey200,
    backgroundColor: Colors.grey100,
    borderRadius: Borders.radius.regular,
  },
  modalItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalItemText: { ...Typography.manrope.mdRegular, color: Colors.darkBlue },
  selectedItemText: { fontWeight: 'bold', fontSize: 18 },
  cmOverlayText: {
    marginLeft: 8,
    ...Typography.googleSansCode.xsRegular,
    color: Colors.darkBlue,
  },
});
