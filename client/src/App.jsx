// src/App.jsx (Best Practice Version)

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Layouts and Pages
import SpaceBiologyEngine from "./pages/Dashboard"; // Your existing component (assumes it includes the sidebar)
import OSDRDetailsPage from "./pages/Details";
import NoSidebarLayout from "./layouts/NoSidebarLayout"; // The new layout component
import NotFoundPage from "./pages/404";

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard Route (Uses your existing component, which has the sidebar) */}
        <Route path="/" element={<SpaceBiologyEngine />} />

        {/* OSDR Details Route (Uses the new layout which has NO sidebar) */}
        <Route
          path="/osdr/:osdrId"
          element={
            <NoSidebarLayout>
              <OSDRDetailsPage />
            </NoSidebarLayout>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
