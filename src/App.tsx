import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Updates from "@/pages/Updates"
import Catalog from "@/pages/Catalog"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/updates" replace />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
    </BrowserRouter>
  )
}
