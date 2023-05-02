export interface ArticulosTienda {
  articuloId: number
  tiendaId: number
  articuloCodigo: string | ''
  tiendaSucursal: string | ''
  stock: number | null
  fecha: string | null
}
