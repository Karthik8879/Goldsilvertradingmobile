export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Products: undefined;
  Charts: undefined;
  More: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  ProductDetail: { productId: string };
};

export type MoreStackParamList = {
  MoreScreen: undefined;
  KYC: undefined;
  TDSCalculator: undefined;
  BankDetails: undefined;
  EconomicCalendar: undefined;
  Messages: undefined;
  Terminal: undefined;
  Profile: undefined;
};
