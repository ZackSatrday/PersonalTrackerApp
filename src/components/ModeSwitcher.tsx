import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMode } from '../context/ModeContext';
import { modeConfigs } from '../config/modes';
import { AppMode } from '../types';

export default function ModeSwitcher() {
  const router = useRouter();
  const { activeMode, setActiveMode } = useMode();
  const insets = useSafeAreaInsets();
  
  // Extract all keys from our configuration object
  const modeKeys = Object.keys(modeConfigs) as AppMode[];

  return (
    <View style={[styles.container, { paddingTop: 12 }]}>
      {modeKeys.map((mode) => {
        const config = modeConfigs[mode];
        const isActive = activeMode === mode;
        
        // Define dynamic styles based on active state
        const buttonDynamicStyle: StyleProp<ViewStyle> = isActive 
          ? {
              backgroundColor: config.primaryColor,
              borderColor: config.primaryColor,
            }
          : {
              backgroundColor: 'transparent',
              borderColor: '#FFFFFF',
            };
            
        const textDynamicStyle: StyleProp<TextStyle> = isActive 
          ? { color: '#FFFFFF' }
          : { color: '#757575' };

        return (
          <TouchableOpacity
            key={mode}
            style={[styles.modeButton, buttonDynamicStyle]}
            onPress={() => {
              // Only trigger if we are changing modes
              if (!isActive) {
                setActiveMode(mode);
                // Navigate to the root route of the selected mode
                // @ts-ignore - expo router types might be strict about dynamic routes
                router.replace(config.route); 
              }
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.icon}>{config.icon}</Text>
            <Text style={[styles.modeText, textDynamicStyle]}>
              {config.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    paddingBottom: 12, // paddingVertical removed, we set paddingTop dynamically in component
    paddingHorizontal: 8,
    gap: 8, // Space between buttons
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24, // Pill shape
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  icon: {
    marginRight: 6,
    fontSize: 14,
  },
  modeText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
});
