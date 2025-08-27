"use client"

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Star, Menu, X, Heart, Gift, Zap, Search, Filter, Truck, Shield, Award, Users, MapPin, Clock, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

// Datos de productos dulces actualizados con 4 cards
const productos = [
  {
    id: 1,
    nombre: "Bitesbox",
    precio: 2800,
    imagen: "../../Bitesbox.jpg", // Reemplaza con URL real de la primera imagen
    categoria: "Caja triangulo",
    rating: 4.8,
    descripcion: "Una cajita en forma de pirámide que contiene: 45 gomitas variadas Hoja de stickers divertidos Tarjeta de regalo personalizada Un mensaje especial 💖 Perfecta para sorprender, regalar y compartir momentos dulces.",
    stock: 50,
    descuento: 0,
    nuevo: false,
    destacado: true
  },
  {
    id: 2,
    nombre: "BitesboxMix",
    precio: 4500,
    imagen: "../../BitesboxMix.jpg", // Reemplaza con URL real de la segunda imagen
    categoria: "Caja triangulo",
    rating: 4.9,
    descripcion: "La combinación ideal para regalar y disfrutar en cualquier momento. Dentro de cada caja encontrarás: ✔️ Mitad gomitas surtidas llenas de sabor ✔️ Mitad chocolates irresistibles ✔️ Hoja de stickers divertidos 🎉 ✔️ Tarjeta de regalo personalizada 💌 ✔️ Un mensajito especial para sorprender Un detalle único, dulce y creativo que convierte cualquier ocasión en un momento especial. 🎁🍫🍬",
    stock: 30,
    descuento: 15,
    nuevo: false,
    destacado: true
  },
  {
    id: 3,
    nombre: "BitesCup",
    precio: 3200,
    imagen: "../../BitesCup.png", // Reemplaza con URL real de la tercera imagen
    categoria: "Vasitos",
    rating: 4.6,
    descripcion: "Endulza tu día con nuestras irresistibles gomitas surtidas, cargadas de sabores, colores y texturas que alegrarán cualquier momento. 🌈✨ Ideal para regalar o simplemente para darte un capricho y consentirte como mereces. 💖🍬 ",
    stock: 40,
    descuento: 0,
    nuevo: true,
    destacado: false
  },
  {
    id: 4,
    nombre: "BitesCupMix",
    precio: 2200,
    imagen: "../../BitesCupMix.png", // Reemplaza con URL real de la cuarta imagen
    categoria: "Vasitos",
    rating: 4.5,
    descripcion: "Disfruta de una irresistible mezcla de gomitas surtidas y deliciosos chocolates en un solo vasito. 😍✨ Perfecto para compartir, regalar o simplemente darte un gusto en cualquier momento. Un detalle dulce que combina diversión y sabor en cada bocado. 🎁🍭🍫",
    stock: 60,
    descuento: 10,
    nuevo: false,
    destacado: false
  }
];

