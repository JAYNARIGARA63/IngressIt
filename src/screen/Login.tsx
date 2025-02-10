import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState<string>('dev+smiley@ingressit.com');
  const [password, setPassword] = useState<string>('12345678');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleLogin = () => {
    console.log('press');

    if (email == '' && password == '') {
      Alert.alert('Enter Email and Password');
    } else {
      const data = {
        email: email,
        password: password,
      };
      setLoading(true);

      axios
        .post('https://ingress.bizcrmapp.com/api/v1/auth/login', data)
        .then((response: {data: any}) => {
          console.log(response?.data);
          if (response.data) {
            navigation.navigate('Leave', {token: response?.data?.data?.token});
          } else {
            Alert.alert('try again!');
          }
          setLoading(false);
        })
        .catch((error: any) => {
          Alert.alert(error);
          setLoading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator size={'large'} color={'#ffffff'} />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
