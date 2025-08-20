"use client"

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Star, Menu, X, Heart, Gift, Zap } from 'lucide-react';

// Datos de productos dulces
const productos = [
  {
    id: 1,
    nombre: "Gominolas Arcoíris",
    precio: 2800,
    imagen: "🍬",
    categoria: "gominolas",
    rating: 4.8,
    descripcion: "Deliciosas gominolas con sabores frutales"
  },
  {
    id: 2,
    nombre: "Chocolate Premium",
    precio: 4500,
    imagen: "🍫",
    categoria: "chocolates",
    rating: 4.9,
    descripcion: "Chocolate belga de la más alta calidad"
  },
  {
    id: 3,
    nombre: "Piruletas Gigantes",
    precio: 3200,
    imagen: "🍭",
    categoria: "piruletas",
    rating: 4.6,
    descripcion: "Piruletas coloridas de sabores únicos"
  },
  {
    id: 4,
    nombre: "Caramelos de Miel",
    precio: 2200,
    imagen: "🍯",
    categoria: "caramelos",
    rating: 4.5,
    descripcion: "Caramelos suaves con miel natural"
  },
  {
    id: 5,
    nombre: "Algodón de Azúcar",
    precio: 1800,
    imagen: "🍥",
    categoria: "algodones",
    rating: 4.4,
    descripcion: "Esponjoso algodón de azúcar rosa"
  },
  {
    id: 6,
    nombre: "Ositos de Goma",
    precio: 3000,
    imagen: "🧸",
    categoria: "gominolas",
    rating: 4.7,
    descripcion: "Clásicos ositos de goma multicolores"
  },
  {
    id: 7,
    nombre: "Trufas de Chocolate",
    precio: 5200,
    imagen: "🍫",
    categoria: "chocolates",
    rating: 4.9,
    descripcion: "Exquisitas trufas rellenas de crema"
  },
  {
    id: 8,
    nombre: "Malvaviscos",
    precio: 2400,
    imagen: "🤍",
    categoria: "malvaviscos",
    rating: 4.3,
    descripcion: "Suaves malvaviscos para tostar"
  }
];