const testimonios = [
  {
    id: 1,
    nombre: "María González",
    comentario: "Los mejores dulces que he probado. La calidad es excepcional y llegaron súper rápido.",
    rating: 5,
    avatar: "👩‍💼"
  },
  {
    id: 2,
    nombre: "Carlos Rodríguez",
    comentario: "Mi tienda favorita para comprar dulces. Siempre tienen productos frescos y deliciosos.",
    rating: 5,
    avatar: "👨‍🔧"
  },
  {
    id: 3,
    nombre: "Ana Martín",
    comentario: "Excelente servicio al cliente. Los chocolates premium son increíbles.",
    rating: 5,
    avatar: "👩‍🎨"
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
  const [busqueda, setBusqueda] = useState('');
  const [filtroOrden, setFiltroOrden] = useState('nombre');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  const [testimonioActual, setTestimonioActual] = useState(0);
  const [mostrarFormularioContacto, setMostrarFormularioContacto] = useState(false);
  const [datosContacto, setDatosContacto] = useState({ nombre: '', email: '', mensaje: '' });
  const [notificacionFavorito, setNotificacionFavorito] = useState(null);
  const [confettiActive, setConfettiActive] = useState(false);

  // Animación de entrada de la página
  useEffect(() => {
    const timer = setTimeout(() => {
      setPaginaCargada(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Rotación automática de testimonios
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonioActual((prev) => (prev + 1) % testimonios.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Cargar favoritos desde localStorage al montar el componente
  useEffect(() => {
    const favoritosGuardados = localStorage.getItem('favoritos');
    if (favoritosGuardados) {
      setFavoritos(JSON.parse(favoritosGuardados));
    }
  }, []);

  // Guardar favoritos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  // Función para agregar al carrito con efectos y confetti
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
    setConfettiActive(true);
    
    setTimeout(() => {
      setAnimacionCarrito(false);
      setProductoAgregado(null);
      setConfettiActive(false);
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

  const toggleFavorito = (productoId) => {
    setFavoritos(prev => {
      const nuevoFavoritos = prev.includes(productoId)
        ? prev.filter(id => id !== productoId)
        : [...prev, productoId];
      
      // Mostrar notificación
      const producto = productos.find(p => p.id === productoId);
      setNotificacionFavorito({
        nombre: producto.nombre,
        accion: nuevoFavoritos.includes(productoId) ? 'agregado' : 'eliminado'
      });
      
      setConfettiActive(nuevoFavoritos.includes(productoId)); // Confetti solo al agregar
      
      setTimeout(() => {
        setNotificacionFavorito(null);
        setConfettiActive(false);
      }, 2000);
      
      return nuevoFavoritos;
    });
  };

  const calcularPrecioConDescuento = (precio, descuento) => {
    return precio - (precio * descuento / 100);
  };

  const totalCarrito = carrito.reduce((total, item) => {
    const precioFinal = calcularPrecioConDescuento(item.precio, item.descuento);
    return total + (precioFinal * item.cantidad);
  }, 0);
  
  const totalDescuentos = carrito.reduce((total, item) => {
    const descuentoTotal = (item.precio * item.descuento / 100) * item.cantidad;
    return total + descuentoTotal;
  }, 0);

  const cantidadItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  // Filtrado y búsqueda mejorados
  let productosFiltrados = productos;

  if (busqueda) {
    productosFiltrados = productosFiltrados.filter(producto =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  if (categoriaSeleccionada !== 'todos') {
    productosFiltrados = productosFiltrados.filter(producto => 
      producto.categoria === categoriaSeleccionada
    );
  }

  // Ordenamiento
  productosFiltrados.sort((a, b) => {
    switch (filtroOrden) {
      case 'precio-asc':
        return calcularPrecioConDescuento(a.precio, a.descuento) - calcularPrecioConDescuento(b.precio, b.descuento);
      case 'precio-desc':
        return calcularPrecioConDescuento(b.precio, b.descuento) - calcularPrecioConDescuento(a.precio, a.descuento);
      case 'rating':
        return b.rating - a.rating;
      case 'nombre':
      default:
        return a.nombre.localeCompare(b.nombre);
    }
  });

  const procesarPedido = () => {
    if (carrito.length === 0) return;
    
    setPedidoEnviado(true);
    setCarrito([]);
    setMostrarCarrito(false);
    
    setConfettiActive(true);
    
    setTimeout(() => {
      setPedidoEnviado(false);
      setConfettiActive(false);
    }, 4000);
  };

  const enviarContacto = (e) => {
    e.preventDefault();
    alert('¡Mensaje enviado! Te contactaremos pronto. ✨');
    setDatosContacto({ nombre: '', email: '', mensaje: '' });
    setMostrarFormularioContacto(false);
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
            <p className="text-white">Cargando dulces mágicos... ✨</p>
            <div className="mt-4 flex justify-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Elementos decorativos flotantes mejorados */}
      <div className={`fixed inset-0 pointer-events-none overflow-hidden transition-all duration-1000 delay-300 ${
        paginaCargada ? 'opacity-20 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute text-2xl md:text-4xl opacity-20 animate-float-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          >
            {['🍭', '🍬', '🍫', '🧸', '🍯', '⭐', '💎', '🍋', '✨', '🌟'][i % 10]}
          </div>
        ))}
      </div>

      {/* Confetti mágico */}
      {confettiActive && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="absolute text-xl animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                color: ['#FF69B4', '#9370DB', '#FFD700', '#00FA9A'][i % 4]
              }}
            >
              {['🍬', '🍭', '⭐', '✨', '🌟', '💖'][i % 6]}
            </div>
          ))}
        </div>
      )}

      {/* Mensaje de pedido enviado mejorado */}
      {pedidoEnviado && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-pop-in">
          <div className="bg-white text-center px-8 py-6 rounded-3xl shadow-2xl border-4 border-pink-300">
            <div className="text-4xl mb-3 animate-spin">🎉🍭🎉</div>
            <h3 className="text-2xl font-bold text-pink-600 mb-2">¡Pedido Enviado!</h3>
            <p className="text-gray-600">Tu dulce orden está en camino ✨</p>
            <div className="mt-3 flex items-center justify-center space-x-2 text-green-600 animate-bounce">
              <Truck className="w-5 h-5" />
              <span>Tiempo estimado: 2-3 días</span>
            </div>
          </div>
        </div>
      )}

      {/* Notificación producto agregado mejorada */}
      {productoAgregado && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
          <div className="bg-white rounded-2xl shadow-xl p-4 border-2 border-pink-300">
            <div className="flex items-center space-x-3">
              <div className="text-3xl animate-bounce">{productoAgregado.imagen}</div>
              <div>
                <p className="font-bold text-pink-600">¡Agregado! ✨</p>
                <p className="text-sm text-gray-600">{productoAgregado.nombre}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notificación de favoritos mejorada */}
      {notificacionFavorito && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
          <div className="bg-white rounded-2xl shadow-xl p-4 border-2 border-pink-300">
            <div className="flex items-center space-x-3">
              <Heart className="w-6 h-6 text-red-500 fill-current animate-heartbeat" />
              <div>
                <p className="font-bold text-purple-600">
                  {notificacionFavorito.accion === 'agregado' ? '¡Agregado a favoritos! ✨' : '¡Eliminado de favoritos! 💔'}
                </p>
                <p className="text-sm text-gray-600">{notificacionFavorito.nombre}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header mejorado con magia */}
      <header className={`bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white shadow-lg sticky top-0 z-30 transition-all duration-1000 delay-500 ${
        paginaCargada ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl animate-spin-slow">🍭</div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold animate-glow">BitesBox</h1>
                <p className="text-xs md:text-sm opacity-90">Dulces mágicos para todos ✨</p>
              </div>
            </div>
            
            {/* Barra de búsqueda */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300 animate-pulse" />
                <input
                  type="text"
                  placeholder="Buscar dulces mágicos... ✨"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full text-purple-800 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 focus:ring-offset-purple-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Navegación */}
            <nav className="hidden lg:flex space-x-4">
              {[
                { key: 'todos', label: 'Todos', emoji: '🎪' },
                { key: 'chocolates', label: 'Chocolates', emoji: '🍫' },
                { key: 'gominolas', label: 'Gominolas', emoji: '🍬' },
                { key: 'piruletas', label: 'Piruletas', emoji: '🍭' }
              ].map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setCategoriaSeleccionada(cat.key)}
                  className={`px-3 py-2 rounded-full transition-all duration-300 hover:bg-white hover:text-purple-600 transform hover:scale-110 hover:rotate-3 text-sm ${
                    categoriaSeleccionada === cat.key ? 'bg-white text-purple-600 shadow-md' : ''
                  }`}
                >
                  <span className="mr-1 animate-bounce">{cat.emoji}</span>
                  {cat.label}
                </button>
              ))}
            </nav>

            {/* Carrito y menú */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setMostrarCarrito(!mostrarCarrito)}
                className={`relative p-3 bg-pink-500 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-6 ${
                  animacionCarrito ? 'animate-wiggle scale-125' : ''
                }`}
              >
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-white" />
                {cantidadItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center animate-pulse">
                    {cantidadItems}
                  </span>
                )}
              </button>
              
              <button
                className="lg:hidden p-2"
                onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
              >
                {menuMovilAbierto ? <X className="w-6 h-6 animate-spin" /> : <Menu className="w-6 h-6 animate-pulse" />}
              </button>
            </div>
          </div>

          {/* Búsqueda móvil */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300 animate-pulse" />
              <input
                type="text"
                placeholder="Buscar dulces mágicos... ✨"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full text-purple-800 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 focus:ring-offset-purple-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Menu móvil */}
          {menuMovilAbierto && (
            <div className="lg:hidden mt-4 pb-4 animate-fade-in">
              <nav className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { key: 'todos', label: 'Todos', emoji: '🎪' },
                  { key: 'chocolates', label: 'Chocolates', emoji: '🍫' },
                  { key: 'gominolas', label: 'Gominolas', emoji: '🍬' },
                  { key: 'piruletas', label: 'Piruletas', emoji: '🍭' }
                ].map(cat => (
                  <button
                    key={cat.key}
                    onClick={() => {setCategoriaSeleccionada(cat.key); setMenuMovilAbierto(false);}}
                    className={`bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-105 hover:rotate-3 ${
                      categoriaSeleccionada === cat.key ? 'bg-white text-purple-600 shadow-md' : ''
                    }`}
                  >
                    <span className="mr-1 animate-bounce">{cat.emoji}</span>
                    {cat.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section mejorada */}
      <section className={`py-12 md:py-16 text-center transition-all duration-1000 delay-700 ${
        paginaCargada ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-purple-700 mb-6 animate-glow">
            ¡Bienvenido a BitesBox! 🍭✨
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in">
            Los dulces más mágicos y deliciosos te están esperando 🪄
          </p>
          
          <div className="text-4xl md:text-6xl mb-8 space-x-2 md:space-x-4">
            <span className="inline-block animate-float-sparkle" style={{ animationDelay: '0s' }}>🍭</span>
            <span className="inline-block animate-float-sparkle" style={{ animationDelay: '0.2s' }}>🍬</span>
            <span className="inline-block animate-float-sparkle" style={{ animationDelay: '0.4s' }}>🍫</span>
            <span className="inline-block animate-float-sparkle" style={{ animationDelay: '0.6s' }}>🧸</span>
            <span className="inline-block animate-float-sparkle" style={{ animationDelay: '0.8s' }}>💎</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-purple-600">
            <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 hover:rotate-3 transition-all duration-300">
              <Truck className="w-10 h-10 mx-auto mb-3 text-green-500 animate-drive" />
              <p className="font-semibold">Envío Gratis</p>
              <p className="text-sm text-gray-500">Pedidos +$15,000 🚚✨</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 hover:rotate-3 transition-all duration-300">
              <Shield className="w-10 h-10 mx-auto mb-3 text-blue-500 animate-pulse" />
              <p className="font-semibold">Calidad Premium</p>
              <p className="text-sm text-gray-500">100% Garantizado 🛡️🌟</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 hover:rotate-3 transition-all duration-300">
              <Award className="w-10 h-10 mx-auto mb-3 text-yellow-500 animate-spin-slow" />
              <p className="font-semibold">Mejor Valorados</p>
              <p className="text-sm text-gray-500">+1000 reseñas 🏆💫</p>
            </div>
          </div>

          {/* Estadísticas mejoradas */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center animate-pop-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-2xl md:text-3xl font-bold text-purple-600 animate-glow">500+</div>
              <div className="text-sm text-gray-600">Clientes Felices 😊</div>
            </div>
            <div className="text-center animate-pop-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-2xl md:text-3xl font-bold text-purple-600 animate-glow">50+</div>
              <div className="text-sm text-gray-600">Productos Mágicos 🪄</div>
            </div>
            <div className="text-center animate-pop-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-2xl md:text-3xl font-bold text-purple-600 animate-glow">4.8⭐</div>
              <div className="text-sm text-gray-600">Rating Promedio 🌟</div>
            </div>
            <div className="text-center animate-pop-in" style={{ animationDelay: '0.8s' }}>
              <div className="text-2xl md:text-3xl font-bold text-purple-600 animate-glow">24/7</div>
              <div className="text-sm text-gray-600">Atención Mágica 🕒</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de filtros mejorada */}
      <div className={`container mx-auto px-4 mb-8 transition-all duration-1000 delay-900 ${
        paginaCargada ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>
        <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl shadow-lg p-4 animate-glow">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-all duration-300 hover:scale-105"
            >
              <Filter className="w-5 h-5 animate-spin-slow" />
              <span>Filtros Mágicos ✨</span>
            </button>
            
            {mostrarFiltros && (
              <select
                value={filtroOrden}
                onChange={(e) => setFiltroOrden(e.target.value)}
                className="px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-pink-100 transition-all duration-300"
              >
                <option value="nombre">Ordenar por Nombre</option>
                <option value="precio-asc">Precio: Menor a Mayor</option>
                <option value="precio-desc">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Valorados ⭐</option>
              </select>
            )}
          </div>
          
          <div className="text-gray-600 animate-pulse">
            Mostrando {productosFiltrados.length} de {productos.length} dulces mágicos ✨
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8 relative">
        {/* Lista de productos mejorada */}
        <main className={mostrarCarrito ? "mr-0 md:mr-80" : ""}>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-purple-700 animate-glow">
            {categoriaSeleccionada === 'todos' ? '🍭 Todos los Dulces Mágicos 🍭' : 
             `🍬 ${categoriaSeleccionada.charAt(0).toUpperCase() + categoriaSeleccionada.slice(1)} Encantados 🍬`}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productosFiltrados.map((producto, index) => {
              const precioConDescuento = calcularPrecioConDescuento(producto.precio, producto.descuento);
              const esFavorito = favoritos.includes(producto.id);
              
              return (
                <div 
                  key={producto.id} 
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 transform hover:-translate-y-2 hover:scale-105 border-2 border-pink-100 relative animate-pop-in hover:animate-wiggle`}
                  style={{ 
                    animationDelay: `${1200 + (index * 100)}ms`,
                    transition: 'all 0.6s ease-out'
                  }}
                >
                  {/* Badges mejorados */}
                  <div className="absolute top-3 left-3 flex space-x-1">
                    {producto.nuevo && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">NUEVO ✨</span>
                    )}
                    {producto.destacado && (
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">★ DESTACADO</span>
                    )}
                    {producto.descuento > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-glow">-{producto.descuento}% 🔥</span>
                    )}
                  </div>

                  {/* Botón favorito mejorado */}
                  <button
                    onClick={() => toggleFavorito(producto.id)}
                    className="absolute top-3 right-3 p-2 rounded-full transition-all duration-300 hover:scale-125 hover:rotate-12"
                  >
                    <Heart className={`w-5 h-5 ${esFavorito ? 'text-red-500 fill-current animate-heartbeat' : 'text-gray-400'}`} />
                  </button>
                
                  <div className="text-6xl text-center mb-4 hover:animate-spin-slow transition-transform duration-500">
                    <img src={producto.imagen} alt={producto.nombre} className="w-full h-48 object-cover rounded-lg" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-purple-800 hover:animate-glow">
                    {producto.nombre}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm animate-fade-in">
                    {producto.descripcion}
                  </p>
                  
                  <div className="flex items-center mb-4 justify-center animate-pulse">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(producto.rating) ? 'text-yellow-400 fill-current animate-twinkle' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-2 text-gray-600">{producto.rating}</span>
                  </div>

                  {/* Stock indicator mejorado */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-1">Stock: {producto.stock} unidades ✨</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded-full ${producto.stock > 30 ? 'bg-green-400 animate-progress-green' : producto.stock > 15 ? 'bg-yellow-400 animate-progress-yellow' : 'bg-red-400 animate-progress-red'}`}
                        style={{ width: `${Math.min(producto.stock, 60) / 60 * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="animate-glow">
                      {producto.descuento > 0 ? (
                        <div>
                          <span className="text-lg text-gray-400 line-through">
                            ${producto.precio.toLocaleString()}
                          </span>
                          <span className="text-2xl font-bold text-purple-600 ml-2 animate-pulse">
                            ${precioConDescuento.toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-purple-600">
                          ${producto.precio.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => agregarAlCarrito(producto)}
                      disabled={producto.stock === 0}
                      className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg transform hover:scale-105 hover:rotate-6 ${
                        producto.stock === 0 
                          ? 'bg-gray-400 text-white cursor-not-allowed' 
                          : 'bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:from-pink-500 hover:to-purple-600'
                      }`}
                    >
                      <Plus className="w-4 h-4 animate-spin-slow" />
                      <span>{producto.stock === 0 ? 'Agotado 😔' : 'Agregar 🛒'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {productosFiltrados.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="text-6xl mb-4 animate-bounce">😢</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No se encontraron dulces</h3>
              <p className="text-gray-500">Intenta con otra búsqueda o categoría ✨</p>
            </div>
          )}
        </main>

        {/* Panel del carrito mejorado */}
        {mostrarCarrito && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:bg-transparent">
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 md:w-80 overflow-hidden animate-slide-in-right">
              <div className="h-full flex flex-col">
                {/* Header del carrito */}
                <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl animate-spin-slow">🛒</div>
                      <div>
                        <h3 className="text-xl font-bold animate-glow">Mi Carrito Mágico</h3>
                        <p className="text-pink-100 text-sm">{cantidadItems} productos encantados ✨</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setMostrarCarrito(false)}
                      className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-300 hover:rotate-90"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  {totalDescuentos > 0 && (
                    <div className="bg-white bg-opacity-20 rounded-lg p-2 text-center animate-pulse">
                      <span className="text-sm">¡Ahorras ${totalDescuentos.toLocaleString()}! 💰✨</span>
                    </div>
                  )}
                </div>

                {/* Contenido del carrito */}
                <div className="flex-1 overflow-y-auto p-4">
                  {carrito.length === 0 ? (
                    <div className="text-center text-gray-500 mt-12 animate-fade-in">
                      <div className="text-6xl mb-4 animate-bounce">🛒</div>
                      <p className="text-lg font-semibold mb-2">Tu carrito está vacío 😔</p>
                      <p className="text-sm">¡Agrega algunos dulces mágicos! ✨</p>
                      <button
                        onClick={() => setMostrarCarrito(false)}
                        className="mt-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-2 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        Explorar Dulces 🪄
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {carrito.map(item => {
                        const precioConDescuento = calcularPrecioConDescuento(item.precio, item.descuento);
                        
                        return (
                          <div key={item.id} className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-200 shadow-sm hover:animate-glow">
                            <div className="flex items-start space-x-4">
                              <div className="text-3xl animate-bounce"><img src={item.imagen} alt={item.nombre} className="w-12 h-12 object-cover rounded-full" /></div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-purple-800 truncate">{item.nombre}</h4>
                                <div className="text-sm text-gray-600 mb-2">
                                  {item.descuento > 0 ? (
                                    <div className="flex items-center space-x-2">
                                      <span className="line-through text-gray-400">
                                        ${item.precio.toLocaleString()}
                                      </span>
                                      <span className="text-purple-600 font-semibold animate-pulse">
                                        ${precioConDescuento.toLocaleString()}
                                      </span>
                                      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full animate-bounce">
                                        -{item.descuento}%
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="text-purple-600 font-semibold">
                                      ${item.precio.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                                      className="w-7 h-7 bg-pink-400 text-white rounded-full hover:bg-pink-500 flex items-center justify-center text-sm font-bold transition-all duration-300 hover:scale-110"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="w-8 text-center font-bold text-purple-800 animate-pulse">
                                      {item.cantidad}
                                    </span>
                                    <button
                                      onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                                      className="w-7 h-7 bg-pink-400 text-white rounded-full hover:bg-pink-500 flex items-center justify-center text-sm font-bold transition-all duration-300 hover:scale-110"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-purple-600 animate-glow">
                                      ${(precioConDescuento * item.cantidad).toLocaleString()}
                                    </p>
                                    {item.descuento > 0 && (
                                      <p className="text-xs text-green-600 animate-pulse">
                                        Ahorro: ${((item.precio - precioConDescuento) * item.cantidad).toLocaleString()} 💸
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer del carrito mejorado */}
                {carrito.length > 0 && (
                  <div className="border-t bg-gray-50 p-4">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>${(totalCarrito + totalDescuentos).toLocaleString()} 💰</span>
                      </div>
                      {totalDescuentos > 0 && (
                        <div className="flex justify-between text-sm text-green-600 animate-pulse">
                          <span>Descuentos:</span>
                          <span>-${totalDescuentos.toLocaleString()} 🎁</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span>Envío:</span>
                        <span className={totalCarrito >= 15000 ? 'text-green-600 animate-bounce' : ''}>
                          {totalCarrito >= 15000 ? 'GRATIS 🚀' : '$3,500'}
                        </span>
                      </div>
                      <div className="border-t pt-2 flex justify-between items-center">
                        <span className="text-lg font-bold text-purple-800">Total:</span>
                        <span className="text-2xl font-bold text-purple-600 animate-glow">
                          ${(totalCarrito + (totalCarrito >= 15000 ? 0 : 3500)).toLocaleString()} ✨
                        </span>
                      </div>
                      {totalCarrito < 15000 && (
                        <p className="text-xs text-gray-600 text-center animate-pulse">
                          Agrega ${(15000 - totalCarrito).toLocaleString()} más para envío gratis 🚚💨
                        </p>
                      )}
                    </div>
                    
                    <button
                      onClick={procesarPedido}
                      className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-lg transform hover:scale-105 hover:rotate-3 flex items-center justify-center space-x-2"
                    >
                      <span>Confirmar Pedido</span>
                      <span>🚀✨</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sección de Favoritos mejorada */}
      <section className={`py-16 bg-gradient-to-br from-pink-50 to-purple-50 transition-all duration-1000 delay-1000 ${
        paginaCargada ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-purple-700 animate-glow">
            ❤️ Tus Dulces Favoritos Encantados ❤️
          </h2>
          
          {favoritos.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="text-6xl mb-4 animate-heartbeat">😢</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No tienes favoritos aún</h3>
              <p className="text-gray-500">Marca tus dulces favoritos con el ❤️ para verlos aquí ✨</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productos
                .filter(producto => favoritos.includes(producto.id))
                .map((producto, index) => {
                  const precioConDescuento = calcularPrecioConDescuento(producto.precio, producto.descuento);
                  const esFavorito = favoritos.includes(producto.id);
                  
                  return (
                    <div 
                      key={producto.id} 
                      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 transform hover:-translate-y-2 hover:scale-105 border-2 border-pink-100 relative animate-pop-in hover:animate-wiggle`}
                      style={{ 
                        animationDelay: `${200 + (index * 100)}ms`,
                        animationDuration: '0.8s'
                      }}
                    >
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex space-x-1">
                        {producto.nuevo && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">NUEVO ✨</span>
                        )}
                        {producto.destacado && (
                          <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">★ DESTACADO</span>
                        )}
                        {producto.descuento > 0 && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-glow">-{producto.descuento}% 🔥</span>
                        )}
                      </div>

                      {/* Botón favorito */}
                      <button
                        onClick={() => toggleFavorito(producto.id)}
                        className="absolute top-3 right-3 p-2 rounded-full transition-all duration-300 hover:scale-125 hover:rotate-12"
                      >
                        <Heart className={`w-5 h-5 ${esFavorito ? 'text-red-500 fill-current animate-heartbeat' : 'text-gray-400'}`} />
                      </button>
                    
                      <div className="text-6xl text-center mb-4 hover:animate-spin-slow transition-transform duration-500">
                        <img src={producto.imagen} alt={producto.nombre} className="w-full h-48 object-cover rounded-lg" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 text-purple-800 hover:animate-glow">
                        {producto.nombre}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-sm animate-fade-in">
                        {producto.descripcion}
                      </p>
                      
                      <div className="flex items-center mb-4 justify-center animate-pulse">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(producto.rating) ? 'text-yellow-400 fill-current animate-twinkle' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="ml-2 text-gray-600">{producto.rating}</span>
                      </div>

                      {/* Stock indicator */}
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">Stock: {producto.stock} unidades ✨</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-2 rounded-full ${producto.stock > 30 ? 'bg-green-400 animate-progress-green' : producto.stock > 15 ? 'bg-yellow-400 animate-progress-yellow' : 'bg-red-400 animate-progress-red'}`}
                            style={{ width: `${Math.min(producto.stock, 60) / 60 * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="animate-glow">
                          {producto.descuento > 0 ? (
                            <div>
                              <span className="text-lg text-gray-400 line-through">
                                ${producto.precio.toLocaleString()}
                              </span>
                              <span className="text-2xl font-bold text-purple-600 ml-2 animate-pulse">
                                ${precioConDescuento.toLocaleString()}
                              </span>
                            </div>
                          ) : (
                            <span className="text-2xl font-bold text-purple-600">
                              ${producto.precio.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => agregarAlCarrito(producto)}
                          disabled={producto.stock === 0}
                          className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg transform hover:scale-105 hover:rotate-6 ${
                            producto.stock === 0 
                              ? 'bg-gray-400 text-white cursor-not-allowed' 
                              : 'bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:from-pink-500 hover:to-purple-600'
                          }`}
                        >
                          <Plus className="w-4 h-4 animate-spin-slow" />
                          <span>{producto.stock === 0 ? 'Agotado 😔' : 'Agregar 🛒'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </section>

      {/* Sección de testimonios mejorada */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-700 animate-glow">
            💬 Lo que dicen nuestros clientes mágicos
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8 text-center animate-pop-in">
              <div className="text-6xl mb-4 animate-bounce">{testimonios[testimonioActual].avatar}</div>
              <p className="text-lg text-gray-700 mb-4 italic animate-fade-in">
                {testimonios[testimonioActual].comentario} ✨
              </p>
              <div className="flex justify-center mb-2">
                {[...Array(testimonios[testimonioActual].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-twinkle" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              <p className="font-bold text-purple-700 animate-glow">
                {testimonios[testimonioActual].nombre}
              </p>
            </div>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonios.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonioActual(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === testimonioActual ? 'bg-purple-500 animate-pulse' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter mejorada */}
      <section className="py-16 bg-gradient-to-r from-pink-400 to-purple-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-6 animate-spin-slow">📧</div>
          <h2 className="text-3xl font-bold mb-4 animate-glow">¡Mantente al día con BitesBox!</h2>
          <p className="text-xl mb-8 text-pink-100 animate-fade-in">
            Recibe ofertas especiales y novedades mágicas directamente en tu email ✨
          </p>
          
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded-l-xl text-purple-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 focus:ring-offset-purple-500 transition-all duration-300"
            />
            <button className="bg-yellow-400 text-purple-800 px-6 py-3 rounded-r-xl hover:bg-yellow-300 hover:scale-105 transition-all duration-300 font-bold">
              Suscribirse ✨
            </button>
          </div>
        </div>
      </section>

      {/* Footer mejorado */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-4xl animate-spin-slow">🍭</div>
                <div>
                  <h3 className="text-2xl font-bold animate-glow">BitesBox</h3>
                  <p className="text-gray-400 text-sm">Dulces mágicos para todos ✨</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4 animate-fade-in">
                Los mejores dulces, directamente a tu puerta. Calidad premium y magia garantizada. 🪄
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-blue-400 cursor-pointer hover:text-blue-300 hover:scale-125 transition-all duration-300" />
                <Instagram className="w-6 h-6 text-pink-400 cursor-pointer hover:text-pink-300 hover:scale-125 transition-all duration-300" />
                <Twitter className="w-6 h-6 text-blue-400 cursor-pointer hover:text-blue-300 hover:scale-125 transition-all duration-300" />
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4 text-pink-300 animate-pulse">Productos Mágicos</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white hover:animate-glow">Chocolates 🍫</a></li>
                <li><a href="#" className="hover:text-white hover:animate-glow">Gominolas 🍬</a></li>
                <li><a href="#" className="hover:text-white hover:animate-glow">Piruletas 🍭</a></li>
                <li><a href="#" className="hover:text-white hover:animate-glow">Caramelos 🍯</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4 text-pink-300 animate-pulse">Ayuda Encantada</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white hover:animate-glow">Preguntas Frecuentes ❓</a></li>
                <li><a href="#" className="hover:text-white hover:animate-glow">Envíos 🚀</a></li>
                <li><a href="#" className="hover:text-white hover:animate-glow">Devoluciones 🔄</a></li>
                <li>
                  <button 
                    onClick={() => setMostrarFormularioContacto(true)}
                    className="hover:text-white hover:animate-glow"
                  >
                    Contacto 📞
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4 text-pink-300 animate-pulse">Contacto Mágico</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-2 hover:animate-bounce">
                  <MapPin className="w-5 h-5" />
                  <span>Bogotá, Colombia 🗺️</span>
                </div>
                <div className="flex items-center space-x-2 hover:animate-bounce">
                  <Phone className="w-5 h-5" />
                  <span>+57 300 123 4567 📱</span>
                </div>
                <div className="flex items-center space-x-2 hover:animate-bounce">
                  <Mail className="w-5 h-5" />
                  <span>info@bitesbox.com 📧</span>
                </div>
                <div className="flex items-center space-x-2 hover:animate-bounce">
                  <Clock className="w-5 h-5" />
                  <span>Lun-Dom 8:00-20:00 ⏰</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 animate-fade-in">
            <p>© 2024 BitesBox. Todos los derechos reservados. Dulzura y magia garantizada. 🍬✨</p>
          </div>
        </div>
      </footer>

      {/* Modal de contacto mejorado */}
      {mostrarFormularioContacto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-pop-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-purple-700 animate-glow">📞 Contáctanos Mágicamente</h3>
              <button
                onClick={() => setMostrarFormularioContacto(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={enviarContacto}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Tu nombre encantado ✨"
                  value={datosContacto.nombre}
                  onChange={(e) => setDatosContacto({...datosContacto, nombre: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-pink-100 transition-all duration-300"
                  required
                />
                <input
                  type="email"
                  placeholder="Tu email mágico 📧"
                  value={datosContacto.email}
                  onChange={(e) => setDatosContacto({...datosContacto, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-pink-100 transition-all duration-300"
                  required
                />
                <textarea
                  placeholder="Tu mensaje encantado 🪄"
                  value={datosContacto.mensaje}
                  onChange={(e) => setDatosContacto({...datosContacto, mensaje: e.target.value})}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-pink-100 transition-all duration-300"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-bold"
              >
                Enviar Mensaje 📧✨
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Animaciones personalizadas con Tailwind mejoradas
const tailwindConfig = `
@layer utilities {
  .animate-pop-in {
    animation: pop-in 0.8s ease-out forwards;
  }
  .animate-slide-in-right {
    animation: slide-in-right 0.5s ease-out forwards;
  }
  .animate-slide-out-right {
    animation: slide-out-right 0.5s ease-out forwards;
  }
  .animate-fade-in {
    animation: fade-in 0.8s ease-out forwards;
  }
  .animate-glow {
    animation: glow 1.5s ease-in-out infinite alternate;
  }
  .animate-heartbeat {
    animation: heartbeat 1s ease-in-out infinite;
  }
  .animate-twinkle {
    animation: twinkle 1.5s ease-in-out infinite;
  }
  .animate-float-sparkle {
    animation: float-sparkle 5s linear infinite;
  }
  .animate-spin-slow {
    animation: spin 3s linear infinite;
  }
  .animate-wiggle {
    animation: wiggle 0.5s ease-in-out infinite;
  }
  .animate-progress-green {
    animation: progress 2s linear infinite;
    background-image: linear-gradient(to right, #4ade80, #22c55e, #4ade80);
    background-size: 200% 100%;
  }
  .animate-progress-yellow {
    animation: progress 2s linear infinite;
    background-image: linear-gradient(to right, #fde047, #eab308, #fde047);
    background-size: 200% 100%;
  }
  .animate-progress-red {
    animation: progress 2s linear infinite;
    background-image: linear-gradient(to right, #ef4444, #dc2626, #ef4444);
    background-size: 200% 100%;
  }
  .animate-drive {
    animation: drive 2s linear infinite;
  }
  .animate-confetti {
    animation: confetti 3s linear forwards;
  }
}

@keyframes pop-in {
  0% {
    transform: scale(0.3) translateY(50px);
    opacity: 0;
  }
  60% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

@keyframes slide-in-right {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-out-right {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100px);
    opacity: 0;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glow {
  from {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #e879f9, 0 0 20px #e879f9, 0 0 30px #e879f9, 0 0 40px #e879f9, 0 0 50px #e879f9;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #d946ef, 0 0 40px #d946ef, 0 0 50px #d946ef, 0 0 60px #d946ef, 0 0 70px #d946ef;
  }
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.3);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.3);
  }
  70% {
    transform: scale(1);
  }
}

@keyframes twinkle {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

@keyframes float-sparkle {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0) rotate(360deg);
    opacity: 0.2;
  }
}

@keyframes wiggle {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
  75% { transform: rotate(-3deg); }
  100% { transform: rotate(0deg); }
}

@keyframes progress {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

@keyframes drive {
  0% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
  100% { transform: translateX(-10px); }
}

@keyframes confetti {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
`;

export default BitesBoxStore;