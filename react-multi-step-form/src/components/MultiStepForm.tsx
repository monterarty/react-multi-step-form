import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar/ProgressBar.tsx';
import FormStep from './FormStep/FormStep.tsx';
import FormSuccess from './FormSuccess/FormSuccess.tsx';
import { JsonField, Field, Step } from '../types/formTypes.ts';
import '../i18n.js';
import { useTranslation } from 'react-i18next';

const MultiStepForm: React.FC = () => {
  const [stepsData, setStepsData] = useState<Step[]>([]);
  const [stepsLength, setStepsLength] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepsValidity, setStepsValidity] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const { t } = useTranslation();

  const showStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleStepValidationChange = (isStepValid: boolean) => {
    const updatedStepsValidity = [...stepsValidity];
    updatedStepsValidity[currentStep] = isStepValid;
    setStepsValidity(updatedStepsValidity);
  };

  const goToNextStep = () => {
    if (stepsValidity) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      alert('Пожалуйста, заполните все поля правильно.');
    }
  };

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((rawData: Step[]) => {
        const processedData = rawData.map((step: Step) => {
          if (step.fields) {
            // Преобразуем JSON-строку в массив объектов JsonField
            step.fields = JSON.parse(step.fields as unknown as string).map(
              (field: JsonField) => ({
                ...field,
                required: field.required === '1',
                valid: false,
              })
            ) as Field[];
          }
          return step;
        });
        setStepsLength(processedData.length);
        setStepsData(processedData);
        setTimeout(() => setLoading(false), 2000); // Пример: 2 секунды загрузки
        showStep(0);
      })
      .catch((error) => console.error('Error loading data:', error));
  }, []);

  if (loading) {
    // Показать индикатор загрузки, пока данные не загружены
    return (
      <div className="flex flex-col h-full">
        <h3 className="skeleton">Заполните заявку на&nbsp;карту HUMO</h3>
        <div className="my-24 progress">
          <div className="flex mb-12 justify-between items-center xs--flex-col">
            <div className="xs--mb-4 skeleton">
              <span className="font-medium">Шаг 1</span> из 2. Заполните личные
              данные
            </div>
            <div className="skeleton text-size-s">
              +80% за&nbsp;заполнение шага
            </div>
          </div>
          <div className="skeleton h-10"></div>
        </div>
        <div className="flex items-start grow mb-24">
          <div className="grid grid-cols-2 gap-8 w-full items-start xs--flex-col grow">
            <div className="skeleton col-span-2 h-56 rounded-8"></div>
            <div className="skeleton col-span-2 h-56 rounded-8"></div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="skeleton h-56 w-110 rounded-8 xs--w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <form className="flex flex-col h-full relative">
      <h3>Заполните заявку на&nbsp;карту HUMO</h3>
      <ProgressBar data={stepsData} />
      <div className="grow flex flex-col">
        <FormStep
          key={stepsData[currentStep].MIGX_id}
          step={stepsData[currentStep]}
          onStepValidationChange={handleStepValidationChange}
        />
        <div className="flex justify-between items-end xs--flex-col">
          {currentStep > 0 && (
            <div
              onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
              className="next button w-inline-block is--secondary xs--w-full"
            >
              <span>{t('form.controls.prev')}</span>
            </div>
          )}
          {currentStep === 0 && (
            <>
              <div className="input-wrapper is--checkbox xs--w-full xs--mb-24">
                <label className="w-checkbox flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    data-type="checkbox"
                    id="input_privacy_order"
                    data-required=""
                    name="privacy"
                    style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
                  />
                  <div className="w-checkbox-input w-checkbox-input--inputType-custom checkbox"></div>
                  <span className="w-checkbox-label w-form-label">
                    Заполняя форму, cоглашаюсь <br />
                    <a href="#" className="text-link">
                      с&nbsp;публичной офертой
                    </a>
                  </span>
                </label>
                <div className="input-error" style={{ height: 0 }}>
                  <span
                    className="input-error-msg"
                    style={{ opacity: 0 }}
                  ></span>
                </div>
              </div>
              <div
                onClick={goToNextStep}
                className="next button w-inline-block is--secondary xs--w-full"
              >
                <span>{t('form.controls.next')}</span>
              </div>
            </>
          )}
        </div>
      </div>
      <FormSuccess />
    </form>
  );
};

export default MultiStepForm;
