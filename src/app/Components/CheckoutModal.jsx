// components/CheckoutModal.jsx
"use client"

import React, { useState } from 'react';
import { X, CreditCard, Package, Truck, Zap } from 'lucide-react';

const CheckoutModal = ({ carrito, setCarrito, setMostrarCheckout, totalCarrito, totalDescuentos, calcularPrecioConDescuento }) => {
  const [checkoutDatos, setCheckoutDatos] = useState({
    nombre: '',
    email: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    metodoPago: 'tarjeta',
    numeroTarjeta: '',
    expiracion: '',
    cvv: '',
  });
  const [checkoutCompletado, setCheckoutCompletado] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  const procesarCheckout = (e) => {
    e.preventDefault();
    setCheckoutCompletado(true);
    setConfettiActive(true);

    setTimeout(() => {
      setCarrito([]);
      setMostrarCheckout(false);
      setCheckoutCompletado(false);
      setConfettiActive(false);
      setCheckoutDatos({
        nombre: '',
        email: '',
        direccion: '',
        ciudad: '',
        codigoPostal: '',
        metodoPago: 'tarjeta',
        numeroTarjeta: '',
        expiracion: '',
        cvv: '',
      });
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full animate-checkout-pop relative overflow-hidden">
        {confettiActive && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="absolute text-xl animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  color: ['#FF69B4', '#9370DB', '#FFD700', '#00FA9A'][i % 4],
                }}
              >
                {['🍬', '🍭', '⭐', '✨', '🌟', '💖'][i % 6]}
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => setMostrarCheckout(false)}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:rotate-90"
        >
          <X className="w-6 h-6 text-purple-600" />
        </button>

        {checkoutCompletado ? (
          <div className="text-center animate-pop-in">
            <svg className="w-20 h-20 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                className="animate-checkmark"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
                style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
              />
            </svg>
            <h3 className="text-2xl font-bold text-purple-700 mb-4 animate-glow">¡Orden Confirmada! 🎉</h3>
            <p className="text-gray-600 mb-6">Tu pedido mágico está en camino. ¡Gracias por elegir BitesBox! ✨</p>
            <div className="flex items-center justify-center space-x-2 text-green-600 animate-bounce">
              <Truck className="w-5 h-5" />
              <span>Tiempo estimado: 2-3 días</span>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-purple-700 mb-6 animate-glow">Finalizar Compra Mágica 🪄</h3>
            <form onSubmit={procesarCheckout}>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-purple-600 mb-3 flex items-center">
                    <Package className="w-5 h-5 mr-2 animate-bounce" />
                    Dirección de Envío
                  </h4>
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={checkoutDatos.nombre}
                    onChange={(e) => setCheckoutDatos({ ...checkoutDatos, nombre: e.target.value })}
                    className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={checkoutDatos.email}
                    onChange={(e) => setCheckoutDatos({ ...checkoutDatos, email: e.target.value })}
                    className="w-full p-3 mt-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Dirección"
                    value={checkoutDatos.direccion}
                    onChange={(e) => setCheckoutDatos({ ...checkoutDatos, direccion: e.target.value })}
                    className="w-full p-3 mt-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300"
                    required
                  />
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <input
                      type="text"
                      placeholder="Ciudad"
                      value={checkoutDatos.ciudad}
                      onChange={(e) => setCheckoutDatos({ ...checkoutDatos, ciudad: e.target.value })}
                      className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Código postal"
                      value={checkoutDatos.codigoPostal}
                      onChange={(e) => setCheckoutDatos({ ...checkoutDatos, codigoPostal: e.target.value })}
                      className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-purple-600 mb-3 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 animate-pulse" />
                    Método de Pago
                  </h4>
                  <select
                    value={checkoutDatos.metodoPago}
                    onChange={(e) => setCheckoutDatos({ ...checkoutDatos, metodoPago: e.target.value })}
                    className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300"
                  >
                    <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                    <option value="transferencia">Transferencia Bancaria</option>
                    <option value="efectivo">Efectivo en Entrega</option>
                  </select>
                  {checkoutDatos.metodoPago === 'tarjeta' && (
                    <div className="space-y-3 mt-3">
                      <input
                        type="text"
                        placeholder="Número de tarjeta"
                        value={checkoutDatos.numeroTarjeta}
                        onChange={(e) => setCheckoutDatos({ ...checkoutDatos, numeroTarjeta: e.target.value })}
                        className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300"
                        required
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="MM/AA"
                          value={checkoutDatos.expiracion}
                          onChange={(e) => setCheckoutDatos({ ...checkoutDatos, expiracion: e.target.value })}
                          className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300"
                          required
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={checkoutDatos.cvv}
                          onChange={(e) => setCheckoutDatos({ ...checkoutDatos, cvv: e.target.value })}
                          className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-200">
                  <h4 className="text-lg font-semibold text-purple-600 mb-3">Resumen del Pedido</h4>
                  {carrito.map(item => (
                    <div key={item.id} className="flex justify-between text-sm mb-2">
                      <span>{item.nombre} x{item.cantidad}</span>
                      <span>${(calcularPrecioConDescuento(item.precio, item.descuento) * item.cantidad).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${(totalCarrito + totalDescuentos).toLocaleString()}</span>
                    </div>
                    {totalDescuentos > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Descuentos:</span>
                        <span>-${totalDescuentos.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Envío:</span>
                      <span>{totalCarrito >= 15000 ? 'GRATIS 🚚' : '$3,500'}</span>
                    </div>
                    <div className="flex justify-between font-bold text-purple-600 mt-2">
                      <span>Total:</span>
                      <span>${(totalCarrito + (totalCarrito >= 15000 ? 0 : 3500)).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
              >
                <span>Confirmar Compra</span>
                <Zap className="w-5 h-5 animate-pulse" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;