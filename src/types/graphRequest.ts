export type GraphRequestProps = {
  currentUrl: string;
  currentSdl: string;
  currentQuery: string;
  currentVariables: string;
  setCurrentUrl: React.Dispatch<React.SetStateAction<string>>;
  setCurrentSdl: React.Dispatch<React.SetStateAction<string>>;
  setCurrentQuery: React.Dispatch<React.SetStateAction<string>>;
  setCurrentVariables: React.Dispatch<React.SetStateAction<string>>;
};
