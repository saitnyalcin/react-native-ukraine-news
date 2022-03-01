import React, { useEffect, useState } from "react";
import { Image, Linking, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [data, setData] = useState({ articles: [] });
  console.log(data);

  const refreshUser = () => {
    fetch(
      "https://newsapi.org/v2/everything?q=Apple&from=2022-02-28&sortBy=popularity&apiKey=bb9cb5ef52124cd69c5c0b1490bacc45"
    )
      .then((response) => response.json())
      .then((json) => setData(json));
  };
  useEffect(refreshUser, []);

  return (
    <View style={styles.container}>
      {data.articles.map((news, index) => (
        <View key={index} style={styles.flex}>
          <Image
            style={styles.userImage}
            source={{
              uri: news.urlToImage,
            }}
          />
          <Text>{new Date(news.publishedAt).toDateString()}</Text>
          <View>
            <Text
              style={{ color: "blue" }}
              target="target_blank"
              onPress={() => Linking.openURL(news.url)}
            >
              <Text>{news.title}</Text>
            </Text>
            <Text>{news.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 20,
  },
  flex: {
    width: 400,
    height: 500,
  },
  userImage: {
    margin: 25,
    width: 200,
    height: 200,
  },
});
