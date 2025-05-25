import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Player } from "../types/Player";
import { GameSettings, PointRow } from "../types/Game";
import { Alert } from "react-native";

type GameContextType = {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  updatePlayerPoints: (playerPoints: PointRow[]) => void;
  resetGame: () => void;
  resetPoints: () => void;
  gameSettings: GameSettings;
  setGameSettings: (settings: GameSettings) => void;
  updateGameSettings?: (settings: Partial<GameSettings>) => void;
  resetGameSettings?: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [players, setPlayersState] = useState<Player[]>([]);
  const [gameSettings, setGameSettingsState] = useState<GameSettings>({ minPoints: -999999999, maxPoints: 1000000000 });

  // Load players from AsyncStorage on mount
  useEffect(() => {
    AsyncStorage.getItem("players").then((data) => {
      if (data) setPlayersState(JSON.parse(data));
    });
    AsyncStorage.getItem("gameSettings").then((data) => {
      if (data) setGameSettingsState(JSON.parse(data));
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
      const actualPointRow = playerPoints.map((row, i, arr) => {
        const actualPoint = arr.reduce((sum, r) => sum + (r.point - row.point), 0);
        return {
          ...row,
          point: actualPoint ?? 0,
        };
      });
      const pointRow = actualPointRow.find((row) => row.playerId === player.id);
      if (pointRow) {
        acc.push({
          ...player,
          totalPoints: (player.totalPoints ?? 0) + pointRow.point,
          points: [...(player.points || []), pointRow.point],
        });
      } else {
        acc.push(player);
      }
      return acc as Player[];
    }, [] as Player[]);
    setPlayers(updatedPlayers);
    checkMinPoint(updatedPlayers, gameSettings);
  };

  // Reset game (clear players)
  const resetGame = () => {
    setPlayers([]);
    AsyncStorage.removeItem("players");
  };

  const resetPoints = () => {
    const resetPlayers = players.map((player) => ({
      ...player,
      totalPoints: 0,
      points: [],
    }));
    setPlayers(resetPlayers);
  };

  const checkMinPoint = (players: Player[], gameSettings: GameSettings) => {
    if (!players || !gameSettings) return;

    const minPoint = gameSettings.minPoints;
    const playerBelowMin = players.filter((p) => p.totalPoints && p.totalPoints <= minPoint);
    if (playerBelowMin && playerBelowMin.length > 0) {
      Alert.alert(
        "Player Reached Minimum Point",
        `Player ${playerBelowMin.map((x) => `${x} ,`)} has reached the minimum point (${minPoint}). Do you want to restart or continue?`,
        [
          {
            text: "Restart",
            onPress: () => {
              resetPoints();
            },
          },
          {
            text: "Continue",
            style: "cancel",
            onPress: () => {
              setGameSettings({
                ...gameSettings,
                minPoints: -99999999,
              });
            },
          },
        ]
      );
    }
  };

  const setGameSettings = (settings: GameSettings) => {
    setGameSettingsState(settings);
    AsyncStorage.setItem("gameSettings", JSON.stringify(settings));
  };

  return (
    <GameContext.Provider value={{ players, setPlayers, updatePlayerPoints, resetPoints, resetGame, gameSettings, setGameSettings }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGameContext must be used within GameProvider");
  return ctx;
};
