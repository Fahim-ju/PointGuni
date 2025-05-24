import { Player } from "./Player";

export type RootStackParamList = {
  GridPointView: { players: Player[] };
  StartScreen: undefined;
  ListPointView: undefined;
  PlayerSetupScreen: undefined;
  // add other screens here if needed
};
