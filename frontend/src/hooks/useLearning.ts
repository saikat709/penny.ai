import { useState, useEffect } from 'react';

const STORAGE_KEY = 'learning_progress_v1';

type LevelProgress = {
  progress: number; // 0-100
  completed: boolean;
};

type ProgressMap = Record<string, LevelProgress>;

function readStorage(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ProgressMap;
  } catch (e) {
    console.error('Failed to read learning progress', e);
    return {};
  }
}

function writeStorage(map: ProgressMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (e) {
    console.error('Failed to save learning progress', e);
  }
}

export default function useLearning() {
  const [progressMap, setProgressMap] = useState<ProgressMap>({});

  useEffect(() => {
    setProgressMap(readStorage());
  }, []);

  useEffect(() => {
    writeStorage(progressMap);
  }, [progressMap]);

  const get = (levelId: string) => {
    return progressMap[levelId] || { progress: 0, completed: false };
  };

  const set = (levelId: string, progress: number) => {
    setProgressMap((prev) => ({
      ...prev,
      [levelId]: {
        progress: Math.max(0, Math.min(100, Math.round(progress))),
        completed: progress >= 100 || (prev[levelId] && prev[levelId].completed),
      },
    }));
  };

  const markComplete = (levelId: string) => {
    setProgressMap((prev) => ({
      ...prev,
      [levelId]: { progress: 100, completed: true },
    }));
  };

  const reset = (levelId?: string) => {
    if (levelId) {
      setProgressMap((prev) => {
        const next = { ...prev };
        delete next[levelId];
        return next;
      });
    } else {
      setProgressMap({});
    }
  };

  const getAll = () => progressMap;

  return { get, set, markComplete, reset, getAll } as const;
}
