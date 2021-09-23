import React, { useState, useCallback, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const RenderItem = ({ header, colors, push }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        push('ColorPalette', { paletteName: header, COLORS: colors });
      }}
      style={styles.listItem}
    >
      <Text style={styles.header}>{header}</Text>
      <FlatList
        data={colors.slice(0, 5)}
        style={styles.colorBoxs}
        keyExtractor={(item) => item.colorName}
        renderItem={({ item }) => <ColourView hexCode={item.hexCode} />}
      />
    </TouchableOpacity>
  );
};

const ColourView = ({ hexCode }) => {
  // console.log(hexCode);
  return <View style={[styles.box, { backgroundColor: hexCode }]} />;
};

const ListHeader = ({ navigate }) => {
  return (
    <TouchableOpacity onPress={() => navigate('ColorPaletteModal')}>
      <Text style={styles.buttonText}>Create a new Color palette</Text>
    </TouchableOpacity>
  );
};
const Home = ({ navigation: { navigate, push }, route }) => {
  const newColorPallete = route.params?.newColorPallete;
  const SOLARIZED = [
    { colorName: 'Base03', hexCode: '#002b36' },
    { colorName: 'Base02', hexCode: '#073642' },
    { colorName: 'Base01', hexCode: '#586e75' },
    { colorName: 'Base00', hexCode: '#657b83' },
    { colorName: 'Base0', hexCode: '#839496' },
    { colorName: 'Base1', hexCode: '#93a1a1' },
    { colorName: 'Base2', hexCode: '#eee8d5' },
    { colorName: 'Base3', hexCode: '#fdf6e3' },
    { colorName: 'Yellow', hexCode: '#b58900' },
    { colorName: 'Orange', hexCode: '#cb4b16' },
    { colorName: 'Red', hexCode: '#dc322f' },
    { colorName: 'Magenta', hexCode: '#d33682' },
    { colorName: 'Violet', hexCode: '#6c71c4' },
    { colorName: 'Blue', hexCode: '#268bd2' },
    { colorName: 'Cyan', hexCode: '#2aa198' },
    { colorName: 'Green', hexCode: '#859900' },
  ];
  const RAINBOW = [
    { colorName: 'Red', hexCode: '#FF0000' },
    { colorName: 'Orange', hexCode: '#FF7F00' },
    { colorName: 'Yellow', hexCode: '#FFFF00' },
    { colorName: 'Green', hexCode: '#00FF00' },
    { colorName: 'Violet', hexCode: '#8B00FF' },
  ];

  const FRONTEND_MASTERS = [
    { colorName: 'Red', hexCode: '#c02d28' },
    { colorName: 'Black', hexCode: '#3e3e3e' },
    { colorName: 'Grey', hexCode: '#8a8a8a' },
    { colorName: 'White', hexCode: '#ffffff' },
    { colorName: 'Orange', hexCode: '#e66225' },
  ];
  const [apiData, setApiData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const getPalletes = useCallback(async () => {
    try {
      const result = await fetch(
        'https://color-palette-api.kadikraman.vercel.app/palettes',
      );
      const palltes = await result.json();
      if (result.ok) {
        setApiData(
          palltes.map((item) => ({
            NAME: item.paletteName,
            data: item.colors,
          })),
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await getPalletes();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    getPalletes();
    return () => {};
  }, []);

  useEffect(() => {
    if (newColorPallete?.NAME) {
      setApiData((palettes) => [
        newColorPallete,
        ...palettes.filter((item) => item.NAME !== newColorPallete.NAME),
      ]);
    }
  }, [newColorPallete]);
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <FlatList
        data={apiData}
        keyExtractor={(item, index) => item.NAME + index}
        renderItem={({ item }) => {
          let { NAME, data } = item;
          return <RenderItem header={NAME} colors={data} push={push} />;
        }}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={<ListHeader navigate={navigate} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 3,
    marginHorizontal: 4,
    marginBottom: 10,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  colorBoxs: {
    flexDirection: 'row',
  },
  box: {
    height: 30,
    width: 30,
    borderRadius: 2,
    marginHorizontal: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    color: 'teal',
    fontWeight: 'bold',
    padding: 5,
  },
});

export default Home;
