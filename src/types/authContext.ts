export type AuthContextType = {
  token: string | null;
  updateToken: (newToken: string) => void;
  logout: () => void;
  userName: string | null;
  updateUserName: (newName: string) => void;
};
