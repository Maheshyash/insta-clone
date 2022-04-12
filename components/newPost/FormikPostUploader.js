import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React,{useState, useEffect} from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import validUrl from 'valid-url'
import {db,firebase} from '../../firebase'

const PLACE_HOLDER = 'https://img.icons8.com/fluency-systems-regular/48/ffffff/ios-application-placeholder.png'
const uploadPostSchema = Yup.object().shape({
    imageUrl:Yup.string().url().required('A URL is required'),
    caption:Yup.string().max(2200, 'Caption has reached the character limit.'),

})
const FormikPostUploader = ({navigation}) => {
    const [thumbnailUrl, setThumbNailUrl] = useState(PLACE_HOLDER);
    const [currentLoggedUser, setCurrentLoggedUser] = useState(null)
    const getUsername = () =>{
        const user = firebase.auth().currentUser;
        const unsubscribe = db.collection('users').where('owner_uid','==',user.uid).limit(1).onSnapshot(snapshot=>
            snapshot.docs.map(doc=>{
                setCurrentLoggedUser({
                    username:doc.data().username,
                    profile_picture:doc.data().profile_picture,
                })
            }))
            return unsubscribe
    }
    const handleForm =(values)=>{
        console.log(values);
        navigation.goBack();
    }
    useEffect(()=>{
        getUsername();
    },[])
    const uploadPostToFire = (imageUrl, caption) =>{
        const unsubscribe = db.collection('users').doc(firebase.auth().currentUser.email).collection('posts').add(
            {
                imageUrl:imageUrl,
                user : currentLoggedUser.username,
                profile_picture:currentLoggedUser.profile_picture,
                owner_uid: firebase.auth().currentUser.uid,
                caption:caption,
                createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                likes:0,
                likes_by_users:[],
                comments:[],
            }
        ).then(()=>navigation.goBack())
        return unsubscribe;
    }
  return (
    <Formik
        initialValues={{caption:'',imageUrl:''}}
        onSubmit={(values)=>uploadPostToFire(values.imageUrl, values.caption)}
        validationSchema={uploadPostSchema}
        validateOnMount={true}
    >
        {({handleBlur, handleChange, handleSubmit, values, errors, isValid})=>(
            <>
            <View style={styles.formContainer}>
                <Image source={{uri:validUrl.isUri(thumbnailUrl) ? thumbnailUrl:PLACE_HOLDER }} style={styles.imgStyle}/>
            
                <View style={styles.captionContainer}>
                    <TextInput 
                        style={styles.captionTextStyle}
                        placeholder='Write a caption...'
                        placeholderTextColor='grey'
                        multiline={true}
                        onChangeText={handleChange('caption')}
                        onBlur={handleBlur('caption')}
                        value={values.caption}
                    />
                </View>

                
            </View>
            <Divider width={1} orientation='vertical'/>
            <TextInput
                onChange={(e)=>setThumbNailUrl(e.nativeEvent.text)}
                style={styles.imageTextStyle}
                placeholder='Enter Image url'
                placeholderTextColor='grey'
                onChangeText={handleChange('imageUrl')}
                onBlur={handleBlur('imageUrl')}
                value={values.imageUrl}
            />
            {errors.imageUrl && <Text style={styles.errorImageUrl}>{errors.imageUrl}</Text>}
            <Button onPress={handleSubmit} title='Share' disabled={!isValid}/>
            </>
        )}
    </Formik>
  )
}

export default FormikPostUploader

const styles = StyleSheet.create({
    formContainer:{
        marginVertical:20,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    imgStyle:{
        width:100,
        height:100
    },
    captionTextStyle:{
        fontSize:20,
        color:'white'
    },
    captionContainer:{
        flex:1,
        marginLeft:2,
    },
    imageTextStyle:{
        marginTop:10,
        fontSize:18,
        color:'white'
    },
    errorImageUrl:{
        color:'red',
        fontSize:10
    }
})