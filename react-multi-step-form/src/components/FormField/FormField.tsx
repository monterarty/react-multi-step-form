import React from 'react';
import { Field } from '../../types/formTypes.ts';
import { useRef, useState, useEffect } from 'react';
import { IMask, IMaskInput } from 'react-imask';

interface FormFieldProps {
  field: Field;
  onFieldValidChange: (MIGX_id: string, isValid: boolean) => void;
}

interface IMaskInputElement extends HTMLInputElement {
  element?: HTMLInputElement;
  maskRef?: typeof IMask.InputMask;
  unmaskedValueL?: string;
}

const getFieldAttributes = (fieldType: string) => {
  const attributes = {
    type: 'text',
    autoComplete: '',
    pattern: '',
    inputMode: undefined as HTMLInputElement['inputMode'] | undefined,
  };

  switch (fieldType) {
    case 'phone':
      attributes.type = 'tel';
      attributes.autoComplete = 'tel';
      attributes.inputMode = 'tel';
      break;
    case 'surname':
      attributes.autoComplete = 'family-name';
      attributes.pattern =
        "[^а-яА-ЯЁёІіЇїҐґЄєa-zA-ZẞßÄäÜüÖöÀàÈèÉéÌìÍиÎîÒòÓóÙùÚúÂâÊêÔôÛûËëÏïŸÿÇçÑñœ’`'.\\-\\s]*";
      attributes.inputMode = 'text';
      break;
    case 'name':
      attributes.autoComplete = 'given-name';
      attributes.pattern =
        "[^а-яА-ЯЁёІіЇїҐґЄєa-zA-ZẞßÄäÜüÖöÀàÈèÉéÌìÍиÎîÒòÓóÙùÚúÂâÊêÔôÛûËëÏïŸÿÇçÑñœ’`'.\\-\\s]*";
      attributes.inputMode = 'text';
      break;
    case 'email':
      attributes.type = 'email';
      attributes.autoComplete = 'email';
      attributes.inputMode = 'email';
      break;
    default:
      attributes.inputMode = 'text';
      break;
  }

  return attributes;
};

