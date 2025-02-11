import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const Leave = ({route}: any) => {
  const BASE_URL = 'https://ingress.bizcrmapp.com';
  const navigation = useNavigation<any>();
  const {data} = route.params;
  console.log(data.data, 'data---');

  const [leaves, setLeaves] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    leaveData();
  }, []);

  const leaveData = async () => {
    setLoading(true);
    try {
      const leaveData = await axios.get(`${BASE_URL}/api/v1/leave`, {
        headers: {
          Authorization: `Bearer ${data?.data?.token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(leaveData.data.data, '-----');
      setLeaves(leaveData.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // for Add
  const handleAddLeave = () => {
    navigation.navigate('AddLeave', {data: data});
  };

  //for delete
  const handleDelete = async (id: any) => {
    setDeleting(true);
    try {
      const deleteLeave = await axios.delete(`${BASE_URL}/api/v1/leave/${id}`, {
        headers: {
          Authorization: `Bearer ${data?.data?.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (deleteLeave) {
        leaveData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  //for edit
  const handleEdit = (item: any) => {
    navigation.navigate('EditLeave', {data: data, item});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave List</Text>
      <View style={styles.mainContainer}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#007bff"
            style={styles.loader}
          />
        ) : (
          <FlatList
            data={leaves}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.listItem}>
                <Text>Leave Date: {item.leave_date}</Text>
                <Text>Reason: {item.reason}</Text>
                <Text>Status: {item.status}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleEdit(item)}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                    disabled={deleting}>
                    {deleting ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Delete</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>

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
  loader: {flex: 1},
  mainContainer: {
    flex: 1,
  },
});

export default Leave;
