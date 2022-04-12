import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import Header_logo from "../../assets/instagram-text.svg";
// import AntDesign from 'react-native-vector-icons/AntDesign'
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../../firebase";
export default function Header({ navigation }) {
    const handleSignOut = async () =>{
        try{
            await firebase.auth().signOut();
            console.log('Signed Out successfully!')
        }
        catch(error){
            console.log(error.message);
        }
    }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut}>
        <Image
          style={styles.header_logo}
          source={require("../../assets/headerlogo.png")}
        />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.push("NewPostScreen")}>
          <Image
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png",
            }}
            style={styles.icons}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
            }}
            style={styles.icons}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>4</Text>
          </View>
          <Image
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png",
            }}
            style={styles.icons}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    flexDirection: "row",
  },
  header_logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  icons: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginLeft: 10,
  },
  unreadBadge: {
    backgroundColor: "#FF3250",
    position: "absolute",
    left: 20,
    bottom: 18,
    zIndex: 1,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadBadgeText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },
});
