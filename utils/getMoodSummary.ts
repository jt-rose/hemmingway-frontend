import { Mood } from "src/generated/graphql-hooks";

export const getMoodSummary = (moods: Mood[]) => {
  const happy = moods.filter((sh) => sh.mood_type === "HAPPY").length;
  const motivated = moods.filter((sh) => sh.mood_type === "MOTIVATED").length;
  const satisfied = moods.filter((sh) => sh.mood_type === "SATISFIED").length;
  const relaxed = moods.filter((sh) => sh.mood_type === "RELAXED").length;
  const tired = moods.filter((sh) => sh.mood_type === "TIRED").length;
  const frustrated = moods.filter((sh) => sh.mood_type === "FRUSTRATED").length;
  const sad = moods.filter((sh) => sh.mood_type === "SAD").length;
  const anxious = moods.filter((sh) => sh.mood_type === "ANXIOUS").length;

  return {
    happy,
    motivated,
    satisfied,
    relaxed,
    tired,
    frustrated,
    sad,
    anxious,
  };
};

export const getStressSummary = (moods: Mood[]) => {
  const high = moods.filter((sh) => sh.stress_level === "HIGH").length;
  const moderate = moods.filter((sh) => sh.stress_level === "MODERATE").length;
  const low = moods.filter((sh) => sh.stress_level === "LOW").length;

  return {
    high,
    moderate,
    low,
  };
};
