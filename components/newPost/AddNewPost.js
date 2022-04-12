import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FormikPostUploader from './FormikPostUploader'

export default function AddNewPost({navigation}) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <FormikPostUploader navigation={navigation}/>
    </View>
  )
}
const Header = ({navigation})=>{
  return(
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image source={{uri:'https://img.icons8.com/ios-glyphs/48/ffffff/back.png'}} style={styles.backbutton}/>
      </TouchableOpacity>
      <Text style={styles.headerText}>New Post</Text>
      {/* <Text/> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginHorizontal:10
  },
  headerContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  headerText:{
    color:'white',
    fontWeight:'700',
    marginRight:'40%',
    // marginRight:23,
    fontSize:20
  },
  backbutton:{
    width:30,
    height:30,
  }
})