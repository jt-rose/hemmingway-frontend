import { SleepHabit } from "src/generated/graphql-hooks";

export const getSleepQualitySummary = (sleepHabits: SleepHabit[]) => {
  const poor = sleepHabits.filter((sh) => sh.quality === "POOR").length;
  const decent = sleepHabits.filter((sh) => sh.quality === "DECENT").length;
  const good = sleepHabits.filter((sh) => sh.quality === "GOOD").length;

  return {
    poor,
    decent,
    good,
  };
};

export const getSleepAmountSummary = (sleepHabits: SleepHabit[]) => {
  const none = sleepHabits.filter((sh) => sh.amount === "NONE").length;
  const few = sleepHabits.filter((sh) => sh.amount === "FEW").length;
  const full = sleepHabits.filter((sh) => sh.amount === "FULL").length;
  const extra = sleepHabits.filter((sh) => sh.amount === "EXTRA").length;

  return {
    none,
    few,
    full,
    extra,
  };
};
