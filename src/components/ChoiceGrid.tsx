import type { JSX, ReactNode } from 'react';

export interface ChoiceGridProps<T, TId extends string | number = string> {
  readonly label: string;
  readonly choices: readonly T[];
  readonly selectedId: TId | null;
  readonly getId: (choice: T) => TId;
  readonly renderChoice: (choice: T) => ReactNode;
  readonly getAccessibleName: (choice: T) => string;
  readonly onSelect: (choice: T) => void;
}

export function ChoiceGrid<T, TId extends string | number = string>({
  label,
  choices,
  selectedId,
  getId,
  renderChoice,
  getAccessibleName,
  onSelect,
}: ChoiceGridProps<T, TId>): JSX.Element {
  if (choices.length > 4 && import.meta.env.DEV) {
    throw new RangeError('ChoiceGrid는 4개 이하의 선택지만 지원합니다.');
  }

  return (
    <fieldset className="choice-grid">
      <legend>{label}</legend>
      <ul aria-label={`${label} 목록`} className="choice-grid__list">
        {choices.map((choice) => {
          const id = getId(choice);
          return (
            <li key={String(id)}>
              <button
                aria-label={getAccessibleName(choice)}
                aria-pressed={selectedId !== null && id === selectedId}
                className="choice-button"
                onClick={() => onSelect(choice)}
                type="button"
              >
                {renderChoice(choice)}
              </button>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
