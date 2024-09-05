import style from './RequestWindow.module.scss';

export const RequestWindow = () => {
  return (
    <>
      <div className={style.selectContainer}>
        <label htmlFor="contentType"></label>
        <select id="contentType">
          <option value="application/json">JSON (application/json)</option>
          <option value="text/plain">TEXT (text/plain)</option>
        </select>
      </div>

      <div className={style.editorContainer}>
        <label htmlFor="requestBody"></label>
        <textarea id="requestBody" rows={10} />
      </div>
    </>
  );
};
