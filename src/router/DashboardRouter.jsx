import { Routes, Route } from "react-router-dom";
import DashboardMain from "@pages/DashboardMain";
import DashboardRoles from "@pages/DashboardRoles";
import DashboardUsers from "@pages/DashboardUsers";
import AddUser from "@pages/AddUser";
import EditUser from "@pages/EditUser";
import DashboardReports from '@pages/DashboardReports';
import MainNecesidades from "@pages/dashboard/cuadronecesidades/MainNecesidades";
import MainUsuarios from "@pages/dashboard/usuarios/MainUsuarios";
import MainInventario from "@pages/dashboard/Inventario/MainInventario";
import MainArticulos from "@pages/dashboard/articulos/MainArticulos";
import CreateArticuloForm from "@pages/dashboard/Inventario/CreateArticuloForm";
import CreateUsuarioForm from "@pages/dashboard/usuarios/CreateUsuarioForm";

export default function DashboardRouter() {
  return (
    <Routes>
      <Route index element={<DashboardMain />} />
      <Route path="/Users" element={<MainUsuarios />} />
      <Route path="/editUsuario/:id" element={<CreateUsuarioForm />} />
      <Route path="/Inventario" element={<MainInventario />} />
      <Route path="/AddArticulo" element={<CreateArticuloForm />} />
      <Route path="/editArticulo/:id" element={<CreateArticuloForm />} />

      <Route path="/CuadroNecesidades" element={<MainNecesidades />} />
      <Route path="/Roles" element={<DashboardRoles />} />
      <Route path="/Articulos" element={<MainArticulos />} />
      <Route path="/Reportes/:id" element={<EditUser />} />

    </Routes>
  )
}
