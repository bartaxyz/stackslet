import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateWalletStack } from "./screens/createWallet/CreateWalletStack";
import { WelcomeScreen } from "./screens/welcome/WelcomeScreen";

export type RootStackParamList = {
  WelcomeScreen: undefined;
  CreateWalletStack: undefined;
  ImportWalletStack: undefined;
  DashboardScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="CreateWalletStack" component={CreateWalletStack} />
      <Stack.Screen name="ImportWalletStack" component={CreateWalletStack} />
      {/* <Stack.Screen name="DashboardScreen" component={() => null} /> */}
    </Stack.Navigator>
  );
};
