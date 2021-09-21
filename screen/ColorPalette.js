import React from 'react';

import ColorBox from '../components/ColourBox';
import { Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';

const ColorPalette = ({ route, navigation }) => {
  const { paletteName: PaletteName, COLORS } = route.params;
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.textHeader}>{PaletteName} Color</Text>
      <FlatList
        data={COLORS || []}
        renderItem={({ item, index }) => {
          return (
            <ColorBox
              key={index}
              color={item.colorName}
              hexCode={item.hexCode}
            />
          );
        }}
        keyExtractor={(item) => `${item.colorName}-${item.hexCode}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pink: {
    backgroundColor: 'pink',
    color: 'white',
  },
  cyan: {
    backgroundColor: '#2aa198',
  },
  blue: {
    backgroundColor: '#268bd2',
  },
  magnenta: {
    backgroundColor: '#d33682',
  },
  orange: {
    backgroundColor: '#cb4b16',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  colorBox: {
    color: 'white',
    padding: 5,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 3,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    backgroundColor: 'red',
  },
  safeArea: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
});

export default ColorPalette;
