import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import SignupForm from '../components/signupScreen/SignupForm'
 const INSTAGRAM_LOGO = 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png'
const SignupScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContianer}>
          <Image source={{uri:INSTAGRAM_LOGO}} style={styles.instaLogo}/>
      </View>
      <SignupForm navigation={navigation}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:50,
        marginHorizontal:12,
    },
    logoContianer:{
        marginTop:60,
        alignItems:'center',
    },
    instaLogo:{
        width:100,
        height:100,
    }
})
export default SignupScreen