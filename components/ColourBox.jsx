import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ColorBox = ({ color, hexCode }) => {
  const boxColor = { backgroundColor: hexCode };
  const dark = parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.1;
  return (
    <View style={[boxColor, styles.colorBox]}>
      <Text
        style={dark ? styles.dark : styles.text}
      >{`${color} : ${hexCode}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  dark: {
    color: 'black',
    fontWeight: 'bold',
  },
  colorBox: {
    color: 'white',
    padding: 5,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});
export default ColorBox;
