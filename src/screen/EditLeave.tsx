import React, {useState} from 'react';
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

const EditLeave: React.FC = () => {
  const [duration, setDuration] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = () => {
    console.log({duration, reason, status});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Leave</Text>

      <Text style={styles.label}>Duration:</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        placeholder="Enter duration"
      />

      <Text style={styles.label}>Reason:</Text>
      <TextInput
        style={styles.input}
        value={reason}
        onChangeText={setReason}
        placeholder="Enter reason"
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
        <Text style={styles.submitButtonText}>Update Leave</Text>
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
