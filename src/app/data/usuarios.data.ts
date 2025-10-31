// Commit por Carlos - Mock data de usuarios para el sistema
import { Usuario } from '../models/usuario.model';

export const USUARIOS_MOCK: Usuario[] = [
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan@email.com',
    password: '123456',
    telefono: '0981-123456',
    vehiculos: [
      {
        id: 1,
        marca: 'Toyota',
        modelo: 'Corolla',
        anio: 2020,
        placa: 'ABC-123',
        color: 'Blanco'
      },
      {
        id: 2,
        marca: 'Honda',
        modelo: 'Civic',
        anio: 2019,
        placa: 'XYZ-789',
        color: 'Negro'
      }
    ]
  },
  {
    id: 2,
    nombre: 'María',
    apellido: 'González',
    email: 'maria@email.com',
    password: '123456',
    telefono: '0982-234567',
    vehiculos: [
      {
        id: 3,
        marca: 'Nissan',
        modelo: 'Versa',
        anio: 2021,
        placa: 'DEF-456',
        color: 'Rojo'
      }
    ]
  },
  {
    id: 3,
    nombre: 'Carlos',
    apellido: 'Rodríguez',
    email: 'carlos@email.com',
    password: '123456',
    telefono: '0983-345678',
    vehiculos: [
      {
        id: 4,
        marca: 'Chevrolet',
        modelo: 'Onix',
        anio: 2022,
        placa: 'GHI-789',
        color: 'Gris'
      }
    ]
  },
  {
    id: 4,
    nombre: 'Ana',
    apellido: 'Martínez',
    email: 'ana@email.com',
    password: '123456',
    telefono: '0984-456789',
    vehiculos: [
      {
        id: 5,
        marca: 'Ford',
        modelo: 'Focus',
        anio: 2018,
        placa: 'JKL-012',
        color: 'Azul'
      }
    ]
  },
  {
    id: 5,
    nombre: 'Pedro',
    apellido: 'López',
    email: 'pedro@email.com',
    password: '123456',
    telefono: '0985-567890',
    vehiculos: [
      {
        id: 6,
        marca: 'Volkswagen',
        modelo: 'Gol',
        anio: 2020,
        placa: 'MNO-345',
        color: 'Plateado'
      }
    ]
  }
];
