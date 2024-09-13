import React, { useState } from 'react';
import style from './KeyValue.module.scss';

interface KeyValueProps {
  keyValue: string;
  value: string;
  placeholder: string;
  onKeyValueChange: (key: string, value: string) => void;
}

export const KeyValue: React.FC<KeyValueProps> = ({
  keyValue,
  value,
  placeholder,
  onKeyValueChange,
}) => {
  const [keyInput, setKeyInput] = useState<string>(keyValue);
  const [valueInput, setValueInput] = useState<string>(value);

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = event.target.value;
    setKeyInput(newKey);
    onKeyValueChange(newKey, valueInput);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValueInput(newValue);
    onKeyValueChange(keyInput, newValue);
  };

  return (
    <div className={style.container}>
      <label>
        <input type="text" value={keyInput} onChange={handleKeyChange} placeholder={placeholder} />
      </label>
      <label>
        <input type="text" value={valueInput} onChange={handleValueChange} placeholder="value" />
      </label>
    </div>
  );
};
