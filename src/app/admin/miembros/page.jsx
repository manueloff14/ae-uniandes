"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import AsideDashboard from "@/components/global/AsideDashboard";
import HeaderDashboard from "@/components/global/HeaderDashboard";

// Lista de miembros como objetos (para la tabla)
const miembros = [
    {
        foto: "https://placehold.co/40x40",
        nombre: "Juan Pérez",
        correo: "juanperez@example.com",
        fechaCreacion: "2023-01-15",
        rol: "Administrador",
    },
    {
        foto: "https://placehold.co/40x40",
        nombre: "María López",
        correo: "marialopez@example.com",
        fechaCreacion: "2023-02-05",
        rol: "Usuario",
    },
];

// --- Modal para editar usuario (se mantiene igual) ---
function EditUserModal({ user, onClose }) {
    const [nombre, setNombre] = useState(user.nombre);
    const [correo, setCorreo] = useState(user.correo);
    const [rol, setRol] = useState(user.rol);
    const [foto, setFoto] = useState(user.foto);
    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => onClose(), 300);
    };

    const handleSave = () => {
        alert(
            `Guardando cambios:\nNombre: ${nombre}\nCorreo: ${correo}\nRol: ${rol}\nNueva Contraseña: ${nuevaContrasena}`
        );
        handleClose();
    };

    const handleDelete = () => {
        if (confirm("¿Estás seguro de eliminar este usuario?")) {
            alert(`Eliminando a: ${nombre}`);
            handleClose();
        }
    };

    const generarContrasena = () => {
        const caracteres =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        let contrasena = "";
        for (let i = 0; i < 20; i++) {
            contrasena += caracteres.charAt(
                Math.floor(Math.random() * caracteres.length)
            );
        }
        setNuevaContrasena(contrasena);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFoto(URL.createObjectURL(file));
        }
    };

    return (
        <div
            className={`
        fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50
        transition-opacity duration-300 ease-out
        ${
            isOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
        }
      `}
            onClick={(e) => {
                if (e.target === e.currentTarget) handleClose();
            }}
        >
            <div
                className={`
          bg-[#111111] w-[500px] max-w-full p-6 rounded-2xl shadow-lg relative
          transform transition-transform duration-300 ease-out
          ${isOpen ? "scale-100" : "scale-95"}
        `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Cabecera con datos del usuario */}
                <div className="flex flex-col items-start gap-3 mb-8">
                    <img
                        src={user.foto}
                        alt="Foto del usuario"
                        className="rounded-full w-14 h-14 mr-4"
                    />
                    <div>
                        <p className="text-xl font-semibold text-white mb-2">
                            {user.nombre}
                        </p>
                        <p className="text-xs text-gray-400">{user.correo}</p>
                    </div>
                </div>

                {/* Campos editables */}
                <div className="space-y-4 text-sm">
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Foto de Perfil
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full p-3 bg-[#222222] text-white rounded-xl focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-300 mb-3">
                            Nombre Completo
                        </label>
                        <input
                            className="w-full p-3 bg-[#222222] text-white rounded-xl focus:outline-none"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Correo
                        </label>
                        <input
                            className="w-full p-3 bg-[#222222] text-white rounded-xl focus:outline-none"
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Rol
                        </label>
                        <select
                            className="w-full p-3 bg-[#222222] text-white rounded-xl focus:outline-none"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                        >
                            <option value="Administrador">Administrador</option>
                            <option value="Usuario">Usuario</option>
                            <option value="Invitado">Invitado</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Nueva Contraseña
                        </label>
                        <input
                            className="w-full p-3 bg-[#222222] text-white rounded-xl focus:outline-none"
                            type="text"
                            value={nuevaContrasena}
                            onChange={(e) => setNuevaContrasena(e.target.value)}
                        />
                        <button
                            onClick={generarContrasena}
                            className="mt-2 text-sm text-blue-400 underline"
                        >
                            Generar contraseña aleatoria
                        </button>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="mt-6 flex justify-between text-sm font-bold">
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 p-3 border-2 border-transparent bg-red-950 rounded-xl hover:border-[red] transition-all duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 48 48"
                        >
                            <path
                                d="M24 4c-3.5 0-6.4 2.6-6.9 6h-6.8a1.5 1.5 0 000 3h2.1l2.5 26.7c.3 2.8 2.7 5 5.6 5h14.7c2.9 0 5.3-2.2 5.6-5L37.4 13h2.1a1.5 1.5 0 000-3h-6.8C30.4 6.6 27.5 4 24 4z"
                                fill="red"
                            ></path>
                        </svg>
                        <span className="text-[red]">Eliminar usuario</span>
                    </button>
                    <div className="space-x-2 flex items-center">
                        <button
                            onClick={handleClose}
                            className="p-3 border-2 border-gray-600 rounded-xl hover:border-gray-400 transition-all duration-200"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            className="text-black p-3 bg-white rounded-xl border-2 border-white hover:border-gray-400 hover:bg-gray-100 transition-all duration-200"
                        >
                            Guardar cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Modal para agregar nuevo usuario (nueva función) ---
function AddUserModal({ onClose, onAddUser }) {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [rol, setRol] = useState("Usuario");
    const [foto, setFoto] = useState("https://placehold.co/40x40");
    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => onClose(), 300);
    };

    const handleAddUser = () => {
        // Aquí implementarías la lógica real para agregar el usuario
        alert(
            `Agregando usuario:\nNombre: ${nombre}\nCorreo: ${correo}\nRol: ${rol}\nContraseña: ${nuevaContrasena}`
        );
        if (onAddUser) {
            onAddUser({ nombre, correo, rol, foto, nuevaContrasena });
        }
        handleClose();
    };

    const generarContrasena = () => {
        const caracteres =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        let contrasena = "";
        for (let i = 0; i < 20; i++) {
            contrasena += caracteres.charAt(
                Math.floor(Math.random() * caracteres.length)
            );
        }
        setNuevaContrasena(contrasena);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFoto(URL.createObjectURL(file));
        }
    };

    return (
        <div
            className={`
        fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50
        transition-opacity duration-300 ease-out
        ${
            isOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
        }
      `}
            onClick={(e) => {
                if (e.target === e.currentTarget) handleClose();
            }}
        >
            <div
                className={`
          bg-[#111111] w-[500px] max-w-full p-6 rounded-2xl shadow-lg relative
          transform transition-transform duration-300 ease-out
          ${isOpen ? "scale-100" : "scale-95"}
        `}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold text-white mb-4">
                    Agregar Nuevo Miembro
                </h2>

                <div className="space-y-4 text-sm">
                    {/* Campo para foto de perfil */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Foto de Perfil
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full p-3 bg-[#222222] text-white rounded-xl focus:outline-none"
                        />
                    </div>

                    {/* Campo para nombre */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-3">
                            Nombre Completo
                        </label>
                        <input
                            className="w-full p-3 bg-[#222222] text-white rounded-xl focus:outline-none"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    {/* Campo para correo */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Correo
                        </label>
                        <input
                            className="w-full p-3 bg-[#222222] text-white rounded-xl focus:outline-none"
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>

                    {/* Campo para rol */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Rol
                        </label>
                        <select
                            className="w-full p-3 bg-[#222222] text-white rounded-xl focus:outline-none"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                        >
                            <option value="Administrador">Administrador</option>
                            <option value="Usuario">Usuario</option>
                            <option value="Invitado">Invitado</option>
                        </select>
                    </div>

                    {/* Campo para contraseña */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Contraseña
                        </label>
                        <input
                            className="w-full p-3 bg-[#222222] text-white rounded-xl focus:outline-none"
                            type="text"
                            value={nuevaContrasena}
                            onChange={(e) => setNuevaContrasena(e.target.value)}
                        />
                        <button
                            onClick={generarContrasena}
                            className="mt-2 text-sm text-blue-400 underline"
                        >
                            Generar contraseña aleatoria
                        </button>
                    </div>
                </div>

                {/* Botones: Solo Cancelar y Agregar usuario */}
                <div className="mt-6 flex justify-end space-x-2 text-sm font-bold">
                    <button
                        onClick={handleClose}
                        className="p-3 border-2 border-gray-600 rounded-xl hover:border-gray-400 transition-all duration-200"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleAddUser}
                        className="text-black p-3 bg-white rounded-xl border-2 border-white hover:border-gray-400 hover:bg-gray-100 transition-all duration-200"
                    >
                        Agregar usuario
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- Componente principal ---
export default function MiembrosPanel() {
    const { user, loading } = useAuth();
    const [selectedUser, setSelectedUser] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const handleOpenEditModal = (miembro) => {
        setSelectedUser(miembro);
    };

    const handleCloseEditModal = () => {
        setSelectedUser(null);
    };

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    // Si no hay usuario, no renderizamos nada.
    if (!user) {
        return null;
    }

    return (
        <div>
            <AsideDashboard />

            <main className="flex-1 mx-6 pl-[280px]">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-white text-xl">Cargando...</p>
                    </div>
                ) : (
                    <div>
                        <HeaderDashboard title="Miembros" user={user} />

                        <div className="flex gap-6 mt-4">
                            {/* Sección izquierda: Tabla de miembros */}
                            <div className="w-2/3">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-lg font-bold text-white">
                                        Todos los miembros de AE Uniandes
                                    </span>
                                    <button
                                        onClick={handleOpenAddModal}
                                        className="bg-[#111111] hover:bg-[#1b1b1b] text-white px-4 py-2 rounded-full flex items-center gap-2 border border-gray-800"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            x="0px"
                                            y="0px"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 48 48"
                                        >
                                            <path
                                                d="M23.970703 4.9726562A2.0002 2.0002 0 0 0 22 7L22 22L7 22A2.0002 2.0002 0 1 0 7 26L22 26L22 41A2.0002 2.0002 0 1 0 26 41L26 26L41 26A2.0002 2.0002 0 1 0 41 22L26 22L26 7A2.0002 2.0002 0 0 0 23.970703 4.9726562z"
                                                fill="white"
                                            ></path>
                                        </svg>
                                        Nuevo Miembro
                                    </button>
                                </div>

                                <table className="w-full bg-[#111111] rounded-xl overflow-hidden border border-gray-800 border-separate [border-spacing:0]">
                                    <thead className="bg-[#090909]">
                                        <tr>
                                            <th className="p-4 text-left text-white">
                                                <div className="flex items-center gap-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        x="0px"
                                                        y="0px"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 48 48"
                                                    >
                                                        <path
                                                            d="M 24 4 C 18.494917 4 14 8.494921 14 14 C 14 19.505079 18.494917 24 24 24 C 29.505083 24 34 19.505079 34 14 C 34 8.494921 29.505083 4 24 4 z M 24 7 C 27.883764 7 31 10.116238 31 14 C 31 17.883762 27.883764 21 24 21 C 20.116236 21 17 17.883762 17 14 C 17 10.116238 20.116236 7 24 7 z M 12.5 28 C 10.032499 28 8 30.032499 8 32.5 L 8 33.699219 C 8 36.640082 9.8647133 39.277974 12.708984 41.091797 C 15.553256 42.90562 19.444841 44 24 44 C 28.555159 44 32.446744 42.90562 35.291016 41.091797 C 38.135287 39.277974 40 36.640082 40 33.699219 L 40 32.5 C 40 30.032499 37.967501 28 35.5 28 L 12.5 28 z M 12.5 31 L 35.5 31 C 36.346499 31 37 31.653501 37 32.5 L 37 33.699219 C 37 35.364355 35.927463 37.127823 33.677734 38.5625 C 31.428006 39.997177 28.068841 41 24 41 C 19.931159 41 16.571994 39.997177 14.322266 38.5625 C 12.072537 37.127823 11 35.364355 11 33.699219 L 11 32.5 C 11 31.653501 11.653501 31 12.5 31 z"
                                                            fill="white"
                                                        ></path>
                                                    </svg>
                                                    Persona
                                                </div>
                                            </th>
                                            <th className="p-4 text-left text-white">
                                                <div className="flex items-center gap-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        x="0px"
                                                        y="0px"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 48 48"
                                                    >
                                                        <path
                                                            d="M 10.5 8 C 6.9280619 8 4 10.928062 4 14.5 L 4 33.5 C 4 37.071938 6.9280619 40 10.5 40 L 37.5 40 C 41.071938 40 44 37.071938 44 33.5 L 44 14.5 C 44 10.928062 41.071938 8 37.5 8 L 10.5 8 z M 10.5 11 L 37.5 11 C 39.450062 11 41 12.549938 41 14.5 L 41 15.605469 L 24 24.794922 L 7 15.605469 L 7 14.5 C 7 12.549938 8.5499381 11 10.5 11 z M 7 19.015625 L 23.287109 27.820312 A 1.50015 1.50015 0 0 0 24.712891 27.820312 L 41 19.015625 L 41 33.5 C 41 35.450062 39.450062 37 37.5 37 L 10.5 37 C 8.5499381 37 7 35.450062 7 33.5 L 7 19.015625 z"
                                                            fill="white"
                                                        ></path>
                                                    </svg>
                                                    Correo
                                                </div>
                                            </th>
                                            <th className="p-4 text-left text-white">
                                                <div className="flex items-center gap-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        x="0px"
                                                        y="0px"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 48 48"
                                                    >
                                                        <path
                                                            d="M 12.5 6 C 8.9280619 6 6 8.9280619 6 12.5 L 6 35.5 C 6 39.071938 8.9280619 42 12.5 42 L 35.5 42 C 39.071938 42 42 39.071938 42 35.5 L 42 12.5 C 42 8.9280619 39.071938 6 35.5 6 L 12.5 6 z M 12.5 9 L 35.5 9 C 37.450062 9 39 10.549938 39 12.5 L 39 35.5 C 39 37.450062 37.450062 39 35.5 39 L 12.5 39 C 10.549938 39 9 37.450062 9 35.5 L 9 12.5 C 9 10.549938 10.549938 9 12.5 9 z M 15.5 17 A 2.5 2.5 0 0 0 15.5 22 A 2.5 2.5 0 0 0 15.5 17 z M 24 17 A 2.5 2.5 0 0 0 24 22 A 2.5 2.5 0 0 0 24 17 z M 32.5 17 A 2.5 2.5 0 0 0 32.5 22 A 2.5 2.5 0 0 0 32.5 17 z M 15.5 27 A 2.5 2.5 0 0 0 15.5 32 A 2.5 2.5 0 0 0 15.5 27 z M 24 27 A 2.5 2.5 0 0 0 24 32 A 2.5 2.5 0 0 0 24 27 z"
                                                            fill="white"
                                                        ></path>
                                                    </svg>
                                                    Fecha de Creación
                                                </div>
                                            </th>
                                            <th className="p-4 text-left text-white">
                                                <div className="flex items-center gap-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        x="0px"
                                                        y="0px"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 48 48"
                                                    >
                                                        <path
                                                            d="M 24 5 C 17.468202 5 12.927601 6.596132 10.560547 7.7128906 C 8.9891755 8.4541319 8.0073484 10.048803 8.0058594 11.765625 C 8.0038591 15.242056 8 23.058393 8 28 C 8 31.181219 9.7609823 34.119602 11.933594 36.716797 C 14.106205 39.313991 16.773813 41.593428 18.970703 43.285156 C 21.930817 45.564139 26.077834 45.563748 29.037109 43.283203 C 31.232484 41.591459 33.897193 39.313865 36.068359 36.716797 C 38.239525 34.119775 40 31.180447 40 28 L 40 11.773438 C 40 10.054445 39.01892 8.4553962 37.443359 7.7128906 C 35.07468 6.5963814 30.531798 5 24 5 z M 24 8 C 30.044202 8 34.132742 9.470244 36.164062 10.427734 C 36.676502 10.669229 37 11.184428 37 11.773438 L 37 28 C 37 30.005553 35.714162 32.462584 33.767578 34.791016 C 31.820994 37.119447 29.296657 39.295995 27.207031 40.90625 C 25.318307 42.361752 22.690667 42.363173 20.800781 40.908203 C 18.709672 39.297885 16.182264 37.121524 14.234375 34.792969 C 12.286486 32.464413 11 30.005781 11 28 C 11 23.059607 11.00386 15.243147 11.005859 11.767578 C 11.00637 11.1784 11.325215 10.66854 11.839844 10.425781 C 13.868789 9.46854 17.955798 8 24 8 z M 17.564453 16.134766 C 15.345963 16.168723 13.667969 17.251953 13.667969 17.251953 A 1.50015 1.50015 0 1 0 15.332031 19.748047 C 15.332031 19.748047 17.436015 18.260078 19.667969 19.748047 A 1.50015 1.50015 0 1 0 21.332031 17.251953 C 20.39002 16.623945 19.440058 16.309158 18.544922 16.191406 C 18.209246 16.14725 17.88138 16.129915 17.564453 16.134766 z M 30.564453 16.134766 C 28.345963 16.168723 26.667969 17.251953 26.667969 17.251953 A 1.50015 1.50015 0 1 0 28.332031 19.748047 C 28.332031 19.748047 30.436015 18.260078 32.667969 19.748047 A 1.50015 1.50015 0 1 0 34.332031 17.251953 C 33.39002 16.623945 32.440058 16.309158 31.544922 16.191406 C 31.209246 16.14725 30.88138 16.129915 30.564453 16.134766 z M 16.738281 28.097656 C 15.418836 28.177131 14.602313 29.82625 15.601562 30.9375 C 17.954562 33.5535 21.114 36 24 36 C 26.886 36 30.045437 33.5535 32.398438 30.9375 C 33.540437 29.6675 32.311922 27.695016 30.669922 28.166016 C 28.532922 28.778016 26.088 29 24 29 C 21.912 29 19.467078 28.778016 17.330078 28.166016 C 17.124828 28.107141 16.926773 28.086303 16.738281 28.097656 z"
                                                            fill="white"
                                                        ></path>
                                                    </svg>
                                                    Rol
                                                </div>
                                            </th>
                                            <th className="p-4 text-left text-white"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {miembros.map((miembro, index) => (
                                            <tr
                                                key={index}
                                                className="border-b border-gray-500 hover:bg-[#181818]"
                                            >
                                                <td className="py-2 px-4 flex items-center gap-2">
                                                    <img
                                                        src={miembro.foto}
                                                        alt="Foto Miembro"
                                                        className="rounded-full w-10 h-10"
                                                    />
                                                    <span className="text-white">
                                                        {miembro.nombre}
                                                    </span>
                                                </td>
                                                <td className="py-2 px-4 text-white">
                                                    {miembro.correo}
                                                </td>
                                                <td className="py-2 px-4 text-white">
                                                    {miembro.fechaCreacion}
                                                </td>
                                                <td className="py-2 px-4 text-white">
                                                    {miembro.rol}
                                                </td>
                                                <td className="py-2 px-4">
                                                    {/* Botón para abrir el modal */}
                                                    <button
                                                        onClick={() => handleOpenEditModal(miembro)}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            x="0px"
                                                            y="0px"
                                                            width="25"
                                                            height="25"
                                                            viewBox="0 0 48 48"
                                                        >
                                                            <path
                                                                d="M24 34A4 4 0 1024 42 4 4 0 1024 34zM24 20A4 4 0 1024 28 4 4 0 1024 20zM24 6A4 4 0 1024 14 4 4 0 1024 6z"
                                                                fill="white"
                                                            ></path>
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Sección derecha: Panel de información del usuario actual */}
                            <div className="w-1/3 bg-[#111111] p-4 rounded-2xl border border-gray-900">
                                <h2 className="text-xl font-bold mb-4 text-white">
                                    Tú
                                </h2>

                                <div className="flex items-center mb-4">
                                    <img
                                        src="https://placehold.co/60x60"
                                        alt="Foto del usuario"
                                        className="rounded-full w-14 h-14 mr-4"
                                    />
                                    <div>
                                        <p className="font-semibold text-white">
                                            {user?.name || "Nombre del Usuario"}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {user?.email || "email@ejemplo.com"}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-white mb-2">
                                    <span className="font-semibold">Rol: </span>
                                    {user?.role || "Administrador"}
                                </p>
                                <p className="text-white">
                                    <span className="font-semibold">
                                        Fecha de creación:{" "}
                                    </span>
                                    {user?.createdAt?.toString() ||
                                        "2023-01-01"}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Renderiza el modal de edición si hay un usuario seleccionado */}
            {selectedUser && (
                <EditUserModal
                    user={selectedUser}
                    onClose={handleCloseEditModal}
                />
            )}

            {/* Renderiza el modal para agregar nuevo usuario */}
            {showAddModal && <AddUserModal onClose={handleCloseAddModal} />}
        </div>
    );
}
