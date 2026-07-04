"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { MapPin, CreditCard, User as UserIcon } from "lucide-react";

interface CheckoutFormProps {
  shippingCost: number;
}

interface GeorefLocation {
  id: string;
  nombre: string;
}

export default function CheckoutForm({ shippingCost }: CheckoutFormProps) {
  const { items, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  
  // Datos del cliente
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  
  // Dirección granular
  const [shippingStreet, setShippingStreet] = useState("");
  const [shippingNumber, setShippingNumber] = useState("");
  const [shippingApartment, setShippingApartment] = useState("");
  const [shippingZipCode, setShippingZipCode] = useState("");

  // Ubicaciones geográficas
  const [provinces, setProvinces] = useState<GeorefLocation[]>([]);
  const [cities, setCities] = useState<GeorefLocation[]>([]);
  
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { data: session } = useSession();

  // Evitar hydration mismatch y cargar provincias
  useEffect(() => {
    setMounted(true);
    fetch("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre&orden=nombre")
      .then(res => res.json())
      .then(data => {
        if (data.provincias) setProvinces(data.provincias);
      })
      .catch(err => console.error("Error cargando provincias", err));
  }, []);

  // Prellenar nombre/email si el usuario está logueado
  useEffect(() => {
    if (session?.user) {
      setCustomerName(session.user.name || "");
      setCustomerEmail(session.user.email || "");
    }
  }, [session]);

  // Cargar ciudades cuando cambia la provincia
  useEffect(() => {
    if (!selectedProvinceId) {
      setCities([]);
      setSelectedCityId("");
      setSelectedCityName("");
      return;
    }
    
    fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${selectedProvinceId}&campos=id,nombre&max=1000&orden=nombre`)
      .then(res => res.json())
      .then(data => {
        if (data.localidades) {
          setCities(data.localidades);
          setSelectedCityId("");
          setSelectedCityName("");
        }
      })
      .catch(err => console.error("Error cargando ciudades", err));
  }, [selectedProvinceId]);

  if (!mounted || items.length === 0) return null;

  const subtotal = getTotal();
  const total = subtotal + shippingCost;

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const name = e.target.options[e.target.selectedIndex].text;
    setSelectedProvinceId(id);
    setSelectedProvinceName(id ? name : "");
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const name = e.target.options[e.target.selectedIndex].text;
    setSelectedCityId(id);
    setSelectedCityName(id ? name : "");
  };

  const handlePagar = async () => {
    setError(null);

    if (!shippingStreet.trim() || !shippingNumber.trim() || !selectedCityName || !selectedProvinceName || !shippingZipCode.trim()) {
      setError("Por favor completá los campos obligatorios de la dirección.");
      return;
    }
    
    if (!session && (!customerName.trim() || !customerEmail.trim())) {
      setError("Por favor ingresá tu nombre y email para recibir la confirmación.");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shippingStreet: shippingStreet.trim(),
          shippingNumber: shippingNumber.trim(),
          shippingApartment: shippingApartment.trim(),
          shippingCity: selectedCityName,
          shippingProvince: selectedProvinceName,
          shippingZipCode: shippingZipCode.trim(),
          customerName: customerName.trim() || null,
          customerEmail: customerEmail.trim() || session?.user?.email || null,
        }),
      });

      const data = await res.json();

      if (res.ok && data.init_point) {
        window.location.href = data.init_point;
      } else {
        setError(data.message || "Ocurrió un error al procesar el pago.");
        setIsProcessing(false);
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión. Intentá de nuevo.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Datos del cliente */}
        {!session && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <UserIcon className="w-5 h-5 text-[#c49e62]" />
              <h2 className="text-base font-medium text-[#4A4238]">Tus datos</h2>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#8C8377] mb-1.5">
                Nombre y apellido *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ej: María González"
                className="w-full border border-[#EAE5DF] rounded-lg px-3 py-2.5 text-sm text-[#4A4238] focus:outline-none focus:border-[#c49e62] transition-colors bg-[#FDFBF7]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#8C8377] mb-1.5">
                Email *
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full border border-[#EAE5DF] rounded-lg px-3 py-2.5 text-sm text-[#4A4238] focus:outline-none focus:border-[#c49e62] transition-colors bg-[#FDFBF7]"
              />
            </div>
          </section>
        )}

        {/* Dirección de envío granulares */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-[#c49e62]" />
            <h2 className="text-base font-medium text-[#4A4238]">
              Dirección de envío
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs uppercase tracking-widest text-[#8C8377] mb-1.5">Provincia *</label>
              <select
                value={selectedProvinceId}
                onChange={handleProvinceChange}
                className="w-full border border-[#EAE5DF] rounded-lg px-3 py-2.5 text-sm text-[#4A4238] focus:outline-none focus:border-[#c49e62] bg-[#FDFBF7]"
              >
                <option value="">Selecciona tu provincia...</option>
                {provinces.map((prov) => (
                  <option key={prov.id} value={prov.id}>
                    {prov.nombre}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-span-2">
              <label className="block text-xs uppercase tracking-widest text-[#8C8377] mb-1.5">Ciudad *</label>
              <select
                value={selectedCityId}
                onChange={handleCityChange}
                disabled={!selectedProvinceId}
                className={`w-full border border-[#EAE5DF] rounded-lg px-3 py-2.5 text-sm text-[#4A4238] focus:outline-none focus:border-[#c49e62] transition-colors ${
                  !selectedProvinceId ? 'bg-gray-100 cursor-not-allowed text-[#C5BFB8]' : 'bg-[#FDFBF7]'
                }`}
              >
                <option value="">
                  {!selectedProvinceId ? 'Primero selecciona una provincia' : 'Selecciona tu ciudad...'}
                </option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-xs uppercase tracking-widest text-[#8C8377] mb-1.5">Calle *</label>
              <input
                type="text"
                value={shippingStreet}
                onChange={(e) => setShippingStreet(e.target.value)}
                placeholder="Ej: Av. Corrientes"
                className="w-full border border-[#EAE5DF] rounded-lg px-3 py-2.5 text-sm text-[#4A4238] focus:outline-none focus:border-[#c49e62] bg-[#FDFBF7]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#8C8377] mb-1.5">Número *</label>
              <input
                type="text"
                value={shippingNumber}
                onChange={(e) => setShippingNumber(e.target.value)}
                placeholder="1234"
                className="w-full border border-[#EAE5DF] rounded-lg px-3 py-2.5 text-sm text-[#4A4238] focus:outline-none focus:border-[#c49e62] bg-[#FDFBF7]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#8C8377] mb-1.5">Piso/Dpto</label>
              <input
                type="text"
                value={shippingApartment}
                onChange={(e) => setShippingApartment(e.target.value)}
                placeholder="3B"
                className="w-full border border-[#EAE5DF] rounded-lg px-3 py-2.5 text-sm text-[#4A4238] focus:outline-none focus:border-[#c49e62] bg-[#FDFBF7]"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs uppercase tracking-widest text-[#8C8377] mb-1.5">CP *</label>
              <input
                type="text"
                value={shippingZipCode}
                onChange={(e) => setShippingZipCode(e.target.value)}
                placeholder="1043"
                className="w-full border border-[#EAE5DF] rounded-lg px-3 py-2.5 text-sm text-[#4A4238] focus:outline-none focus:border-[#c49e62] bg-[#FDFBF7]"
              />
            </div>
          </div>
        </section>

      </div>

      {/* Footer de pago */}
      <div className="p-6 border-t border-[#EAE5DF] bg-[#FDFBF7] mt-auto shrink-0">
        {error && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}
        
        <div className="flex justify-between text-sm text-[#8C8377] mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-[#8C8377] mb-4 border-b border-[#EAE5DF] pb-4">
          <span>Envío</span>
          <span>{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : "Gratis"}</span>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <span className="font-medium text-[#4A4238]">Total</span>
          <span className="text-xl font-medium text-[#4A4238]">
            ${total.toFixed(2)}
          </span>
        </div>

        <button
          onClick={handlePagar}
          disabled={isProcessing}
          className="w-full bg-[#4A4238] text-white py-4 rounded-xl font-medium hover:bg-[#3A332C] transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <CreditCard className="w-4 h-4" />
              Pagar con Mercado Pago
            </>
          )}
        </button>
      </div>
    </div>
  );
}
