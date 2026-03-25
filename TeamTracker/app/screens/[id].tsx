import { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import tinycolor from 'tinycolor2';

type Team = {
  id: string;
  displayName: string;
  logos: { href: string }[];
  alternateColor: string;
  color: string;
};


export default function TeamScreen() {
  const { id } = useLocalSearchParams();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${id}`)
      .then(res => res.json())
      .then(data => {
        setTeam(data.team); // 👈 THIS is key
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!team) {
    return <Text>Team not found</Text>;
  }

  return (
    

    <View style={{ alignItems: 'center', marginTop: 50, backgroundColor: tinycolor('#' + team.color).lighten(15).toString() }}>
      <Button
              title="Back"
              onPress={() => router.back()}
           />
      <Image
        source={{ uri: team.logos[0]?.href }}
        style={styles.teamLogo}
      />
      <Text style={styles.teamName}>
        {team.displayName}
      </Text>
     
    </View>
  );
}

const styles = StyleSheet.create({
    teamLogo: {
      width: 500,
      height: 500,
    },
    teamName: {
      fontSize: 50,
      fontWeight: '100',
      color: 'white',
    }
})