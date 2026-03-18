import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMode } from '../../src/context/ModeContext';
import ModeSwitcher from '../../src/components/ModeSwitcher';

export default function TrackerScreen() {
  const { config } = useMode();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: config.backgroundColor }]}>
      <ModeSwitcher />
      <View style={styles.container}>
        <Text style={[styles.title, { color: config.primaryColor }]}>
          {config.icon} {config.name}
        </Text>
        <Text style={styles.subtitle}>{config.aiPersona}</Text>
        <Text style={styles.placeholder}>{config.name} content coming in Phase 3</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Montserrat_700Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  placeholder: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#888',
    textAlign: 'center',
  },
});
