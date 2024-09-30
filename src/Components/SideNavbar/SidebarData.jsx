import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";

export const SidebarData = [
    {
        title: 'Inicio',
        path: '/inicio',
        icon: <IoIcons.IoMdHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Personal',
        path: '/personal',
        icon: <IoIcons.IoMdPeople/>,
        cName: 'nav-text'
    },
    {
        title: 'Productos',
        path: '/productos',
        icon: <IoIcons.IoMdPricetags />,
        cName: 'nav-text'
    },
    {
        title: 'Registrar compra',
        path: '/compra',
        icon: <Io5Icons.IoBagAdd />,
        cName: 'nav-text'
    },
    {
        title: 'Registrar venta',
        path: '/venta',
        icon: <Io5Icons.IoBagRemove />,
        cName: 'nav-text'
    },
    {
        title: 'Reporte ventas',
        path: '/reporte',
        icon: <FaIcons.FaInbox />,
        cName: 'nav-text'
    },
]