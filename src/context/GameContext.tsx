import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Player } from "../types/Player";
import { GameSettings, PointRow } from "../types/Game";

type GameContextType = {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  updatePlayerPoints: (playerPoints: PointRow[]) => void;
  resetGame: () => void;
  gameSettings?: GameSettings;
  setGameSettings?: (settings: GameSettings) => void;
  updateGameSettings?: (settings: Partial<GameSettings>) => void;
  resetGameSettings?: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [players, setPlayersState] = useState<Player[]>([]);

  // Load players from AsyncStorage on mount
  useEffect(() => {
    AsyncStorage.getItem("players").then((data) => {
      if (data) setPlayersState(JSON.parse(data));
    });
  }, []);

  // Save players to AsyncStorage whenever they change
  const setPlayers = (newPlayers: Player[]) => {
    setPlayersState(newPlayers);
    AsyncStorage.setItem("players", JSON.stringify(newPlayers));
  };

  // Update player points and persist
  const updatePlayerPoints = (playerPoints: PointRow[]) => {
    const updatedPlayers = players.reduce((acc, player) => {
      const pointRow = playerPoints.find((row) => row.playerId === player.id);
      if (pointRow) {
        acc.push({ ...player, totalPoints: player.totalPoints ?? 0 + pointRow.point, points: [...(player.points || []), pointRow.point] });
      } else {
        acc.push(player);
      }
      return acc as Player[];
    }, [] as Player[]);
    setPlayers(updatedPlayers);
  };

  // Reset game (clear players)
  const resetGame = () => {
    setPlayers([]);
    AsyncStorage.removeItem("players");
  };

  return <GameContext.Provider value={{ players, setPlayers, updatePlayerPoints, resetGame }}>{children}</GameContext.Provider>;
};

export const useGameContext = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGameContext must be used within GameProvider");
  return ctx;
};
