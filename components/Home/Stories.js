import { ScrollView, Text, View, Image, StyleSheet } from "react-native";
import React from "react";
import USER from "../../data/user";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
export default function Stories() {
  return (
    <View style={{ marginVertical: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USER.map((ele, index) => (
          <View style={styles.storieContainer} key={index}>
            <Image source={{ uri: ele.image }} style={styles.storieImage} />
            <Text style={styles.userText}>
              {ele.user.length > 11
                ? ele.user.slice(0, 10).toLocaleLowerCase() + "..."
                : ele.user}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  storieContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  storieImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 10,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
  userText: {
    color: "white",
  },
});
