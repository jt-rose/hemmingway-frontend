import { Dialog, Transition } from "@headlessui/react";
import { AddExercise } from "components/exercise/AddExercise";
import { AddMeal } from "components/meals/AddMeal";
import { AddMood } from "components/mood/AddMood";
import { AddSleepHabit } from "components/sleepHabits/AddSleepHabit";
import { Fragment, useState } from "react";
import { PropTypesWithDate, PropTypesWithModalForm } from "types/propTypes";
import { Modal } from "./MealModalForm";

// ! change later
const getFormType = (formType: "MEAL" | "EXERCISE" | "MOOD" | "SLEEPHABIT") => {
  switch (formType) {
    case "EXERCISE":
      return AddMeal;
    case "MEAL":
      return AddMeal;
    case "MOOD":
      return AddMeal;
    default:
      return AddMeal;
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
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <FormElement gqlClient={props.gqlClient} closeModal={closeModal} />
    </Modal>
  );
}
