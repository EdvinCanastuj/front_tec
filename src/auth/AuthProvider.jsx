import { useContext, createContext, useState, useEffect } from "react";
const AuthContext = createContext({
isAuthenticated: false,
});
export function AuthProvider({ children }) {
const [isAuthenticated, setIsAuthenticated] = useState(false);
useEffect(() => {
// You can replace this with your authentication logic
setIsAuthenticated(true);
}, []);
return (
<AuthContext.Provider value={{ isAuthenticated }}>
    {children}
</AuthContext.Provider>
);
}

export const useAuth = () => useContext(AuthContext);

