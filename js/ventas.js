class Ventas {
    constructor() {
        this.ventaActual = JSON.parse(localStorage.getItem('ventaActual')) || { items: [], total: 0, propina: 0, subtotal: 0, codigo: this.generarCodigo() };
        this.ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    }

    agregarItem(item) {
        this.ventaActual.items.push(item);
        this.ventaActual.total += item;
        this.guardarVentaActual();
    }

    eliminarItem(index) {
        const item = this.ventaActual.items.splice(index, 1)[0];
        this.ventaActual.total -= item;
        this.guardarVentaActual();
    }

    finalizarVenta(vendedor) {
        this.ventaActual.fecha = new Date();
        this.ventaActual.vendedor = vendedor;
        this.ventas.push(this.ventaActual);
        localStorage.setItem('ventas', JSON.stringify(this.ventas));
        this.ventaActual = { items: [], total: 0, propina: 0, subtotal: 0, codigo: this.generarCodigo() };
        this.guardarVentaActual();
        return this.ventas[this.ventas.length - 1];
    }

    guardarVentaActual() {
        localStorage.setItem('ventaActual', JSON.stringify(this.ventaActual));
    }

    obtenerVentas() {
        return this.ventas;
    }

    buscarVenta(codigo) {
        return this.ventas.find(venta => venta.codigo === codigo);
    }

    actualizarVenta(venta) {
        const index = this.ventas.findIndex(v => v.codigo === venta.codigo);
        if (index !== -1) {
            this.ventas[index] = venta;
            localStorage.setItem('ventas', JSON.stringify(this.ventas));
        }
    }

    generarCodigo() {
        return 'VC' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
}
