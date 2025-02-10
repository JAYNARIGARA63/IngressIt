import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Leave = ({route}: any) => {
  const navigation = useNavigation<any>();
  const {token} = route.params;
  console.log(token, 'token-----');

  const [leaves, setLeaves] = useState([
    {id: '1', duration: '2 Days', reason: 'Medical', status: 'Pending'},
    {id: '2', duration: '5 Days', reason: 'Vacation', status: 'Success'},
  ]);

  const handleAddLeave = () => {
    navigation.navigate('AddLeave', {token: token});
  };

  const handleDelete = (id: any) => {
    setLeaves(leaves.filter(leave => leave.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave List</Text>
      <FlatList
        data={leaves}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Text>Duration: {item.duration}</Text>
            <Text>Reason: {item.reason}</Text>
            <Text>Status: {item.status}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddLeave}>
        <Text style={styles.addButtonText}>Add Leave</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#f8f9fa'},
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  listItem: {padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc'},
  buttonContainer: {flexDirection: 'row', marginTop: 10},
  button: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {color: 'white', fontWeight: 'bold'},
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
});

export default Leave;
