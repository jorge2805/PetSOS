import { directRegister, logoutFirebase, signInDirect, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogOut } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = ( email, password) => {
    
    return async(dispatch) => {
        dispatch(checkingCredentials());         
    }
}

export const startGoogleSignIn = () => {
    
    return async(dispatch) => {
        dispatch(checkingCredentials());
        
        const result = await signInWithGoogle();
        const role = 'admin';

        if (!result.ok) {
            return dispatch( logout(result.errorMessage) );
        }

        dispatch(login({...result, role}));
    }
}

export const startDirectSignIn = ({email, password}) => {
    
    return async(dispatch) => {
        dispatch(checkingCredentials());
        
        const result = await signInDirect({email, password});
        const role = 'admin';

        if (!result.ok) {
            return dispatch( logout(result) );
        }

        dispatch(login({...result, role}));
    }
}

export const startFormSignUp = ({email,password,displayName}) => {
    
    return async(dispatch) => {
        dispatch(checkingCredentials());
        
        const {ok, uid, photoURL, errorMessage } = await directRegister({email,password,displayName});
        const role = 'admin';

        if (!ok) return dispatch( logout({errorMessage}));

        dispatch(login({uid, displayName, email, photoURL, role}));
    }
}

export const startLogout = () => {
    
    return async(dispatch) => {
                
        const {ok} = await logoutFirebase();

        if (!ok) return dispatch( logout({errorMessage}));

        dispatch(clearNotesLogOut());
        dispatch(logout());
    }
}
