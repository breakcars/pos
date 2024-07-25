class Auth {
    constructor() {
        this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [
            {
                id: 1,
                nombre: 'Administrador',
                apellido: 'General',
                usuario: 'admin',
                contraseña: '12345678',
                rol: 'admin_principal',
                activo: true
            }
        ];
        this.usuarioActual = this.cargarSesion();  // Cargar la sesión almacenada
    }

    login(usuario, contraseña) {
        const usuarioEncontrado = this.usuarios.find(u => u.usuario === usuario && u.contraseña === contraseña && u.activo);
        if (usuarioEncontrado) {
            this.usuarioActual = usuarioEncontrado;
            this.guardarSesion(usuarioEncontrado);  // Guardar la sesión
            return true;
        }
        return false;
    }

    logout() {
        this.usuarioActual = null;
        this.eliminarSesion();  // Eliminar la sesión almacenada
    }

    obtenerUsuarioActual() {
        return this.usuarioActual;
    }

    esAdmin() {
        return this.usuarioActual && (this.usuarioActual.rol === 'admin' || this.usuarioActual.rol === 'admin_principal');
    }

    esAdminPrincipal() {
        return this.usuarioActual && this.usuarioActual.rol === 'admin_principal';
    }

    // Métodos para gestionar usuarios
    registrarUsuario(nombre, apellido, usuario, contraseña, codigoVendedor, rol) {
        const nuevoId = Math.max(...this.usuarios.map(u => u.id)) + 1;
        const nuevoUsuario = { id: nuevoId, nombre, apellido, usuario, contraseña, codigoVendedor, rol, activo: true };
        this.usuarios.push(nuevoUsuario);
        this.guardarUsuarios();
        return nuevoUsuario;
    }

    cambiarEstadoUsuario(id, activo) {
        const usuario = this.usuarios.find(u => u.id === id);
        if (usuario && usuario.rol !== 'admin_principal') {
            usuario.activo = activo;
            this.guardarUsuarios();
        }
    }

    obtenerUsuarios() {
        return this.usuarios;
    }

    guardarUsuarios() {
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }

    eliminarUsuario(id) {
        const usuario = this.usuarios.find(u => u.id === id);
        if (usuario && usuario.rol !== 'admin_principal') {
            this.usuarios = this.usuarios.filter(u => u.id !== id);
            this.guardarUsuarios();
        }
    }

    // Métodos para gestionar la sesión
    guardarSesion(user) {
        localStorage.setItem('usuarioActual', JSON.stringify(user));
    }

    cargarSesion() {
        const user = localStorage.getItem('usuarioActual');
        return user ? JSON.parse(user) : null;
    }

    eliminarSesion() {
        localStorage.removeItem('usuarioActual');
    }
}
