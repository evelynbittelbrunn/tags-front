import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
    const context = useContext(UserContext);

    // Forma que espera para ver se o usuário realmente está logado
    if (context?.login === true) {
        return children;
    } else if (context?.login === false) {
        return <Navigate to="/login" />;
    } else {
        return <></>;
    }

    // Forma que apenas manda o usuário para a página de login
    // return login ? children : <Navigate to="/login" />;
}

export default ProtectedRoute