import { SafeAreaView, Platform, StyleSheet, StatusBar, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Home/Header'
import Stories from '../components/Home/Stories'
import Post from '../components/Home/Post'
import { POSTS } from '../data/post'
import { bottomTabIcons } from '../data/bottomTabIcons'
import BottomTabs from '../components/Home/BottomTabs'
import { db } from '../firebase'
export default function HomeScreen({navigation}) {
  const [posts,setPosts] = useState([])
  useEffect(()=>{
    db.collectionGroup('posts').onSnapshot(snapchat=>{
      setPosts(snapchat.docs.map(doc=> doc.data()))
    })
  },[])
  return (
    <SafeAreaView style={styles.homeScreenContianer}>
      <Header navigation={navigation}/>
      <Stories />
      <ScrollView showsVerticalScrollIndicator={false}>
        {posts.map((post, index)=>(
          <Post post ={post} key={index}/>
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} navigation={navigation}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    homeScreenContianer:{
        flex:1,
        marginTop:Platform.OS ==='android' ? StatusBar.currentHeight:0,
        backgroundColor:'black'
    }
})