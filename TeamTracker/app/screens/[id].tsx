import { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, Button, ScrollView } from 'react-native';
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
  const [roster, setRoster] = useState<any[]>([]);
  const [injuries, setInjuries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${id}?enable=injuries`)
      .then(res => res.json())
      .then(data => {
        setTeam(data.team); // 👈 THIS is key
        setLoading(false);
      })
      .catch(err => console.log(err));

    fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${id}/roster`)
      .then(res => res.json())
      .then(data =>{
        setRoster(data.athletes);
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

  if (!roster){
    return <Text>Roster not found</Text>;
  }

  return (
    
  <ScrollView style={{ flex: 1, backgroundColor: tinycolor('#' + team.color).lighten(15).toString() }}>
  <Button title="Back" onPress={() => router.back()} />

  <View style={{ alignItems: 'center' }}>
    <Image
      source={{ uri: team.logos[0]?.href }}
      style={styles.teamLogo}
    />
    <Text style={styles.teamName}>
      {team.displayName}
    </Text>
  </View>

  {/* ROSTER */}
  <View style={{ padding: 16 }}>
    {roster.flatMap(group => group.items).map(player => (
      <View key={player.id} style={styles.playerRow}>
        <Image
          source={{ uri: player.headshot?.href }}
          style={styles.playerImage}
        />
        <View>
          <Text style={styles.playerName}>{player.fullName}</Text>
          <Text style={styles.playerDetails}>
            #{player.jersey} • {player.position?.name} {player.injuries?.status ? ` • ${player.injuries.status}` : ''}
          </Text>
        </View>
      </View>
    ))}
  </View>
</ScrollView>
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
    },
    body:{
      margin:0,
      padding:0,
    },
    playerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      backgroundColor: 'rgba(255,255,255,0.2)',
      padding: 10,
      borderRadius: 10,
    },
    
    playerImage: {
      width: 100,
      height: 100,
      marginRight: 10,
      borderRadius: 25,
    },
    
    playerName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
    
    playerDetails: {
      fontSize: 12,
      color: 'white',
    },

})