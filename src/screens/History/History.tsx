import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Header, Typography, SectionSubtitle } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

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

export default HistoryScreen;
