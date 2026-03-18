import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { router } from 'expo-router';


export default function Home() {
  return (
    <ImageBackground source={require('../assets/images/wock.jpg')}
    style={styles.background}
    >
        
    
    <View style={styles.container}>
      <Text>Home Screen</Text>

      <Button
        title="Go to Details"
        onPress={() => router.push('/screens/focusteam')}
      />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    container:{ 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    
    },
    background:{
        width:'100%',
        height:'100%'
    }

})