// Commit por Carlos - Definición del modelo Usuario
export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono: string;
  vehiculos: Vehiculo[];
}

export interface Vehiculo {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  placa: string;
  color: string;
}
