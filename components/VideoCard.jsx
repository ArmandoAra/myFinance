import React from "react";
import { Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, TouchableOpacity } from "react-native";

//Icons
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

//Por las props estamos desestructurando la informacion que nos llega del componente padre
const VideoCard = ({
  video: {
    title,
    video,
    prompt,
    thumbnail,
    creator: { userName, avatar },
  },
}) => {
  const [play, setPlay] = React.useState(false);

  return (
    <ThemedView>
      <ThemedView style={styles.container}>
        {/* Avatar uri image, solo las iniciales del nombre */}
        <ThemedView style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </ThemedView>
        {/* En el centro el titulo y el nombre del usuario */}
        <ThemedView style={{ width: "70%" }}>
          <ThemedText style={{}}>{title}</ThemedText>
          <ThemedText style={{}}>{userName}</ThemedText>
        </ThemedView>
        {/* Al final a la derecha los tres punticos del menu */}
        <ThemedView style={styles.rightMenuContainer}>
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </ThemedView>
      </ThemedView>

      {/* Video container */}
      <ThemedView
        style={{
          width: "100%",
          height: 200,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        {play ? (
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
            onPress={() => setPlay(!play)}
          >
            <ThemedText>Playing</ThemedText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => setPlay(!play)}
          >
            <Image
              source={{ uri: thumbnail }}
              style={styles.thumbnail}
              resizeMode="cover"
            />

            <MaterialIcons
              name="play-circle-outline"
              size={60}
              color="white"
              style={{ position: "absolute", top: "35%", left: "40%" }}
            />
          </TouchableOpacity>
        )}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    paddingLeft: 20,
  },
  avatarContainer: {
    width: "20%",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginRight: 10,
  },
  rightMenuContainer: { width: "10%", marginVertical: "auto" },
  thumbnail: {
    width: "90%",
    marginLeft: 10,
    marginRight: 10,
    height: 200,
    borderRadius: 15,
  },
});

export default VideoCard;
