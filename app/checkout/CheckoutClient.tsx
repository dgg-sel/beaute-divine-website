"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store/useCartStore";
import { ArrowLeft, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";

export default function CheckoutClient({ 
  userAddresses, 
  userId, 
  shippingCost 
}: { 
  userAddresses: any[], 
  userId?: string, 
  shippingCost: number 
}) {
  const { items, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(userAddresses && userAddresses.length > 0 ? 0 : -1);

  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  const [formData, setFormData] = useState({
    street: "",
    number: "",
    apartment: "",
    city: "",
    province: "",
    zipCode: "",
    phone: "",
    saveAddress: false,
  });

  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch provinces on mount
  useEffect(() => {
    setMounted(true);
    fetch("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre&max=100")
      .then(res => res.json())
      .then(data => {
        if (data.provincias) {
          const sorted = data.provincias.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
          setProvinces(sorted);
        }
      })
      .catch(console.error);
  }, []);

  // Fetch cities when province changes
  useEffect(() => {
    if (formData.province) {
      setLoadingCities(true);
      fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${encodeURIComponent(formData.province)}&campos=id,nombre&max=1000`)
        .then(res => res.json())
        .then(data => {
          if (data.localidades) {
            const unique = Array.from(new Set(data.localidades.map((l: any) => l.nombre)))
              .sort()
              .map(name => ({ nombre: name }));
            setCities(unique as any[]);
          }
        })
        .catch(console.error)
        .finally(() => setLoadingCities(false));
    } else {
      setCities([]);
    }
  }, [formData.province]);

  useEffect(() => {
    if (selectedAddressIndex >= 0 && userAddresses[selectedAddressIndex]) {
      const addr = userAddresses[selectedAddressIndex];
      setFormData(prev => ({
        ...prev,
        street: addr.street || "",
        number: addr.number || "",
        apartment: addr.apartment || "",
        city: addr.city || "",
        province: addr.province || "",
        zipCode: addr.zipCode || "",
        phone: addr.phone || "",
        saveAddress: false,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        street: "",
        number: "",
        apartment: "",
        city: "",
        province: "",
        zipCode: "",
        phone: "",
        saveAddress: true,
      }));
    }
  }, [selectedAddressIndex, userAddresses]);

  const subtotal = getTotal();
  const total = subtotal + shippingCost;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.street || !formData.number || !formData.city || !formData.province || !formData.zipCode) {
      setErrorMsg("Por favor completa los campos obligatorios de la dirección.");
      return;
    }

    setLoadingCheckout(true);
    
    try {
      // Si el usuario marcó guardar la dirección, la guardamos primero
      if (userId && formData.saveAddress && selectedAddressIndex === -1) {
        try {
          await fetch("/api/user/addresses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              street: formData.street,
              number: formData.number,
              apartment: formData.apartment,
              city: formData.city,
              province: formData.province,
              zipCode: formData.zipCode,
              phone: formData.phone,
            }),
          });
        } catch (err) {
          console.error("Error guardando dirección:", err);
        }
      }


      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items, 
          shippingStreet: formData.street,
          shippingNumber: formData.number,
          shippingApartment: formData.apartment,
          shippingCity: formData.city,
          shippingProvince: formData.province,
          shippingZipCode: formData.zipCode,
        }),
      });
      
      const data = await response.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        setErrorMsg(data.error || "Ocurrió un error al procesar el pago.");
        setLoadingCheckout(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Error de conexión. Intenta de nuevo.");
      setLoadingCheckout(false);
    }
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Tu carrito está vacío</h2>
        <Link href="/catalogo" className="bg-primary text-on-primary px-8 py-3 font-label-sm text-label-sm uppercase tracking-[0.1em] metallic-edge hover:opacity-90 active:scale-95 transition-all inline-block">
          Ir al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-7 space-y-8">
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/catalogo" className="text-on-surface hover:text-primary transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-headline-md text-headline-md text-on-surface">Checkout</h1>
        </div>

        <section className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant">
          <h2 className="font-headline-md text-2xl text-on-surface mb-6">Datos de Envío</h2>
          
          {userId && userAddresses && userAddresses.length > 0 && (
            <div className="mb-8 space-y-4">
              <h3 className="font-label-sm text-label-sm uppercase text-on-surface-variant">Mis Direcciones Guardadas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userAddresses.map((addr, idx) => (
                  <label 
                    key={addr.id} 
                    className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-colors relative ${selectedAddressIndex === idx ? 'border-primary bg-primary/5' : 'border-outline-variant bg-surface hover:border-primary/50'}`}
                  >
                    <input 
                      type="radio" 
                      name="addressSelector" 
                      className="absolute opacity-0"
                      checked={selectedAddressIndex === idx}
                      onChange={() => setSelectedAddressIndex(idx)}
                    />
                    <div className="flex items-center space-x-2 text-on-surface mb-2">
                      <MapPin size={18} className={selectedAddressIndex === idx ? "text-primary" : "text-on-surface-variant"} />
                      <span className="font-body-md font-bold text-sm">
                        {addr.street} {addr.number}
                      </span>
                    </div>
                    <p className="font-body-md text-xs text-on-surface-variant pl-6 leading-relaxed">
                      {addr.apartment && `Dpto: ${addr.apartment} - `}{addr.city},<br/>{addr.province} (CP: {addr.zipCode})
                    </p>
                  </label>
                ))}
                
                <label 
                  className={`flex flex-col justify-center items-center p-4 border border-dashed rounded-lg cursor-pointer transition-colors ${selectedAddressIndex === -1 ? 'border-primary bg-primary/5' : 'border-outline-variant bg-surface hover:border-primary/50'}`}
                >
                  <input 
                    type="radio" 
                    name="addressSelector" 
                    className="absolute opacity-0"
                    checked={selectedAddressIndex === -1}
                    onChange={() => setSelectedAddressIndex(-1)}
                  />
                  <Plus size={24} className={selectedAddressIndex === -1 ? "text-primary mb-2" : "text-on-surface-variant mb-2"} />
                  <span className={`font-body-md text-sm ${selectedAddressIndex === -1 ? "text-primary font-bold" : "text-on-surface-variant"}`}>Usar Otra Dirección</span>
                </label>
              </div>
            </div>
          )}

          {selectedAddressIndex === -1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <div className="space-y-2 md:col-span-2">
                <label className="font-label-sm text-label-sm uppercase text-on-surface">Calle *</label>
                <input required type="text" value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:outline-none focus:border-primary transition-colors" />
              </div>
              
              <div className="space-y-2">
                <label className="font-label-sm text-label-sm uppercase text-on-surface">Número *</label>
                <input required type="text" value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:outline-none focus:border-primary transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-label-sm uppercase text-on-surface">Piso / Depto</label>
                <input type="text" value={formData.apartment} onChange={e => setFormData({...formData, apartment: e.target.value})} className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:outline-none focus:border-primary transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-label-sm uppercase text-on-surface">Provincia *</label>
                <select 
                  required 
                  value={formData.province} 
                  onChange={e => setFormData({...formData, province: e.target.value, city: ""})} 
                  className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Selecciona una provincia</option>
                  {provinces.map(p => (
                    <option key={p.id} value={p.nombre}>{p.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-label-sm uppercase text-on-surface">Ciudad / Localidad *</label>
                <select 
                  required 
                  value={formData.city} 
                  onChange={e => setFormData({...formData, city: e.target.value})} 
                  disabled={!formData.province || loadingCities}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                >
                  <option value="">{loadingCities ? "Cargando..." : "Selecciona una ciudad"}</option>
                  {cities.map((c, idx) => (
                    <option key={idx} value={c.nombre}>{c.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-label-sm uppercase text-on-surface">Código Postal *</label>
                <input required type="text" value={formData.zipCode} onChange={e => setFormData({...formData, zipCode: e.target.value})} className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:outline-none focus:border-primary transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-label-sm uppercase text-on-surface">Teléfono (Opcional)</label>
                <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:outline-none focus:border-primary transition-colors" />
              </div>

              {userId && (
                <div className="mt-4 md:col-span-2 flex items-center">
                  <input 
                    type="checkbox" 
                    id="saveAddress" 
                    checked={formData.saveAddress} 
                    onChange={e => setFormData({...formData, saveAddress: e.target.checked})} 
                    className="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary"
                  />
                  <label htmlFor="saveAddress" className="ml-2 font-body-md text-sm text-on-surface-variant">Guardar esta dirección para mis próximas compras</label>
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      <div className="lg:col-span-5">
        <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant sticky top-32">
          <h2 className="font-headline-md text-2xl text-on-surface mb-6">Resumen del Pedido</h2>
          
          <div className="space-y-4 mb-6 max-h-[350px] overflow-y-auto pr-2">
            {items.map(item => (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-surface rounded-lg overflow-hidden flex-shrink-0 border border-outline-variant">
                  <ProductImage src={item.image || "/logo.jpg"} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-body-md font-bold text-sm text-on-surface line-clamp-2 leading-snug">{item.title}</h3>
                  <p className="font-body-md text-xs text-on-surface-variant mt-1">Cant: {item.quantity}</p>
                </div>
                <span className="font-body-md font-bold text-[15px] text-on-surface whitespace-nowrap">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-outline-variant pt-6 mt-6 space-y-4">
            <div className="flex justify-between font-body-md text-[15px] text-on-surface-variant">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {shippingCost > 0 ? (
              <div className="flex justify-between font-body-md text-[15px] text-on-surface-variant">
                <span>Costo de Envío</span>
                <span>{formatPrice(shippingCost)}</span>
              </div>
            ) : (
              <div className="flex justify-between font-body-md text-[15px] text-on-surface-variant">
                <span>Costo de Envío</span>
                <span className="text-green-600 font-bold">Gratis</span>
              </div>
            )}
            <div className="flex justify-between font-headline-md text-2xl text-on-surface pt-4 border-t border-outline-variant">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          {errorMsg && (
            <div className="mt-4 p-3 bg-error-container text-on-error-container font-body-md text-sm rounded-md border border-error-container">
              {errorMsg}
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={loadingCheckout}
            className="w-full mt-8 bg-primary text-on-primary py-4 rounded-none font-label-sm text-label-sm uppercase tracking-[0.1em] metallic-edge hover:opacity-90 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50"
          >
            {loadingCheckout ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Procesando...</span>
              </div>
            ) : (
              "Pagar con Mercado Pago"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
