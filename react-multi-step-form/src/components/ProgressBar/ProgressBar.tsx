import React from 'react';
import { Step } from '../../types/formTypes.ts';

interface ProgressBarProps {
  data: Step[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ data }) => {
  const stepsLength = data.length;
  const currentStep: number = 1;
  return (
    <div className="my-24 progress">
      <div className="flex items-center justify-between mb-12 xs--flex-col xs--items-start">
        <div className="xs--mb-4">
          <span className="font-medium">Шаг&nbsp;{currentStep + 1}</span>{' '}
          из&nbsp;
          {stepsLength}. {data[currentStep]?.title}
        </div>
        <div className="text-gray text-size-s">
          <span data-step-weight="" className="text-green">
            +{data[currentStep]?.weight}%
          </span>{' '}
          за&nbsp;заполнение шага
        </div>
      </div>
      <div className="h-10 relative rounded-5 bg-blue-light">
        <div
          className="future-progress transition-all-300 h-full w-10 absolute rounded-5 bg-green-medium top-0 left-0"
          style={{ width: `${data[currentStep]?.weight}%` }}
        ></div>
        <div
          className="current-progress transition-all-300 h-full absolute rounded-5 bg-green top-0 left-0"
          style={{ width: '1rem' }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
