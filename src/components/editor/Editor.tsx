import { useTranslations } from 'next-intl';
import style from './Editor.module.scss';
import { KeyValue } from './keyValue/KeyValue';
import Image from 'next/image';
import remove from 'public/remove.png';
import add from 'public/add.png';

interface InputEditor {
  key: string;
  value: string;
  id: string;
}

interface EditorProps {
  headers: InputEditor[];
  handleAddHeader: () => void;
  handleKeyValueChange: (key: string, value: string, id: string) => void;
  handleRemoveHeader: (id: string) => void;
  placeholder: string;
  updateUrlWithoutRedirect: () => void;
}

export const Editor: React.FC<EditorProps> = ({
  headers,
  handleAddHeader,
  handleKeyValueChange,
  handleRemoveHeader,
  placeholder,
  updateUrlWithoutRedirect,
}) => {
  const t = useTranslations('Clients');

  return (
    <div className={style.headerSection}>
      {headers.length === 0 && <button onClick={handleAddHeader}>{t(`add ${placeholder}`)}</button>}

      {headers.map((header) => (
        <div key={header.id} className={style.headerWrapper}>
          <KeyValue
            keyValue={header.key}
            value={header.value}
            placeholder={`key (${placeholder})`}
            onKeyValueChange={(key, value) => handleKeyValueChange(key, value, header.id)}
            updateUrlWithoutRedirect={updateUrlWithoutRedirect}
          />
          <div className={style.imgContainer}>
            <Image
              src={remove}
              alt="remove"
              className={style.img}
              onClick={() => handleRemoveHeader(header.id)}
              data-testid="remove-key"
            />

            <Image
              src={add}
              alt="add"
              className={style.img}
              onClick={handleAddHeader}
              data-testid="add-key"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
