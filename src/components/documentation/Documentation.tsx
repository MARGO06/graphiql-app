import React from 'react';
import style from '@/components/documentation/Documentation.module.scss';
import { Schema } from '@/types/graphQLSchema';

type DocumentationProps = {
  data: Schema;
};

export const Documentation: React.FC<DocumentationProps> = ({ data }) => {
  return (
    <div className={style.wrapper}>
      {data.map((schema, index) => (
        <div key={index}>
          <h2>{schema.name}</h2>
          <ul>
            {schema.fields.map((field, fieldIndex) => (
              <li key={fieldIndex}>
                {field.name}
                {field.type.name !== null ? `: ${field.type.name}` : ''}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
