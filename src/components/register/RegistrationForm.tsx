"use client";

import { useState } from "react";
import UserForm from "@/components/register/UserForm";
import EventForm from "@/components/register/EventForm";
import ContactForm from "@/components/register/AccountForm";
import ProgressBar from "@components/ProgressBar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cabin } from "@/app/fonts";
import Button from "@components/Button";
import registerParticipant from "@/utils/supabase/registerParticipant";
import { useMultistepForm } from "@/hooks/useMultistepForm";
import { useFetchCategories } from "@/hooks/useFetchCategories";

type FormData = {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthDay: string;
  genderId: string;
  categoryId: string;
  tshirtSizeId: string;
  team?: string;
  termsAccepted: boolean;
  createAccount: boolean;
};

const INITIAL_DATA: FormData = {
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
  const [formData, setFormData] = useState(INITIAL_DATA);
  const { availableCategories } = useFetchCategories({
    birthDay: formData.birthDay,
    genderId: formData.genderId,
    eventId,
  });
  function updateFields(fields: Partial<FormData>) {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { steps, step, currentStepIndex, prev, next, isFirstStep, isLastStep } =
    useMultistepForm([
      <UserForm key="user" {...formData} updateFields={updateFields} />,
      <EventForm
        key="event"
        {...formData}
        updateFields={updateFields}
        availableCategories={availableCategories}
      />,
      <ContactForm key="contact" {...formData} updateFields={updateFields} />,
    ]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isLastStep) return next();
    // Aquí va la función de submit
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
