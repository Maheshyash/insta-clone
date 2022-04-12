import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  Alert
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import {firebase} from "../../firebase";
const LoginForm = ({navigation}) => {
  const loginFormScema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(6, "Your password has to have at least 8 Characters"),
  });
  const onLogin = async (email, password)=>{
    try{
      await firebase.auth().signInWithEmailAndPassword(email,password)
      console.log('firebase login successfull ',email, password)
    }catch(error){
      Alert.alert(
        'My lord',
        error.message+' \n\n ...What would you like to do next',
        [
          {
            text:'Ok',
            onPress:()=>console.log('OK'),
            style:'cancel'
          },
          {
            text:'Sign up',onPress:()=>navigation.push('SignupScreen')
          }
        ]
        
        )
    }
  }
  return (
    <View style={styles.wrapper}>
      <Formik
        validationSchema={loginFormScema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password)
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
            <View style={styles.forgotContainer}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </View>
            <Pressable titleSize={20} style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid}>
              <Text style={styles.buttonText}>Log in</Text>
            </Pressable>
            <View style={styles.signupContainer}>
              <Text>Don't have an Account? </Text>
              <TouchableOpacity onPress={()=>navigation.push('SignupScreen')}>
                <Text style={styles.signupText}>Sign Up</Text>
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
export default LoginForm;
