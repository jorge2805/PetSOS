import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardPage } from "../pages/DashboardPage"
import { JournalPage } from "../pages/JournalPage"
import { ListadoReportesPage } from "../pages/ListadoReportesPage"
import { ProfilePage } from "../pages/ProfilePage"

export const JournalRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<JournalPage/>}/>
        <Route path="/Dashboard" element={<DashboardPage/>}/>
        <Route path="/ListadoReportes" element={<ListadoReportesPage/>}/>
        <Route path="/Profile" element={<ProfilePage/>}/>

        <Route path="/*" element={<Navigate to="/"/>}/>
    </Routes>
  )
}
