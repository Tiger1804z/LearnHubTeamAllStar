import {createContext,useContext,useEffect,useState} from 'react';

import { apiFetch } from '../api';

type User = {
  id: string;
  email: string;
  role: "learner" | "creator" | "mentor"| "admin";
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  }
  const fetchMe = async () => {
    const data = await apiFetch<{ok:boolean;user:User}>("/users/me");
    setUser(data.user);
  }

  const login = async (email: string, password: string) => {
    const data = await apiFetch<{ok:boolean;token:string;user:User}>(
      "/users/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  // auto-login si token présent
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await fetchMe();
        }
      } catch {
        // échec du fetchMe, on déconnecte l'utilisateur
        logout();
      }finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout,register }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

async function register(fullName: string, email: string, password: string) {
  await apiFetch("/users/signup", {
    method: "POST",
    body: JSON.stringify({ fullName, email, password }),
  });
}
