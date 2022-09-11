import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type CreateWalletStackParamList = {
  CreateWalletScreen: undefined;
  CreateWalletConfirmScreen: undefined;
};

const Stack = createNativeStackNavigator<CreateWalletStackParamList>();

export const CreateWalletStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateWalletScreen"
        component={() => null}
        // component={CreateWalletScreen}
      />
      <Stack.Screen
        name="CreateWalletConfirmScreen"
        component={() => null}
        // component={CreateWalletConfirmScreen}
      />
    </Stack.Navigator>
  );
};
