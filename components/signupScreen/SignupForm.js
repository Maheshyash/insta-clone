import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Text,
    Pressable,
    TouchableOpacity,
    Alert,
  } from "react-native";
  import React from "react";
  import { Formik } from "formik";
  import * as Yup from "yup";
  import Validator from "email-validator";
  import {db, firebase} from "../../firebase";
  const SignupForm = ({navigation}) => {
    const signupFormScema = Yup.object().shape({
      email: Yup.string().email().required("An email is required"),
      username:Yup.string().required().min(2, 'A username is required'),
      password: Yup.string()
        .required()
        .min(6, "Your password has to have at least 8 Characters"),
    });
    const getRandomProfilePicture = async () =>{
      const response = await fetch('https://randomuser.me/api')
      const data = await response.json()
      console.log(data,'data')
      return data.results[0].picture.large
    }
    const onSignup = async(email, password, username) =>{
      try{
        const authUser = await firebase.auth().createUserWithEmailAndPassword(email,password);
        console.log('Your account is created...')
        db.collection('users').doc(authUser.user.email).set({
          owner_uid:authUser.user.uid,
          username:username,
          email:authUser.user.email,
          profile_picture: await getRandomProfilePicture()
          })
      }
      catch(error){
        Alert.alert(error.message)
      }
    }
    
    return (
      <View style={styles.wrapper}>
        <Formik
          validationSchema={signupFormScema}
          initialValues={{ email: "", username:"", password: "" }}
          onSubmit={(values) => {
            onSignup(values.email, values.password, values.username)
          }}
          validateOnMount={true}
        >
          {({ handleChange, handleSubmit, handleBlur, values, isValid }) => (
            <>
              <View style={[styles.inputField, styles.isborderColor((values.email.length<  1 || Validator.validate(values.email)))]}>
                <TextInput
                  placeholderTextColor="#444"
                  placeholder="Phone number, username or email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoFocus={true}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </View>
              <View style={[styles.inputField, styles.isborderColor(values.username.length<1 || values.username.length>=2)]}>
                <TextInput
                  placeholderTextColor="#444"
                  placeholder="username"
                  autoCapitalize="none"
                  textContentType="username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
              </View>
              <View style={[styles.inputField,styles.isborderColor(1>values.password.length||values.password.length>=6)]}>
                <TextInput
                  placeholderTextColor="#444"
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  textContentType="password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
              </View>
              <Pressable titleSize={20} style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid}>
                <Text style={styles.buttonText}>Sign up</Text>
              </Pressable>
              <View style={styles.signupContainer}>
                <Text>Already have an Account? </Text>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                  <Text style={styles.signupText}>Log in</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    );
  };
  const styles = StyleSheet.create({
    wrapper: {
      marginTop: 80,
    },
    inputField: {
      borderRadius: 4,
      padding: 12,
      backgroundColor: "#FAFAFA",
      marginBottom: 10,
      borderWidth: 1,
    },
    forgotContainer: {
      alignItems: "flex-end",
      marginBottom: 30,
    },
    forgotText: {
      color: "#6BB0F5",
    },
    button: isValid=>({
      backgroundColor: isValid ?"#0096F6":"#9ACAF7",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 42,
      borderRadius: 4,
    }),
    buttonText: {
      fontWeight: "600",
      color: "#fff",
      fontSize: 20,
    },
    signupContainer: {
      marginTop: 50,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    signupText: {
      color: "#6BB0F5",
      fontWeight: "600",
    },
    isborderColor:isValid=>({
        borderColor:isValid? '#ccc': 'red'
    })
  });
  export default SignupForm;
  