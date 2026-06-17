"use client";
import { useState } from "react";
import { createManualUser, createManualOrder } from "@/app/admin/actions";
import type { User, Order, OrderItem, Product } from "@prisma/client";

type OrderWithItems = Order & {
  items: (OrderItem & { product: Product })[];
};

export type UserWithOrders = User & {
  orders: OrderWithItems[];
};

export default function AdminCustomerTab({ 
  users, 
  products 
}: { 
  users: UserWithOrders[], 
  products: Product[] 
}) {
  const [selectedUser, setSelectedUser] = useState<UserWithOrders | null>(null);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  
  // New Order State
  const [orderItems, setOrderItems] = useState<{ productId: string, quantity: number, price: number, name: string }[]>([]);
  const [orderChannel, setOrderChannel] = useState("PRESENCIAL");
  const [userError, setUserError] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserError(null);
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const result = await createManualUser(formData);
    
    if (result?.error) {
      setUserError(result.error);
    } else {
      setIsNewUserModalOpen(false);
    }
    setIsSubmitting(false);
  };

  const handleAddProductToOrder = (productId: string) => {
    if (!productId || productId === "none") return;
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setOrderItems(prev => {
      const existing = prev.find(i => i.productId === productId);
      if (existing) {
        return prev.map(i => i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { productId: product.id, quantity: 1, price: product.price || 0, name: product.title }];
    });
  };

  const handleRemoveProductFromOrder = (productId: string) => {
    setOrderItems(prev => prev.filter(i => i.productId !== productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setOrderItems(prev => prev.map(i => i.productId === productId ? { ...i, quantity } : i));
  };

  const handleCreateOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUser) return;
    if (orderItems.length === 0) {
      setOrderError("Debes agregar al menos un producto a la orden.");
      return;
    }

    setOrderError(null);
    setIsSubmitting(true);
    
    const result = await createManualOrder(
      selectedUser.id, 
      orderItems.map(({ productId, quantity, price }) => ({ productId, quantity, price })), 
      orderChannel
    );

    if (result?.error) {
      setOrderError(result.error);
    } else {
      setIsNewOrderModalOpen(false);
      setOrderItems([]);
    }
    setIsSubmitting(false);
  };

  const orderTotal = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Users List */}
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="font-headline-md text-2xl text-primary">Clientes ({users.length})</h2>
          <button 
            onClick={() => setIsNewUserModalOpen(true)}
            className="text-primary hover:opacity-70 material-symbols-outlined bg-surface p-2 rounded-full border border-primary/20 soft-glow"
            title="Nuevo Cliente"
          >
            person_add
          </button>
        </div>
        
        <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-2">
          {users.map(user => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`p-4 text-left rounded-sm border transition-all ${selectedUser?.id === user.id ? 'bg-primary/10 border-primary' : 'bg-surface border-primary/10 hover:border-primary/50'}`}
            >
              <div className="font-bold text-primary">{user.name || 'Sin Nombre'}</div>
              <div className="text-sm text-on-surface-variant">{user.email}</div>
              <div className="text-xs mt-2 bg-secondary-container/30 px-2 py-1 rounded-full w-max text-primary">
                {user.orders.length} Compra{user.orders.length !== 1 ? 's' : ''}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* User Details & Orders */}
      <div className="w-full md:w-2/3 bg-surface p-6 rounded-sm border border-primary/10 soft-glow min-h-[400px]">
        {selectedUser ? (
          <div>
            <div className="flex justify-between items-start mb-6 pb-4 border-b border-primary/10">
              <div>
                <h3 className="font-headline-md text-3xl text-primary">{selectedUser.name || 'Sin Nombre'}</h3>
                <p className="text-on-surface-variant">{selectedUser.email}</p>
              </div>
              <button 
                onClick={() => {
                  setOrderItems([]);
                  setIsNewOrderModalOpen(true);
                }}
                className="bg-primary text-on-primary py-2 px-6 font-label-sm uppercase tracking-widest"
              >
                + Nueva Compra
              </button>
            </div>

            <h4 className="font-bold text-lg mb-4 text-primary">Historial de Compras</h4>
            {selectedUser.orders.length === 0 ? (
              <p className="text-on-surface-variant text-sm italic">Este cliente aún no tiene compras registradas.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {selectedUser.orders.map(order => (
                  <div key={order.id} className="border border-primary/10 p-4 rounded-sm bg-surface-container-low">
                    <div className="flex justify-between items-center mb-2 border-b border-primary/5 pb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-label-sm text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-sm uppercase tracking-wider">
                          {(order as any).channel || 'ONLINE'}
                        </span>
                      </div>
                      <div className="font-bold text-primary">${order.total}</div>
                    </div>
                    <ul className="text-sm text-on-surface-variant list-disc list-inside">
                      {order.items.map(item => (
                        <li key={item.id}>
                          {item.quantity}x {item.product.title} <span className="text-xs opacity-70">(${item.price} c/u)</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-on-surface-variant italic">
            Selecciona un cliente para ver su historial.
          </div>
        )}
      </div>

      {/* New User Modal */}
      {isNewUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface p-8 rounded-sm soft-glow border border-primary/20 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-md text-2xl text-primary">Crear Cliente</h2>
              <button onClick={() => setIsNewUserModalOpen(false)} className="text-on-surface-variant hover:text-primary material-symbols-outlined">close</button>
            </div>
            <form onSubmit={handleCreateUser} className="flex flex-col gap-4">
              <input name="name" placeholder="Nombre completo" required className="input-elegant py-2" />
              <input name="email" type="email" placeholder="Email" required className="input-elegant py-2" />
              {userError && <p className="text-red-500 text-xs">{userError}</p>}
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={() => setIsNewUserModalOpen(false)} className="border border-primary text-primary py-2 px-4 font-label-sm uppercase tracking-widest w-1/3">Cancelar</button>
                <button type="submit" disabled={isSubmitting} className="bg-primary text-on-primary py-2 px-4 font-label-sm uppercase tracking-widest flex-grow disabled:opacity-50">Crear</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Order Modal */}
      {isNewOrderModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface p-8 rounded-sm soft-glow border border-primary/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-md text-2xl text-primary">Registrar Compra - {selectedUser.name}</h2>
              <button onClick={() => setIsNewOrderModalOpen(false)} className="text-on-surface-variant hover:text-primary material-symbols-outlined">close</button>
            </div>
            
            <div className="flex gap-4 mb-6">
              <div className="flex-grow">
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-label-sm mb-1 block">Agregar Producto</label>
                <select 
                  onChange={(e) => handleAddProductToOrder(e.target.value)} 
                  className="input-elegant py-2 w-full bg-transparent"
                  value="none"
                >
                  <option value="none">Seleccionar un producto...</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.title} (${p.price})</option>
                  ))}
                </select>
              </div>
              <div className="w-1/3">
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-label-sm mb-1 block">Medio de Venta</label>
                <select 
                  value={orderChannel}
                  onChange={(e) => setOrderChannel(e.target.value)}
                  className="input-elegant py-2 w-full bg-transparent"
                >
                  <option value="ONLINE">Online</option>
                  <option value="PRESENCIAL">Presencial</option>
                  <option value="OTRO">Otro Medio</option>
                </select>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto mb-6">
              <h4 className="font-bold text-sm mb-2 text-primary border-b border-primary/10 pb-1">Productos en la Orden</h4>
              {orderItems.length === 0 ? (
                <p className="text-sm text-on-surface-variant italic py-4">No hay productos agregados.</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {orderItems.map(item => (
                    <li key={item.productId} className="flex justify-between items-center bg-surface-container-low p-2 rounded-sm border border-primary/5">
                      <div className="flex-grow text-sm font-bold text-primary">{item.name}</div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-primary/20 rounded-sm">
                          <button onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)} className="px-2 py-1 text-primary hover:bg-primary/5">-</button>
                          <span className="px-2 text-sm w-8 text-center">{item.quantity}</span>
                          <button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)} className="px-2 py-1 text-primary hover:bg-primary/5">+</button>
                        </div>
                        <div className="text-sm w-16 text-right">${item.price * item.quantity}</div>
                        <button onClick={() => handleRemoveProductFromOrder(item.productId)} className="text-red-500 hover:text-red-700 material-symbols-outlined text-sm">close</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-primary/10 pt-4 mb-4 flex justify-between items-center">
              <span className="font-bold uppercase tracking-widest text-on-surface-variant">Total</span>
              <span className="font-headline-md text-2xl text-primary">${orderTotal}</span>
            </div>

            {orderError && <p className="text-red-500 text-xs mb-4">{orderError}</p>}

            <form onSubmit={handleCreateOrder} className="flex gap-2">
              <button type="button" onClick={() => setIsNewOrderModalOpen(false)} className="border border-primary text-primary py-3 px-4 font-label-sm uppercase tracking-widest w-1/3">Cancelar</button>
              <button type="submit" disabled={isSubmitting || orderItems.length === 0} className="bg-primary text-on-primary py-3 px-4 font-label-sm uppercase tracking-widest flex-grow disabled:opacity-50">
                Guardar Compra
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
