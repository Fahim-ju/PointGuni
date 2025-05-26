export type GameSettings = {
  maxPoints: number; // Maximum points a player can have
  minPoints: number; // Minimum points a player can have
  allowNegativePoints?: boolean; // Whether players can have negative points
  enableAvatars?: boolean; // Whether avatars are enabled for players
};

export type PointRow = {
  playerId: number;
  point: number;
};

export type Round = {
  roundNumber: number;
  scores: {
    playerId: number;
    points: number;
  }[];
};
