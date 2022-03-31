import { User } from "src/generated/graphql-hooks";

export type SimpleUser = Pick<
  User,
  "id" | "name" | "birthday" | "email" | "gender" | "height_in_inches"
>;

export const calculateBMR = (user: SimpleUser, weightInPounds: number) => {
  const { gender, birthday, height_in_inches } = user;
  const age = calculateAge(birthday);
  if (gender === "MALE") {
    return calculateMaleBMR(weightInPounds, height_in_inches, age);
  } else if (gender === "FEMALE") {
    return calculateFemaleBMR(weightInPounds, height_in_inches, age);
  } else {
    // for NB, attempt to split the difference
    const maleBMR = calculateMaleBMR(weightInPounds, height_in_inches, age);
    const femaleBMR = calculateFemaleBMR(weightInPounds, height_in_inches, age);

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

const calculateAge = (birthday: string) => {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
