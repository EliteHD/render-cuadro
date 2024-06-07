
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  ContainerOutlined,
  UserOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { ArchiveTick, Book, Clipboard, CloseCircle, Logout, TableDocument, Timer, Timer1, User } from "iconsax-react";

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}


export const ItemsMenuDashboard = [
  // getItem(<Link to="/Dashboard">Inicio</Link>, "1", <HomeOutlined />),
  getItem(<Link to="CuadroNecesidades">Cuadro Necesidades</Link>, "1", <TableDocument size={18} />),
  getItem(<Link to="Inventario">Inventario</Link>, "3", <ArchiveTick size={18} />),
  getItem(<Link to="Users">Usuarios</Link>, "4", <User size={18} />),

  getItem(<Link to="/Logout">Cerrar sesión</Link>, "5", <Logout size={18} />),

];
