import { createBrowserRouter } from "react-router-dom";
import MainDashborad from './dashboard/page/mainDashboard/index'

const Routes = createBrowserRouter([
    {
      path: "/",
      element: <MainDashborad />,
      children: [
      ],
    },
  ]);

export default Routes;