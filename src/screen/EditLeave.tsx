import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

interface StatusOption {
  label: string;
  value: string;
}

const statusOptions: StatusOption[] = [
  {label: 'Pending', value: 'Pending'},
  {label: 'Success', value: 'Success'},
];

const EditLeave: React.FC = ({route}: any) => {
  const {data, item} = route.params;
  console.log(item, 'item-----');

  const [duration, setDuration] = useState<string>('');
  const [reason, setReason] = useState<string | null>('');
  const [status, setStatus] = useState<string | null>(null);
  const [reasonOptions, setReasonOptions] = useState<any>([]);

  useEffect(() => {
    const fetchReasons = async () => {
      try {
        const response = await axios.get(
          'https://ingress.bizcrmapp.com/api/v1/leave-type',
          {
            headers: {
              Authorization: `Bearer ${data?.data?.token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        console.log(response.data.data, 'data-----');

        if (response.data) {
          const formattedData = response.data?.data?.map((item: any) => ({
            label: item.type_name,
            value: item.id,
          }));
          setReasonOptions(formattedData);
        } else {
          console.error('Unexpected API response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching reasons:', error);
      }
    };

    fetchReasons();
  }, []);

  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Duration:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter duration"
        value={duration}
        onChangeText={setDuration}
      />

      <Text style={styles.label}>Reason:</Text>
      <Dropdown
        style={styles.dropdown}
        data={reasonOptions}
        labelField="label"
        valueField="value"
        placeholder="Select Reason"
        value={reason}
        onChange={item => setReason(item.value)}
      />

      <Text style={styles.label}>Status:</Text>
      <Dropdown
        style={styles.dropdown}
        data={statusOptions}
        labelField="label"
        valueField="value"
        placeholder="Select Status"
        value={status}
        onChange={item => setStatus(item.value)}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Edit Leave</Text>
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
  label: {fontSize: 16, fontWeight: 'bold', marginTop: 10},
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    height: 40,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
});

export default EditLeave;
