import { View, Text, Image, ActivityIndicator, StyleSheet, Button, ScrollView, FlatList, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import tinycolor from 'tinycolor2';

type Team = {
  id: string;
  displayName: string;
  logos: { href: string }[];
  alternateColor: string;
  color: string;
};

type NewsItem = {
  id: string;
  headline: string;
  description: string;
  published: string;
  images?: { url: string }[];
  links: { web: { href: string } };
};

export default function Details() {
  const { id } = useLocalSearchParams();
  const [team, setTeam] = useState<Team | null>(null);
  const [roster, setRoster] = useState<any[]>([]);
  const [injuries, setInjuries] = useState<any[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        // Team info + injuries
        const teamRes = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${id}?enable=injuries`);
        const teamData = await teamRes.json();
        setTeam(teamData.team);

        // Roster
        const rosterRes = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${id}/roster`);
        const rosterData = await rosterRes.json();
        setRoster(rosterData.athletes);

        // Team news
        const newsRes = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?team=${id}&limit=25`);
        const newsData = await newsRes.json();
        setNews(newsData.articles || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" />;

  if (!team) return <Text>Team not found</Text>;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: tinycolor('#' + team.color).lighten(15).toString() }}>
      <Button title="Go Back" onPress={() => router.back()} />
      
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Text style={styles.teamName}>{team.displayName}</Text>
        <Image source={{ uri: team.logos[0]?.href }} style={styles.teamLogo} />
      </View>

      {/* Team News */}
      <View style={styles.newsSection}>
        <Text style={styles.sectionTitle}>Team News</Text>
        <FlatList
          data={news}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => Linking.openURL(item.links.web.href)}>
              <View style={styles.newsCard}>
                {item.images && item.images[0]?.url && (
                  <Image source={{ uri: item.images[0].url }} style={styles.newsImage} />
                )}
                <View style={styles.newsContent}>
                  <Text style={styles.newsTitle}>{item.headline}</Text>
                  <Text style={styles.newsDate}>{new Date(item.published).toLocaleDateString()}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  teamLogo: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
  teamName: {
    fontSize: 40,
    fontWeight: '100',
    color: 'white',
    marginBottom: 10,
  },
  newsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    alignSelf:'center',
    textDecorationLine:'underline',
  },
  newsCard: {
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    overflow: 'hidden',
    width: '60%',
    alignSelf:'center',
  },
  newsImage: {
    alignSelf:'center',
    width: '100%',
    height: 350,
  },
  newsContent: {
    padding: 12,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
  },
  newsDate: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
});