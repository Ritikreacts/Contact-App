import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { useRoutes } from "react-router-dom";
import Home from "./Components/Home";
import Error from "./Components/Error";
import AddContact from "./Pages/AddContact";

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "register",
      element: <SignUp />,
    },
    {
      path: "home",
      element: <Home />,
      children: [
        {
          path: "home/add",
          element: <AddContact />,
        },
      ],
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);
  return element;
}

export default App;
