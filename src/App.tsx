import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useState, useEffect } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  {
    path:"/",
    element:
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>,
    /*element is the React component you want to render for that path*/
    children:[
      {
        path:"",
        element:<Home />,
      },
      {
        path:"profile",
        /* when user goes to "/profile", <Outlet /> will be replaced with <Profile /> */
        element:<Profile />,
      }
    ]
    /*Children components are rendered inside Layout component by using <Outlet /> */
  },
  {
    path: "/login",
    element:<Login />
  },
  {
    path: "/create-account",
    element:<CreateAccount />
  }
])

const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
  }
  body{
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
`;
/* tag` string ${variable} ` : tag function gets access to the string and the variables inside the template, and processes them. */

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;  
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async() =>{
    await auth.authStateReady();
  setLoading(false);
  }
  useEffect(() => {
    init();
  },[]);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App
