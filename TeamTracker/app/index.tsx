import { View, Text, Button, Image } from 'react-native';
import { router, Stack } from 'expo-router';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';

import { styles } from '../styles/styles';

export default function Home() {
  return (
    
    <View style={styles.container}>
      <View style={styles.border}>
      <Image 
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Team Tracker</Text>
     
      <br />
      <Button
        title="Pick Your Team"
        onPress={() => router.push('/screens/teamlist')}
      />
      </View>
    </View>
  );
}

