import axios from "axios";
import { useRouter } from "next/router";
import { useReducer, createContext, useEffect} from "react";

enum LoginActionKind {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type User = {
  _id: string,
  name: string,
  email: string,
  picture: string,
  role: [string]
}


type LoginAction = {
  type: LoginActionKind;
  payload: User | null;
}

// initial state
const intialState = null;

// create context
const Context = createContext<{
  state: any;
  dispatch: React.Dispatch<any>;
}>({
  state: intialState,
  dispatch: () => null
});

// root reducer
const rootReducer = (state: any, action: LoginAction) => {
  switch (action.type) {
    case LoginActionKind.LOGIN:
      return { ...state, user: action.payload };
    case LoginActionKind.LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

// context provider
const Provider = ({ children  } : any) => {
  const [state, dispatch] = useReducer(rootReducer, intialState);
  const router = useRouter();
  useEffect(() => {
    dispatch({
      type: LoginActionKind.LOGIN,
      payload: JSON.parse(window.localStorage.getItem('user')!),
    })
  }, [])

  axios.interceptors.response.use(
    response => {
      // any status code that lie within the range of 2XX cause this function
      // to trigger
      return response;
    },
    error => {
      // any status codes that falls outside the range of 2xx cause this function
      // to trigger
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get("/api/logout")
            .then((data) => {
              console.log("/401 error > logout");
              dispatch({
                type: LoginActionKind.LOGOUT,
                payload: null
              });
              window.localStorage.removeItem("user");
              router.push("/login");
            })
            .catch((err) => {
              console.log("AXIOS INTERCEPTORS ERR", err);
              reject(error);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get("/api/csrf-token");
      console.log("CSRF", data);
      axios.defaults.headers.post["X-CSRF-Token"] = data.getCsrfToken;
    };
    getCsrfToken();
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
