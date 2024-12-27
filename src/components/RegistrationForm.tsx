"use client";

import { useState, useEffect } from "react";
import ProgressBar from "@components/ProgressBar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input, Select } from "@components/Input";
import { cabin } from "@/app/fonts";
import Button from "@components/Button";
import { calculateAge } from "@/utils/utils";
import { Category } from "@/utils/definitions";
import { getAvailableCategories } from "@/utils/supabase/fetchCategories";
import { TSHIRT_SHIZES } from "@/utils/constants";

interface FormData {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthDate: string | undefined;
  genderId: number | undefined;
  categoryId: number;
  tshirthSize: string;
  team?: string;
  termsAccepted: boolean;
  createAccount: boolean;
}

const TOTAL_STEPS = 3;

export default function RegistrationForm({ eventId }: { eventId: string }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    []
  );

  const [formData, setFormData] = useState<FormData>({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    genderId: 0,
    categoryId: 0,
    tshirthSize: "",
    team: "",
    termsAccepted: false,
    createAccount: false,
  });

  useEffect(() => {
    const birthDate = formData.birthDate;
    const genderId = formData.genderId;
    async function loadCategories(
      eventId: string,
      age: number,
      genderId: number
    ) {
      const data = await getAvailableCategories(eventId, age, genderId);

      setAvailableCategories(data);
    }

    if (birthDate && genderId) {
      const age = calculateAge(birthDate);
      loadCategories(eventId, age, genderId);
    }
  }, [formData.birthDate, formData.genderId]);

  function handleSubmit() {
    return;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    console.log(availableCategories.length);
  };

  const handleSelectChange = (
    name: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  return (
    <div className={`min-h-screen bg-gray-100 ${cabin.className}`}>
      <div className="max-w-[500px] mx-auto px-4 py-8 flex flex-col gap-y-4">
        <h1 className="text-3xl font-semibold text-[#043364] mb-6">
          Registrate
        </h1>
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-white shadow-md rounded-lg p-6"
        >
          {currentStep === 1 && (
            <>
              <div className="flex gap-10">
                <div className="w-full">
                  <label htmlFor="name">Nombre</label>
                  <div>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Ingrese su nombre"
                      className="w-full"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label htmlFor="lastName">Apellidos</label>
                  <div>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Ingrese su apellido"
                      className="w-full"
                      value={formData.lastName}
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <label htmlFor="birthdate">Fecha de nacimiento</label>
                  <Input
                    type="date"
                    onChange={handleInputChange}
                    name="birthDate"
                    value={formData.birthDate}
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <label htmlFor="genderId">Genero</label>
                  <Select
                    options={[
                      { value: undefined, label: "Elija su genero" },
                      { value: 1, label: "Masculino" },
                      { value: 2, label: "Femenino" },
                    ]}
                    onChange={(e) => handleSelectChange("genderId", e)}
                    required
                    name="genderId"
                    value={formData.genderId}
                  />
                </div>
              </div>
            </>
          )}
          {currentStep == 2 && (
            <>
              <div>
                <label htmlFor="category">Categoria</label>
                <Select
                  options={
                    availableCategories.length !== 0
                      ? availableCategories.map((category) => ({
                          value: category.id,
                          label: category.name,
                        }))
                      : [
                          {
                            value: 0,
                            label:
                              "Registre su edad y genero para mostrar categorias",
                          },
                        ]
                  }
                  className="w-full"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={(e) => handleSelectChange("categoryId", e)}
                  required
                />
              </div>
              <div>
                <label htmlFor="tshirtSize">Talla de playera</label>
                <Select
                  options={TSHIRT_SHIZES}
                  className="w-full"
                  name="tshirtSize"
                  value={formData.tshirthSize}
                  onChange={(e) => handleSelectChange("tshirtSize", e)}
                  required
                />
              </div>
              <div>
                <label htmlFor="team">Equipo (opcional)</label>
                <Input
                  type="text"
                  className="w-full"
                  name="team"
                  placeholder="Ingrese su equipo"
                  onChange={handleInputChange}
                  value={formData.team}
                />
              </div>
            </>
          )}
          {currentStep === 3 && (
            <>
              <div>
                <label htmlFor="email">Correo Electrónico</label>
                <Input
                  type="email"
                  className="w-full"
                  name="email"
                  placeholder="Ingrese su correo electrónico"
                  onChange={handleInputChange}
                  value={formData.email}
                />
              </div>
              <div>
                <label htmlFor="phone">Número de teléfono</label>
                <Input
                  type="tel"
                  className="w-full"
                  name="phone"
                  required
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-2">
                <Input type="checkbox" value={0} name="createAccount" />
                <label htmlFor="createAccount">
                  Crear cuenta con esta información
                </label>
              </div>
              <div className="flex gap-2">
                <Input type="checkbox" value={0} name="acceptTerms" />
                <label htmlFor="acceptTerms">
                  Acepto términos y condiciones
                </label>
              </div>
            </>
          )}
          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <Button type="button" onClick={handlePrevious} variant="ghost">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
            )}
            {currentStep < TOTAL_STEPS && (
              <Button
                type="button"
                onClick={handleNext}
                className="ml-auto"
                variant="primary"
              >
                Siguiente
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            {currentStep === TOTAL_STEPS && (
              <Button type="submit" className="ml-auto" variant="primary">
                Registrarse
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
