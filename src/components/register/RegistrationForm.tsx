"use client";

import { useState } from "react";
import UserForm from "@/components/register/UserForm";
import EventForm from "@/components/register/EventForm";
import AccountForm from "@/components/register/AccountForm";
import ProgressBar from "@components/ProgressBar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cabin } from "@/app/fonts";
import Button from "@components/Button";
import type { ParticipantForm } from "@/utils/definitions";
import { useMultistepForm } from "@/hooks/useMultistepForm";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import {
  UserRegisterSchema,
  EventRegisterSchema,
  AccountRegisterSchema,
} from "@/utils/zodSchemas";
import { RegisterErrors as Errors } from "@/utils/definitions";
import { RegisterToEvent } from "@/app/actions";

const validationSchemas = [
  UserRegisterSchema,
  EventRegisterSchema,
  AccountRegisterSchema,
] as const;

const INITIAL_DATA: ParticipantForm = {
  name: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  birthDay: "",
  genderId: "",
  categoryId: "",
  tshirtSizeId: "",
  team: "",
  termsAccepted: false,
  createAccount: false,
};

export default function RegistrationForm({ eventId }: { eventId: string }) {
  const [formData, setFormData] = useState({
    ...INITIAL_DATA,
    eventId: eventId,
  });
  const [errors, setErrors] = useState<Partial<Errors>>({});
  const { availableCategories } = useFetchCategories({
    birthDay: formData.birthDay,
    genderId: formData.genderId,
    eventId,
  });
  function updateFields(fields: Partial<ParticipantForm>) {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { steps, step, currentStepIndex, prev, next, isFirstStep, isLastStep } =
    useMultistepForm([
      <UserForm
        key="user"
        {...formData}
        updateFields={updateFields}
        fieldErrors={errors}
      />,
      <EventForm
        key="event"
        {...formData}
        updateFields={updateFields}
        availableCategories={availableCategories}
        fieldErrors={errors}
      />,
      <AccountForm
        key="contact"
        {...formData}
        updateFields={updateFields}
        fieldErrors={errors}
      />,
    ]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const submission = validationSchemas[currentStepIndex].safeParse(formData);
    if (!submission.success) {
      setErrors(submission.error.flatten().fieldErrors);
      return;
    } else if (!isLastStep) {
      setErrors({});
      return next();
    }
    RegisterToEvent(formData);
  }

  return (
    <div className={`min-h-screen bg-gray-100 ${cabin.className}`}>
      <div className="max-w-[500px] mx-auto px-4 py-8 flex flex-col gap-y-4">
        <h1 className="text-3xl font-semibold text-[#043364] mb-6">
          Registrate
        </h1>
        <ProgressBar
          currentStep={currentStepIndex + 1}
          totalSteps={steps.length}
        />
        <form
          onSubmit={onSubmit}
          className="space-y-8 bg-white shadow-md rounded-lg p-6"
        >
          {step}
          <div className="flex justify-between items-center mt-6">
            {!isFirstStep && (
              <Button type="button" onClick={prev} variant="ghost">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
            )}

            <Button type="submit" className="ml-auto" variant="primary">
              {isLastStep ? (
                <>Registrate</>
              ) : (
                <>
                  Siguiente
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
