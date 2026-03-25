import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, Button } from 'react-native';
import { router } from 'expo-router';
import { Pressable } from 'react-native';

type TeamLogo = {
  href: string;
};

type Team = {
  id: string;
  displayName: string;
  logos: TeamLogo[];
};

type TeamItem = {
  team: Team;
};

export default function NFLScreen() {

  const [teams, setTeams] = useState<TeamItem[]>([]);

  useEffect(() => {
    fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams')
      .then(res => res.json())
      .then(data => {
        setTeams(data?.sports?.[0]?.leagues?.[0]?.teams || []);
      })
      .catch(err => console.log(err));
  }, []);

  // calculate tile width based on screen width
  const numColumns = 4;
  const tileWidth = Dimensions.get('window').width / numColumns - 16; // 16 for spacing

  return (
    <View style={styles.container}>
        <Button
        title="Home"
        onPress={() => router.back()}
     />
      <FlatList
        data={teams}
        keyExtractor={(item) => item.team.id}
        numColumns={numColumns} // this makes it a grid
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`./${item.team.id}`)}
            style={({hovered, pressed}) => [styles.tile, { width: tileWidth },
              hovered && styles.hovered,
              pressed && styles.pressed,
            ]}
          >
            <Image
              source={{ uri: item.team.logos[0]?.href }}
              style={styles.logo}
            />
            <Text style={styles.teamName}>{item.team.displayName}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
  },
  tile: {
    transform: [{ scale: .95 }],
    alignItems: 'center',
    margin: 4,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2, // shadow for Android
  },
  hovered: {
    transform: [{ scale: 1 }],
    transitionDuration: '.3s',
    backgroundColor: '#c9c9c9',
  },
  pressed: {
    transform: [{ scale: 1 }],
    transitionDuration: '.3s',
    backgroundColor: '#c9c9c9',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});