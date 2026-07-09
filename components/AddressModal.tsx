import { useState, useEffect } from "react";
export default function AddressModal({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (address: any) => void;
  initialData?: any;
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    street: initialData?.street || "",
    number: initialData?.number || "",
    apartment: initialData?.apartment || "",
    city: initialData?.city || "",
    province: initialData?.province || "",
    zipCode: initialData?.zipCode || "",
    phone: initialData?.phone || "",
    dni: initialData?.dni || "",
  });
  
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        street: initialData.street || "",
        number: initialData.number || "",
        apartment: initialData.apartment || "",
        city: initialData.city || "",
        province: initialData.province || "",
        zipCode: initialData.zipCode || "",
        phone: initialData.phone || "",
        dni: initialData.dni || "",
      });
    } else {
      setFormData({
        name: "", street: "", number: "", apartment: "", city: "", province: "", zipCode: "", phone: "", dni: "",
      });
    }
  }, [initialData, isOpen]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre&max=100")
        .then(res => res.json())
        .then(data => {
          if (data.provincias) {
            const sorted = data.provincias.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
            setProvinces(sorted);
          }
        })
        .catch(console.error);
    }
  }, [isOpen]);

  useEffect(() => {
    if (formData.province) {
      setLoadingCities(true);
      fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${encodeURIComponent(formData.province)}&campos=id,nombre&max=1000`)
        .then(res => res.json())
        .then(data => {
          if (data.localidades) {
            const sorted = data.localidades.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
            setCities(sorted);
          }
        })
        .catch(console.error)
        .finally(() => setLoadingCities(false));
    } else {
      setCities([]);
    }
  }, [formData.province]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const isEditing = !!initialData?.id;
      const url = isEditing ? `/api/user/addresses/${initialData.id}` : "/api/user/addresses";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        onSuccess(data.address);
        setFormData({
          name: "", street: "", number: "", apartment: "", city: "", province: "", zipCode: "", phone: "", dni: ""
        });
        onClose();
      } else {
        const err = await res.json();
        setError(err.message || "Error al guardar la dirección");
      }
    } catch (err) {
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container w-full max-w-lg rounded-2xl p-6 md:p-8 shadow-xl border border-primary/10 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <h2 className="font-headline-md text-2xl text-primary mb-6">
          {initialData ? "Editar Dirección" : "Nueva Dirección"}
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="font-label-sm text-[10px] uppercase text-primary mb-1 block">Nombre de la dirección *</label>
              <input required type="text" placeholder="Ej: Casa, Trabajo..." value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-surface border border-primary/20 rounded-lg p-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="font-label-sm text-[10px] uppercase text-primary mb-1 block">Calle *</label>
              <input required type="text" value={formData.street} onChange={e => setFormData({ ...formData, street: e.target.value })} className="w-full bg-surface border border-primary/20 rounded-lg p-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
            <div>
              <label className="font-label-sm text-[10px] uppercase text-primary mb-1 block">Número *</label>
              <input required type="text" value={formData.number} onChange={e => setFormData({ ...formData, number: e.target.value })} className="w-full bg-surface border border-primary/20 rounded-lg p-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
            <div>
              <label className="font-label-sm text-[10px] uppercase text-primary mb-1 block">Depto (opc)</label>
              <input type="text" value={formData.apartment} onChange={e => setFormData({ ...formData, apartment: e.target.value })} className="w-full bg-surface border border-primary/20 rounded-lg p-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
            <div className="col-span-2">
              <label className="font-label-sm text-[10px] uppercase text-primary mb-1 block">Provincia *</label>
              <select required value={formData.province} onChange={e => setFormData({ ...formData, province: e.target.value, city: "" })} className="w-full bg-surface border border-primary/20 rounded-lg p-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
                <option value="">Selecciona Provincia</option>
                {provinces.map(p => <option key={p.id} value={p.nombre}>{p.nombre}</option>)}
              </select>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="font-label-sm text-[10px] uppercase text-primary mb-1 block">Ciudad *</label>
              <select required value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} disabled={!formData.province || loadingCities} className="w-full bg-surface border border-primary/20 rounded-lg p-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50">
                <option value="">{loadingCities ? "Cargando..." : "Selecciona Ciudad"}</option>
                {cities.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
              </select>
            </div>
            <div>
              <label className="font-label-sm text-[10px] uppercase text-primary mb-1 block">C.P. *</label>
              <input required type="text" value={formData.zipCode} onChange={e => setFormData({ ...formData, zipCode: e.target.value })} className="w-full bg-surface border border-primary/20 rounded-lg p-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
            <div>
              <label className="font-label-sm text-[10px] uppercase text-primary mb-1 block">DNI / CUIL *</label>
              <input required type="text" value={formData.dni} onChange={e => setFormData({ ...formData, dni: e.target.value })} className="w-full bg-surface border border-primary/20 rounded-lg p-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
            <div>
              <label className="font-label-sm text-[10px] uppercase text-primary mb-1 block">Teléfono de contacto *</label>
              <input required type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-surface border border-primary/20 rounded-lg p-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2 font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">Cancelar</button>
            <button type="submit" disabled={loading} className="px-6 py-3 font-label-sm text-[10px] uppercase tracking-widest bg-primary text-on-primary rounded-lg metallic-edge hover:opacity-90 transition-all disabled:opacity-70">
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