const FormField: React.FC<FormFieldProps> = ({ field, onFieldValidChange }) => {
  const inputRef = useRef<IMaskInputElement | HTMLInputElement | null>(null);
  const [valid, setValid] = useState(!field.required);
  const [error, setError] = useState('');
  const attributes = getFieldAttributes(field.type);
  const lang = (document.documentElement.lang || 'ru') as 'ru' | 'uz';
  const emailPattern = /^[^@]+@[^@]+\.[^@]{2,}$/;
  const operatorCodes = [
    '20',
    '29',
    '33',
    '34',
    '36',
    '50',
    '55',
    '60',
    '61',
    '62',
    '63',
    '65',
    '66',
    '67',
    '68',
    '69',
    '70',
    '71',
    '72',
    '73',
    '74',
    '75',
    '76',
    '77',
    '78',
    '79',
    '88',
    '90',
    '91',
    '93',
    '94',
    '95',
    '97',
    '98',
    '99',
  ];

  // Восстановление данных из локального хранилища
  useEffect(() => {
    const savedValue = localStorage.getItem(
      `input_${field.MIGX_id}_${field.type}`
    );
    if (inputRef.current && savedValue !== null) {
      if (inputRef.current.type === 'checkbox') {
        if (savedValue === 'true') {
          inputRef.current.checked = true;
        }
      } else {
        if ('element' in inputRef.current) {
          if (inputRef.current.element) {
            console.log(inputRef.current);
            inputRef.current.element.value = savedValue;
          }
        } else {
          inputRef.current.value = savedValue;
        }
      }
      validate(); // Валидация после восстановления
    }
  }, [field.MIGX_id]);

  function getValueFromInput() {
    if (!inputRef.current) return '';
    if ('element' in inputRef.current) {
      return inputRef.current.element ? inputRef.current.element.value : '';
    } else {
      return inputRef.current.value || '';
    }
  }

  function validate() {
    let errorKey = '';

    if (field.required && inputRef.current) {
      const value = getValueFromInput();

      switch (field.type) {
        case 'name':
        case 'surname':
          if (value.length < 1) errorKey = 'text_short';
          else if (value.length > 49) errorKey = 'text_long';
          break;
        case 'email':
          if (!emailPattern.test(value)) errorKey = 'email';
          break;
        case 'phone':
          if (value.replace(/[^0-9]/g, '').length < 9) errorKey = 'phone_short';
          else if (!operatorCodes.includes(value.substring(0, 2)))
            errorKey = 'phone_unvalid';
          break;
        case 'checkbox':
          if (!inputRef.current.checked) errorKey = 'checkbox';
          break;
        default:
          break;
      }
      if (errorKey) {
        setError(errors[errorKey as keyof typeof errors][lang]);
        setValid(false);
      } else {
        setError('');
        setValid(true);
      }
      onFieldValidChange(field.MIGX_id, valid);
    }
  }

  function saveInLocalStorage() {
    if (inputRef.current) {
      if (field.type === 'checkbox') {
        localStorage.setItem(
          `input_${field.MIGX_id}_${field.type}`,
          String(inputRef.current.checked)
        );
      } else {
        const value = getValueFromInput();
        if (value) {
          localStorage.setItem(`input_${field.MIGX_id}_${field.type}`, value);
        } else {
          localStorage.removeItem(`input_${field.MIGX_id}_${field.type}`);
        }
      }
    }
  }

  function handleBlur() {
    validate();
    saveInLocalStorage();
  }

  function handleChange() {
    validate();
    setError('');
    setValid(true);
  }

  function handleLettersKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    // Позволяем комбинации ctrl+a или cmd+a (выделить все)
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
      return; // Не предотвращаем стандартное поведение
    }

    // Проверяем условия запрета ввода нежелательных символов
    if (
      e.keyCode !== 8 && // backspace
      e.keyCode !== 46 && // delete
      (target.value.length >= 49 ||
        (e.key &&
          e.key.match(
            /[^А-яЁёІіЇїҐґЄєa-zA-ZẞßÄäÜüÖöÀàÈèÉéÌìÍÎîÒòÓóÙùÚúÂâÊêÔôÛûËëÏïŸÿÇçÑñœ’`'.\-\s]/
          )))
    ) {
      e.preventDefault(); // Запретить ввод, если условия нарушены
      return;
    }

    // Скрытие ошибки при корректном вводе
    setError('');
  }

  const errors: { [key: string]: { ru: string; uz: string } } = {
    text_short: {
      ru: 'Минимум — 1 символ',
      uz: 'Kamida 1 ta belgidan iborat bo‘lishi kerak',
    },
    text_long: {
      ru: 'Максимум — 49 символов',
      uz: 'Ko‘pi bilan 49 ta belgidan iborat bo‘lishi kerak',
    },
    name: { ru: 'Укажите имя', uz: 'Ismingizni kiriting' },
    surname: { ru: 'Укажите фамилию', uz: 'Familiyangizni kiriting' },
    phone_short: {
      ru: 'Номер телефона должен состоять из 12 цифр',
      uz: 'Telefon raqami 12 ta raqamdan iborat bo‘lishi kerak',
    },
    phone_unvalid: {
      ru: 'Проверьте код оператора',
      uz: 'Operator kodini tekshiring',
    },
    email: {
      ru: 'Проверьте адрес электронной почты',
      uz: 'Elektron pochta manzilini tekshiring',
    },
    checkbox: {
      ru: 'Поле обязательно для заполнения',
      uz: 'Maydonni to‘ldirish majburiy',
    },
  };
  return (
    <>
      <div className="input-wrapper grow is--hidden-label col-span-1 xs--col-span-2 xs--w-full">
        {field.type === 'phone' ? (
          <IMaskInput
            id={`input_${field.MIGX_id}_${field.type}`}
            ref={inputRef}
            mask="00) 000-00-00"
            type={attributes.type}
            autoComplete={attributes.autoComplete}
            data-required={field.required ? 'true' : undefined}
            data-type={field.type}
            placeholder=" "
            onBlur={handleBlur}
            onChange={handleChange}
            className={`input w-input ${error ? 'is--error' : ''}`}
          />
        ) : (
          <input
            id={`input_${field.MIGX_id}_${field.type}`}
            type={attributes.type}
            ref={inputRef}
            autoComplete={attributes.autoComplete}
            pattern={attributes.pattern}
            inputMode={attributes.inputMode}
            data-required={field.required ? 'true' : undefined}
            data-type={field.type}
            placeholder=" "
            onKeyDown={
              ['name', 'surname'].includes(field.type)
                ? handleLettersKeyDown
                : undefined
            }
            onBlur={handleBlur}
            onChange={handleChange}
            className={`input w-input ${error ? 'is--error' : ''}`}
          />
        )}
        {attributes.type === 'tel' && (
          <div className="tel-input-country absolute left-16">+998 (</div>
        )}
        <label className="input-label">
          {field.label}
          {field.required && '*'}
        </label>
        <div className="input-error" style={{ height: error ? 'auto' : 0 }}>
          <span className="input-error-msg" style={{ opacity: error ? 1 : 0 }}>
            {error}
          </span>
        </div>
      </div>
    </>
  );
};
export default FormField;
