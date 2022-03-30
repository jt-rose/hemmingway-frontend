type Gender = "MALE" | "FEMALE" | "NB";

export const calculateBMR = (
  gender: Gender,
  weightInPounds: number,
  heightInInches: number,
  age: number
) => {
  if (gender === "MALE") {
    return calculateMaleBMR(weightInPounds, heightInInches, age);
  } else if (gender === "FEMALE") {
    return calculateFemaleBMR(weightInPounds, heightInInches, age);
  } else {
    // for NB, attempt to split the difference
    const maleBMR = calculateMaleBMR(weightInPounds, heightInInches, age);
    const femaleBMR = calculateFemaleBMR(weightInPounds, heightInInches, age);

    const difference = maleBMR - femaleBMR / 2;
    return femaleBMR + difference;
  }
};

const calculateMaleBMR = (
  weightInPounds: number,
  heightInInches: number,
  age: number
) => {
  return 66.47 + 6.24 * weightInPounds + 12.7 * heightInInches - 6.75 * age;
};

const calculateFemaleBMR = (
  weightInPounds: number,
  heightInInches: number,
  age: number
) => {
  return 655.51 + 4.35 * weightInPounds + 4.7 * heightInInches - 4.7 * age;
};
