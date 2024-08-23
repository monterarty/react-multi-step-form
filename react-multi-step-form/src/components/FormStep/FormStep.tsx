import React from 'react';
import FormField from '../FormField/FormField.tsx';
import { Step } from '../../types/formTypes.ts';
import { useState } from 'react';

interface FormStepProps {
  step: Step;
  onStepValidationChange: (isStepValid: boolean) => void;
}

const FormStep: React.FC<FormStepProps> = ({
  step,
  onStepValidationChange,
}) => {
  const [fieldValidity, setFieldValidity] = useState<{
    [key: string]: boolean;
  }>({});

  const handleFieldChange = (id: string, isValid: boolean) => {
    const updatedValidity = { ...fieldValidity, [id]: isValid };
    setFieldValidity(updatedValidity);

    const allFieldsValid = Object.values(updatedValidity).every(
      (valid) => valid
    );
    onStepValidationChange(allFieldsValid);
  };

  if (step.type == 'product_form_step_standart') {
    return (
      <div className="step flex flex-col grow">
        <div className="flex items-start grow mb-24">
          <div className="grid grid-cols-2 gap-8 w-full xs--flex-col">
            {step.fields &&
              step.fields.map((field) => (
                <FormField
                  key={field.MIGX_id}
                  field={field}
                  onFieldValidChange={handleFieldChange}
                />
              ))}
          </div>
        </div>
      </div>
    );
  } else if (step.type == 'product_form_step_otp') {
    return (
      <div data-otp-step="" className="step hidden flex-col h-full">
        <div className="flex flex-col items-center grow mb-24">
          <p className="mb-8">Код отправлен на&nbsp;номер:</p>
          <div data-otp-phone="" className="heading-style-h3 mb-24">
            +998 (99) 999-99-99
          </div>
          <div className="otp-input ">
            <div className="input-wrapper justify-center is--otp-input">
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="^[0-9]$"
                placeholder=" "
                className="input w-44 w-input"
              />
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="^[0-9]$"
                placeholder=" "
                className="input w-44 w-input"
              />
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="^[0-9]$"
                placeholder=" "
                className="input w-44 w-input"
              />
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="^[0-9]$"
                placeholder=" "
                className="input w-44 w-input"
              />
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="^[0-9]$"
                placeholder=" "
                className="input w-44 w-input"
              />
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="^[0-9]$"
                placeholder=" "
                className="input w-44 w-input"
              />
            </div>
            <div className="mt-16 text-gray text-size-s text-center w-full">
              <div data-otp-wait-msg="">
                Запросить повторно можно через&nbsp;
                <span data-otp-time="">00:00</span>
              </div>
              <div className="hidden" data-otp-request-msg="">
                <a href="#" data-otp-new-btn="" className="text-link">
                  Отправить код повторно
                </a>
              </div>
              <div className="hidden text-red" data-otp-error-msg="">
                Вы&nbsp;превысили количество отправленных кодов, попробуйте
                позже
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <a
            href="#"
            className="prev button w-inline-block is--secondary xs--w-full"
          >
            <span>Назад</span>
          </a>
        </div>
      </div>
    );
  } else {
    return null; // Если тип шага не совпадает ни с одним из условий, не рендерим ничего
  }
};

export default FormStep;
