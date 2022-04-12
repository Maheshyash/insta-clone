import { SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native'
import React from 'react'
import AddNewPost from '../components/newPost/AddNewPost'

export default function NewPostScreen({navigation}) {
  return (
    <SafeAreaView style={styles.newPostContainer}>
      <AddNewPost navigation={navigation}/>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    newPostContainer:{
        flex:1,
        marginTop:Platform.OS ==='android' ? StatusBar.currentHeight:0,
        backgroundColor:'black'
    }
})