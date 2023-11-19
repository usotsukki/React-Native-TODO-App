import { NavigationContainer } from '@react-navigation/native';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import { moderateScale } from 'react-native-size-matters';
import { NewTask, Home, TaskDetails } from '../screens';
import { HeaderBackground } from '../components';
import { COLORS } from '../theme';

export enum ROUTES {
  HOME = 'Home',
  TASK_DETAILS = 'TaskDetails',
  NEW_TASK = 'NewTask',
}

export type RootParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.TASK_DETAILS]: { id: string };
  [ROUTES.NEW_TASK]: undefined;
};

const defaultScreenOptions: StackNavigationOptions = {
  headerMode: 'screen',
  headerBackground: () => <HeaderBackground />,
  headerBackTitleVisible: false,
  headerTitleStyle: {
    color: COLORS.white,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
};

const Stack = createStackNavigator<RootParamList>();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={defaultScreenOptions}
        initialRouteName={ROUTES.HOME}>
        <Stack.Screen name={ROUTES.HOME} component={Home} />
        <Stack.Screen name={ROUTES.TASK_DETAILS} component={TaskDetails} />
        <Stack.Screen name={ROUTES.NEW_TASK} component={NewTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
