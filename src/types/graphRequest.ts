export type GraphRequestProps = {
  currentUrl: string;
  currentSdl: string;
  currentQuery: string;
  setCurrentUrl: React.Dispatch<React.SetStateAction<string>>;
  setCurrentSdl: React.Dispatch<React.SetStateAction<string>>;
  setCurrentQuery: React.Dispatch<React.SetStateAction<string>>;
};
