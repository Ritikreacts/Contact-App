import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import { useRoutes } from "react-router-dom";
import Home from "./Pages/Home";
import Error from "./Components/Error";
import AddContact from "./Pages/AddContact";
import Welcome from "./Components/Welcome";
import ViewContact from "./Pages/ViewContact";
import EditContact from "./Pages/EditContact";
import ImportCSV from "./Components/ImportCSV";

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
          path: "contacts",
          element: <ViewContact />,
        },
        {
          path: "import",
          element: <ImportCSV />,
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
