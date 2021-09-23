import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import COLORS from '../constants/COLOURS';

const ColorPaletteModal = ({ navigation }) => {
  const [textInput, setTextInput] = useState('');
  const [selectedColor, updateSelectedColor] = useState([]);

  const createAlert = (messsage) => {
    Alert.alert('Invalid Input', messsage);
  };

  const addColor = (data) => {
    if (selectedColor.some((item) => item.hexCode === data.hexCode)) {
      return;
    } else {
      updateSelectedColor([...selectedColor, data]);
    }
  };

  const removeColor = (data) => {
    updateSelectedColor(
      selectedColor.filter((item) => item.hexCode !== data.hexCode),
    );
  };
  const addPalette = () => {
    if (!textInput) {
      createAlert('Palette name required');
      return;
    }
    if (selectedColor.length < 3) {
      createAlert('select atleast two colors');
      return;
    }
    const newColorPallete = {
      NAME: textInput,
      data: selectedColor,
    };
    navigation.navigate('Home', { newColorPallete });
  };
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.text}>
          <Text>Name of your color palette</Text>
        </View>
        <TextInput
          style={styles.inputBox}
          onChangeText={setTextInput}
          value={textInput}
          placeholder={'input palette name'}
        />
      </View>
      <FlatList
        style={styles.colors}
        data={COLORS}
        renderItem={({ item }) => (
          <ColorOption
            {...item}
            addColor={() => addColor(item)}
            removeColor={() => {
              removeColor(item);
            }}
          />
        )}
        keyExtractor={(item) => item.colorName + item.hexCode}
      />
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={addPalette}>
          <Text
            style={[styles.textWhite, { fontWeight: 'bold', fontSize: 20 }]}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ColorOption = ({ colorName, addColor, removeColor, hexCode }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    if (isEnabled) {
      removeColor();
    } else {
      addColor();
    }
    setIsEnabled((previousState) => !previousState);
  };
  return (
    <View style={styles.optionStyleMain}>
      <Text>{colorName}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? hexCode : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textWhite: {
    color: 'white',
  },
  main: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
  },
  inputBox: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 4,
    borderRadius: 5,
  },
  text: {
    padding: 5,
  },
  header: {
    // backgroundColor: 'pink',
    padding: 5,
  },
  colors: {
    flexBasis: 'auto',
    flex: 1,
    // backgroundColor: 'gray',
  },
  bottom: {
    padding: 5,
  },
  button: {
    backgroundColor: '#81b0ff',
    borderRadius: 10,
    height: 50,
    margin: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionStyleMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    borderBottomColor: '#767577',
    borderBottomWidth: 1,
  },
  optionStyleText: {
    flexBasis: '80',
  },
  optionStyleSwitch: {
    flexBasis: '20',
  },
});

export default ColorPaletteModal;
