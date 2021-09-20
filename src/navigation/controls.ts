import {
  createNavigationContainerRef,
  CommonActions,
  StackActions,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const navigationRef = createNavigationContainerRef();

export function goToScreen(name: string, params: object = {}) {
  if (navigationRef.isReady()) {
    if(params?.id && params?.title){
      storeVisitedPage(params.id, params.title);
    }
    navigationRef.dispatch(CommonActions.navigate(name, params));
  }
}

const storeVisitedPage = async (id, title) => {
  id = id.toString();
  title = title.toString();
  try {
    let viewedScreens = await AsyncStorage.getItem('viewedScreens');
    viewedScreens = viewedScreens ? JSON.parse(viewedScreens) : [];
    const repeatedScreenIndex = viewedScreens.findIndex(screen => screen.id == id && screen.title == title);
    console.log(repeatedScreenIndex);
    if (repeatedScreenIndex !== -1) {
      viewedScreens?.splice(repeatedScreenIndex, 1);
    }
    viewedScreens.push({ id, title });
    await AsyncStorage.setItem('viewedScreens', JSON.stringify(viewedScreens));
  } catch (e) {
    console.log('Error storing userLoggedInFlag', e);
  }
};

export function goToSameScreen(name: string, params: object = {}) {
  if (navigationRef.isReady()) {
    if(params?.id && params?.title){
      storeVisitedPage(params.id, params.title);
    }
    navigationRef.dispatch(StackActions.push(name, params));
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
}

export function replaceRoute(name: string, params: object = {}) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

export function resetNavigation() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'AuthStack' }],
      }),
    );
  }
}
