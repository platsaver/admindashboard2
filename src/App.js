import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import PartnersDashboard from "./pages/PartnersDashboard";
import Standards from "./pages/Standards";
import Metrics from "./pages/Metrics"
import Activities from "./pages/Activities";
import Events from "./pages/Events";
import Reports from "./pages/Reports";
import Main from "./components/layout/Main";
import "antd/dist/reset.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Main />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/partners" element={<PartnersDashboard />} />
          <Route path="/standards" element={<Standards />}/>
          <Route path="/metrics" element={<Metrics />}/>
          <Route path="/activities" element={<Activities />}/>
          <Route path="/events" element={<Events />}/>
          <Route path="/reports" element={<Reports/>}/>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;