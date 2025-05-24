export type Player = {
  id: number; // Unique identifier for the player
  name: string; // Player's name
  avatar: number; // Index of the player's avatar
  points?: number[]; // Array of points associated with the player
  totalPoints?: number; // Total points accumulated by the player
};
