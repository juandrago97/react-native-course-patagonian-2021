import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Header, Separator, Typography, SectionSubtitle } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryScreen = () => {
  const [viewedScreens, setViewedScreens] = useState<any[] | null>([]);

  useEffect(() => {
    const getHistoryData = async () => {
      try {
        const historyData = await AsyncStorage.getItem('viewedScreens');
        if (historyData) {
          setViewedScreens(JSON.parse(historyData));
        } else {
          setViewedScreens([]);
        }
      } catch (error) {
        console.log('Error storing userLoggedInFlag', error);
      }
    };
    getHistoryData();
  }, [viewedScreens]);
  return (
    <>
      <Header />
      <SectionSubtitle text="History" />
      <View style={styles.mainContainer}>
        <FlatList
          style={styles.cardListContainer}
          data={viewedScreens}
          renderItem={renderHistoryItems}
        />
      </View>
    </>
  );
};

const renderHistoryItems = ({ item }) => {
  return (
    <TouchableOpacity style={styles.rowCard}>
      <View style={styles.rowText}>
        <Typography>{item.title}</Typography>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardListContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingTop: 20,
    marginHorizontal: 20,
  },
  wholeScreenCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowCard: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 30,
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  rowText: {
    flex: 1,
    flexShrink: 1,
    marginLeft: 15,
  },
});

export default HistoryScreen;
