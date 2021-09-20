import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BooksStack from './BooksStack';
import CharactersStack from './CharactersStack';
import { HistoryScreen } from '../screens';
import { colors } from '../utils/theme';

type Route = RouteProp<Record<string, object | undefined>, string>;

const Tab = createBottomTabNavigator();

const getIconName = (routeName: string) => {
  let iconName = '';
  switch (routeName) {
    case 'BooksTab':
      iconName = 'menu-book';
      break;
    case 'CharactersTab':
      iconName = 'badge';
      break;
    case 'HistoryTab':
      iconName = 'history';
      break;
    default:
      iconName = 'help-outline';
      break;
  }

  return iconName;
};

const navigatorScreenOptions = ({ route }: { route: Route }) => ({
  tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
    const iconName = getIconName(route.name);
    const iconSize = focused ? size * 1.2 : size;
    return <MaterialIcon name={iconName} size={iconSize} color={color} />;
  },
  tabBarAllowFontScaling: false,
  tabBarActiveTintColor: colors.primaryYellow,
  tabBarInactiveTintColor: colors.primaryYellow,
  tabBarLabelStyle: {
    fontSize: 12,
  },
  tabBarInactiveBackgroundColor: colors.primaryRed,
  tabBarActiveBackgroundColor: colors.strongPrimaryRed,
  headerShown: false,
});

const TabNavigator = () => {
  //<Tab.Screen name="BooksTab" component={BookListScreen} options={{ title: 'Books' }} />
  return (
    <Tab.Navigator screenOptions={navigatorScreenOptions}>
      <Tab.Screen name="BooksTab" component={BooksStack} options={{ title: 'Books' }} />
      <Tab.Screen
        name="CharactersTab"
        component={CharactersStack}
        options={{ title: 'Characters' }}
      />
      <Tab.Screen name="HistoryTab" component={HistoryScreen} options={{ title: 'History' }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