const BitesBoxStore = () => {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  const [pedidoEnviado, setPedidoEnviado] = useState(false);
  const [animacionCarrito, setAnimacionCarrito] = useState(false);
  const [productoAgregado, setProductoAgregado] = useState(null);
  const [paginaCargada, setPaginaCargada] = useState(false);

  // Animación de entrada de la página
  useEffect(() => {
    const timer = setTimeout(() => {
      setPaginaCargada(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Función para agregar al carrito con efectos
  const agregarAlCarrito = (producto) => {
    const itemExistente = carrito.find(item => item.id === producto.id);
    if (itemExistente) {
      setCarrito(carrito.map(item =>
        item.id === producto.id 
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }

    // Efectos visuales
    setAnimacionCarrito(true);
    setProductoAgregado(producto);
    
    setTimeout(() => {
      setAnimacionCarrito(false);
      setProductoAgregado(null);
    }, 1200);
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad === 0) {
      setCarrito(carrito.filter(item => item.id !== id));
    } else {
      setCarrito(carrito.map(item =>
        item.id === id 
          ? { ...item, cantidad: nuevaCantidad }
          : item
      ));
    }
  };

  const totalCarrito = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  const cantidadItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  const productosFiltrados = categoriaSeleccionada === 'todos' 
    ? productos 
    : productos.filter(producto => producto.categoria === categoriaSeleccionada);

  const procesarPedido = () => {
    if (carrito.length === 0) return;
    
    setPedidoEnviado(true);
    setCarrito([]);
    setMostrarCarrito(false);
    
    setTimeout(() => setPedidoEnviado(false), 3000);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 relative overflow-hidden transition-all duration-1000 ${
      paginaCargada ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      {/* Splash de carga inicial */}
      {!paginaCargada && (
        <div className="fixed inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 flex items-center justify-center z-50">
          <div className="text-center animate-pulse">
            <div className="text-8xl mb-4 animate-bounce">🍭</div>
            <h1 className="text-4xl font-bold text-white mb-2">BitesBox</h1>
            <p className="text-white">Cargando dulces...</p>
            <div className="mt-4 flex justify-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}
      {/* Elementos decorativos flotantes */}
      <div className={`fixed inset-0 pointer-events-none overflow-hidden transition-all duration-1000 delay-300 ${
        paginaCargada ? 'opacity-20 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-20 animate-bounce"
            style={{
              left: `${10 + (i * 6)}%`,
              top: `${10 + (i * 3)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          >
            {['🍭', '🍬', '🍫', '🧸', '🍯'][i % 5]}
          </div>
        ))}
      </div>

      {/* Mensaje de pedido enviado */}
      {pedidoEnviado && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-white text-center px-8 py-6 rounded-3xl shadow-2xl border-4 border-pink-300 animate-bounce">
            <div className="text-4xl mb-3">🎉🍭🎉</div>
            <h3 className="text-2xl font-bold text-pink-600 mb-2">¡Pedido Enviado!</h3>
            <p className="text-gray-600">Tu dulce orden está en camino</p>
          </div>
        </div>
      )}

      {/* Notificación producto agregado */}
      {productoAgregado && (
        <div className="fixed top-20 right-4 z-50 animate-pulse">
          <div className="bg-white rounded-2xl shadow-xl p-4 border-2 border-pink-300">
            <div className="flex items-center space-x-3">
              <div className="text-3xl animate-spin">{productoAgregado.imagen}</div>
              <div>
                <p className="font-bold text-pink-600">¡Agregado!</p>
                <p className="text-sm text-gray-600">{productoAgregado.nombre}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white shadow-lg transition-all duration-1000 delay-500 ${
        paginaCargada ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'
      }`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl animate-pulse">🍭</div>
              <div>
                <h1 className="text-3xl font-bold">BitesBox</h1>
                <p className="text-sm opacity-90">Dulces para todos</p>
              </div>
            </div>
            
            {/* Navegación */}
            <nav className="hidden md:flex space-x-6">
              {[
                { key: 'todos', label: 'Todos' },
                { key: 'chocolates', label: 'Chocolates' },
                { key: 'gominolas', label: 'Gominolas' },
                { key: 'piruletas', label: 'Piruletas' },
                { key: 'caramelos', label: 'Caramelos' }
              ].map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setCategoriaSeleccionada(cat.key)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 hover:bg-white hover:text-purple-600 transform hover:scale-105 ${
                    categoriaSeleccionada === cat.key ? 'bg-white text-purple-600' : ''
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </nav>

            {/* Carrito */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMostrarCarrito(!mostrarCarrito)}
                className={`relative p-3 bg-pink-500 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 ${
                  animacionCarrito ? 'animate-bounce scale-125' : ''
                }`}
              >
                <ShoppingCart className="w-6 h-6 text-white" />
                {cantidadItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                    {cantidadItems}
                  </span>
                )}
              </button>
              
              <button
                className="md:hidden"
                onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
              >
                {menuMovilAbierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Menu móvil */}
          {menuMovilAbierto && (
            <div className="md:hidden mt-4 pb-4 animate-pulse">
              <nav className="grid grid-cols-2 gap-3">
                {[
                  { key: 'todos', label: 'Todos' },
                  { key: 'chocolates', label: 'Chocolates' },
                  { key: 'gominolas', label: 'Gominolas' },
                  { key: 'piruletas', label: 'Piruletas' }
                ].map(cat => (
                  <button
                    key={cat.key}
                    onClick={() => {setCategoriaSeleccionada(cat.key); setMenuMovilAbierto(false);}}
                    className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg text-sm transition-colors"
                  >
                    {cat.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className={`py-16 text-center transition-all duration-1000 delay-700 ${
        paginaCargada ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold text-purple-700 mb-6 animate-bounce">
            ¡Bienvenido a BitesBox! 🍭
          </h2>
          <p className="text-2xl text-gray-600 mb-8">
            Los dulces más deliciosos te están esperando
          </p>
          
          <div className="text-6xl mb-8 space-x-4">
            <span className="inline-block animate-bounce" style={{ animationDelay: '0s' }}>🍭</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>🍬</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>🍫</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.6s' }}>🧸</span>
          </div>

          <div className="flex justify-center space-x-8 text-purple-600">
            <div className="text-center transform hover:scale-110 transition-transform">
              <Gift className="w-10 h-10 mx-auto mb-2" />
              <p className="font-semibold">Envío Rápido</p>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform">
              <Heart className="w-10 h-10 mx-auto mb-2" />
              <p className="font-semibold">Calidad Premium</p>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform">
              <Zap className="w-10 h-10 mx-auto mb-2" />
              <p className="font-semibold">Sabor Increíble</p>
            </div>
          </div>
        </div>
      </section>

      <div className={`container mx-auto px-4 py-8 flex relative transition-all duration-1000 delay-1000 ${
        paginaCargada ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>
        {/* Lista de productos */}
        <main className="flex-1">
          <h2 className="text-3xl font-bold text-center mb-8 text-purple-700">
            {categoriaSeleccionada === 'todos' ? '🍭 Todos los Dulces 🍭' : 
             `🍬 ${categoriaSeleccionada.charAt(0).toUpperCase() + categoriaSeleccionada.slice(1)} 🍬`}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productosFiltrados.map((producto, index) => (
              <div 
                key={producto.id} 
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 transform hover:-translate-y-2 hover:scale-105 border-2 border-pink-100 ${
                  paginaCargada ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  animationDelay: `${1200 + (index * 100)}ms`,
                  transition: 'all 0.6s ease-out'
                }}
              >
                <div className="text-6xl text-center mb-4 hover:animate-spin transition-transform duration-300">
                  {producto.imagen}
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-purple-800">
                  {producto.nombre}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm">
                  {producto.descripcion}
                </p>
                
                <div className="flex items-center mb-4 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(producto.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-gray-600">{producto.rating}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">
                    ${producto.precio.toLocaleString()}
                  </span>
                  <button
                    onClick={() => agregarAlCarrito(producto)}
                    className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-xl hover:from-pink-500 hover:to-purple-600 transition-all duration-300 flex items-center space-x-2 shadow-lg transform hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Panel del carrito */}
        {mostrarCarrito && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:relative md:bg-transparent md:inset-auto">
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 md:sticky md:top-4 md:rounded-2xl">
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-purple-700">Mi Carrito</h3>
                    <p className="text-gray-600">{cantidadItems} productos</p>
                  </div>
                  <button
                    onClick={() => setMostrarCarrito(false)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {carrito.length === 0 ? (
                    <div className="text-center text-gray-500 mt-12">
                      <div className="text-6xl mb-4 animate-bounce">🛒</div>
                      <p className="text-lg">Tu carrito está vacío</p>
                      <p className="text-sm mt-2">¡Agrega algunos dulces!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {carrito.map(item => (
                        <div key={item.id} className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                          <div className="flex items-center space-x-4">
                            <div className="text-3xl">{item.imagen}</div>
                            <div className="flex-1">
                              <h4 className="font-bold text-purple-800">{item.nombre}</h4>
                              <p className="text-purple-600 font-semibold">
                                ${item.precio.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                                className="w-8 h-8 bg-pink-400 text-white rounded-full hover:bg-pink-500 flex items-center justify-center"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-bold text-purple-800">
                                {item.cantidad}
                              </span>
                              <button
                                onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                                className="w-8 h-8 bg-pink-400 text-white rounded-full hover:bg-pink-500 flex items-center justify-center"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="font-bold text-purple-600">
                              ${(item.precio * item.cantidad).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {carrito.length > 0 && (
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-purple-800">Total:</span>
                      <span className="text-3xl font-bold text-purple-600">
                        ${totalCarrito.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={procesarPedido}
                      className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-lg transform hover:scale-105"
                    >
                      Confirmar Pedido 🚀
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 transition-all duration-1000 delay-1500 ${
        paginaCargada ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>
        <div className="container mx-auto px-4 text-center">
          <div className="text-4xl mb-4 animate-pulse">🍭</div>
          <h3 className="text-2xl font-bold mb-2">BitesBox</h3>
          <p className="text-purple-200 mb-4">
            Los mejores dulces, directamente a tu puerta
          </p>
          <div className="flex justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Hecho con amor</span>
            </div>
            <div className="flex items-center space-x-2">
              <Gift className="w-5 h-5" />
              <span>Envío gratis</span>
            </div>
          </div>
          <div className="mt-4 text-sm text-purple-200">
            © 2024 BitesBox. Dulzura garantizada.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BitesBoxStore;