import { createContext, useEffect, useReducer } from "react";

// const initial_state = {
//     user: localStorage.getItem('user') !== null ? (localStorage.getItem('user') ): null,
//     loading: false,
//     error: null
// }
const initial_state = {
    user: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null,
    loading: false,
    error: null
}
export const AuthContext = createContext(initial_state)

const AuthReducer = (state, action)=>{
    switch(action.type){
        case 'Login_Start':
            return{
                user: null,
                loading: false,
                error: null

            }
            case 'Login_Success':
                return{
                    user: action.payload,
                    loading: false,
                    error: null
    
            }
            case 'Login_Failure':
                    return{
                        user: null,
                        loading: false,
                        error: action.payload
        
            }
            case 'Register_Success':
                    return{
                        user: null,
                        loading: false,
                        error:null
        
            }
            case 'LogOut':
                    return{
                        user: null,
                        loading: false,
                        error:null
        
            }
            case 'UPDATE_USER':
                return {
                    ...state,
                    user: action.payload
                };
            default:
                return state
    }
}

export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(AuthReducer, initial_state)

    useEffect(()=>{
        localStorage.setItem('user' ,JSON.stringify(state.user))
    },[state.user])

    return <AuthContext.Provider value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch
    }}>
        {children}
    </AuthContext.Provider>
}