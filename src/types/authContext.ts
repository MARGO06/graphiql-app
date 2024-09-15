export type AuthContextType = {
  token: string | null;
  updateToken: (newToken: string) => void;
  logout: () => void;
};
