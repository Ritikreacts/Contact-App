import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { useRoutes } from "react-router-dom";
import Home from "./Components/Home";
import Error from "./Components/Error";
import AddContact from "./Pages/AddContact";
import Welcome from "./Components/Welcome";
import ViewContact from "./Pages/ViewContact";
import EditContact from "./Pages/EditContact";

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "/register",
      element: <SignUp />,
    },
    {
      path: "/home",
      element: <Home />,
      children: [
        {
          path: "",
          element: <Welcome />,
        },
        {
          path: "add",
          element: <AddContact />,
        },
        {
          path: "view",
          element: <ViewContact />,
        },
        {
          path: "import",
          element: <AddContact />,
        },
        {
          path: "edit",
          element: <EditContact />,
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
