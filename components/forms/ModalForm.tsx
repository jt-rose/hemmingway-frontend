import { AddExercise } from "components/exercise/AddExercise";
import { AddMeal } from "components/meals/AddMeal";
import { AddMood } from "components/mood/AddMood";
import { AddSleepHabit } from "components/sleepHabits/AddSleepHabit";
import { useState } from "react";
import { PropTypesWithModalForm } from "types/propTypes";
import { Modal } from "./Modal";

const getFormType = (formType: "MEAL" | "EXERCISE" | "MOOD" | "SLEEPHABIT") => {
  switch (formType) {
    case "EXERCISE":
      return AddExercise;
    case "MEAL":
      return AddMeal;
    case "MOOD":
      return AddMood;
    default:
      return AddSleepHabit;
  }
};

const getFormButtonTitle = (
  formType: "MEAL" | "EXERCISE" | "MOOD" | "SLEEPHABIT",
  addOrUpdate: "ADD" | "UPDATE"
) => {
  if (addOrUpdate === "ADD") {
    switch (formType) {
      case "EXERCISE":
        return "Add Exercise";
      case "MEAL":
        return "Add Meal";
      case "MOOD":
        return "Add Mood";
      default:
        return "Add Sleep Habit";
    }
  } else {
    switch (formType) {
      case "EXERCISE":
        return "Update Exercise";
      case "MEAL":
        return "Update Meal";
      case "MOOD":
        return "Update Mood";
      default:
        return "Update Sleep Habit";
    }
  }
};

export function ModalForm(props: PropTypesWithModalForm) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  //   function openModal() {
  //     setIsOpen(true);
  //   }

  const FormElement = getFormType(props.formType);
  const buttonTitle = getFormButtonTitle(props.formType, props.addOrUpdate);
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} formTitle={buttonTitle}>
      <FormElement gqlClient={props.gqlClient} closeModal={closeModal} />
    </Modal>
  );
}
