import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import CEO from "../pages/CEO";
import CFO from "../pages/CFO";
import CMO from "../pages/CMO";
import COO from "../pages/COO";
import CTO from "../pages/CTO";
import HR from "../pages/HR";
import Finance from "../pages/Finance";
import Sales from "../pages/Sales";
import Marketing from "../pages/Marketing";
import CRM from "../pages/CRM";
import Projects from "../pages/Projects";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import Support from "../pages/Support";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ceo" element={<CEO />} />
        <Route path="/cfo" element={<CFO />} />
        <Route path="/cmo" element={<CMO />} />
        <Route path="/coo" element={<COO />} />
        <Route path="/cto" element={<CTO />} />
        <Route path="/hr" element={<HR />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/support" element={<Support />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}