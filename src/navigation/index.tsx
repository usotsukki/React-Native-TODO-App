import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NewTask, Home, TaskDetails } from '../screens';

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

const Stack = createStackNavigator<RootParamList>();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ROUTES.HOME} component={Home} />
        <Stack.Screen name={ROUTES.TASK_DETAILS} component={TaskDetails} />
        <Stack.Screen name={ROUTES.NEW_TASK} component={NewTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
