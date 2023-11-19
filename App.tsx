import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/redux/store';
import { RootNavigator } from './src';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <StatusBar style="auto" />
        <RootNavigator />
      </PersistGate>
    </ReduxProvider>
  );
}
