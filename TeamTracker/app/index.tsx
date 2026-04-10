import { View, Text, Button, Image, Pressable } from 'react-native';
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

      <Pressable
        
        onPress={() => router.push('/screens/teamlist')}
        style={styles.selectBTN}
      >
        <Text style={styles.selectTXT}>Pick Your Team</Text>
      </Pressable>
      </View>
    </View>
  );
}

