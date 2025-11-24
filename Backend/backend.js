const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public')); // Para imágenes

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const productoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  imagen: String,
  categoria: String,
  rating: Number,
  descripcion: String,
  stock: Number,
  descuento: Number,
  nuevo: Boolean,
  destacado: Boolean
});
const Producto = mongoose.model('Producto', productoSchema);

// Seed inicial
const seedData = [
  { nombre: 'Bitesbox', precio: 2800, imagen: '/Bitesbox.jpg', categoria: 'Caja triangulo', rating: 4.8, descripcion: 'Cajita pirámide con 45 gomitas...', stock: 50, descuento: 0, nuevo: false, destacado: true },
  { nombre: 'BitesboxMix', precio: 4500, imagen: '/BitesboxMix.jpg', categoria: 'Caja triangulo', rating: 4.9, descripcion: 'Mix de gomitas y chocolates...', stock: 30, descuento: 15, nuevo: false, destacado: true },
  { nombre: 'BitesCup', precio: 3200, imagen: '/BitesCup.png', categoria: 'Vasitos', rating: 4.6, descripcion: 'Gomitas surtidas...', stock: 40, descuento: 0, nuevo: true, destacado: false },
  { nombre: 'BitesCupMix', precio: 2200, imagen: '/BitesCupMix.png', categoria: 'Vasitos', rating: 4.5, descripcion: 'Gomitas y chocolates...', stock: 60, descuento: 10, nuevo: false, destacado: false }
];

app.get('/api/productos', async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

app.put('/api/carrito/agregar/:id', async (req, res) => {
  const { cantidad } = req.body || { cantidad: 1 };
  const producto = await Producto.findById(req.params.id);
  if (!producto || producto.stock < cantidad) return res.status(400).json({ error: 'No hay stock' });
  producto.stock -= cantidad;
  await producto.save();
  res.json({ mensaje: 'Agregado', producto });
});

// Inicializar base de datos (solo la primera vez)
const initializeDB = async () => {
  const count = await Producto.countDocuments();
  if (count === 0) await Producto.insertMany(seedData);
};
initializeDB();

app.listen(5000, () => console.log('Backend en puerto 5000'));