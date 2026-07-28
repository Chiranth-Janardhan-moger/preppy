import React, { useState } from 'react';
import { User, Package, MapPin, Settings, Award, ShieldCheck, CheckCircle2, Truck, Clock } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const UserAccountPage: React.FC = () => {
  const { user, updateUser, formatPrice, navigateTo } = useShop();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'settings'>('orders');

  const [editName, setEditName] = useState(user.name);
  const [editPhone, setEditPhone] = useState(user.phone);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: editName, phone: editPhone });
  };

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
      {/* Profile Header Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-8 md:p-10 border border-[#C5A880]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-6">
          <img
            src={user.avatar}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#C5A880] shadow-lg"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-serif-luxury text-2xl md:text-3xl font-bold">{user.name}</h1>
              <span className="bg-[#C5A880] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full flex items-center gap-1">
                <Award className="w-3 h-3" /> {user.tier}
              </span>
            </div>
            <p className="text-xs text-gray-400">{user.email} • Patron Member Since {user.joinedDate}</p>
          </div>
        </div>

        <div className="flex gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8 text-xs text-center md:text-left">
          <div>
            <span className="text-gray-400 block font-medium">Completed Orders</span>
            <strong className="text-lg text-[#C5A880] font-serif-luxury">{user.orders.length} Reservations</strong>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-neutral-800 gap-8 overflow-x-auto no-scrollbar">
        {[
          { id: 'orders', label: 'Haute Orders & Status', icon: Package },
          { id: 'addresses', label: 'Saved Atelier Addresses', icon: MapPin },
          { id: 'settings', label: 'VIP Profile Settings', icon: Settings },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-xs uppercase tracking-widest font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#C5A880] text-[#C5A880]'
                  : 'border-transparent text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div>
        {activeTab === 'orders' && (
          <div className="space-y-8">
            {user.orders.length === 0 ? (
              <p className="text-xs text-gray-500 py-12 text-center">No previous order history found.</p>
            ) : (
              user.orders.map(ord => (
                <div key={ord.id} className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-gray-200 dark:border-neutral-800 shadow-lg space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 text-xs">
                    <div>
                      <span className="text-gray-400 uppercase font-semibold block">Reservation Ref</span>
                      <strong className="text-black dark:text-white font-mono text-sm">{ord.id}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 uppercase font-semibold block">Date</span>
                      <span>{ord.date}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 uppercase font-semibold block">Total</span>
                      <span className="text-[#C5A880] font-bold">{formatPrice(ord.totalAmount)}</span>
                    </div>
                    <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {ord.status}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <img src={item.product.images[0]} alt="" referrerPolicy="no-referrer" className="w-16 h-20 object-cover rounded bg-stone-200" />
                        <div className="flex-1 text-xs space-y-1">
                          <h4 className="font-serif-luxury font-semibold text-sm">{item.product.name}</h4>
                          <p className="text-gray-400">Color: {item.selectedColor.name} • Size: {item.selectedSize}</p>
                          <span className="text-[#C5A880] font-semibold">{formatPrice(item.product.price)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tracking Bar */}
                  <div className="bg-stone-50 dark:bg-neutral-800 p-4 rounded-lg flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#C5A880]" /> GPS Tracking Code: <strong className="text-black dark:text-white font-mono">{ord.trackingNumber}</strong>
                    </span>
                    <span>Delivered via White-Glove Insured Courier</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.addresses.map(addr => (
              <div key={addr.id} className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-[#C5A880]/30 shadow-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-serif-luxury font-semibold text-base">{addr.title}</h4>
                  {addr.isDefault && (
                    <span className="bg-[#C5A880] text-white text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                      Primary Destination
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1 leading-relaxed">
                  <p className="font-medium text-black dark:text-white">{addr.fullName}</p>
                  <p>{addr.street}</p>
                  <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                  <p>{addr.country}</p>
                  <p className="text-gray-400 pt-1">Phone: {addr.phone}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <form onSubmit={handleSaveProfile} className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-xl max-w-xl space-y-6">
            <h3 className="font-serif-luxury text-xl font-semibold">Update Patron Details</h3>

            <div className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-gray-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full p-3 bg-stone-50 dark:bg-neutral-800 border rounded outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={e => setEditPhone(e.target.value)}
                  className="w-full p-3 bg-stone-50 dark:bg-neutral-800 border rounded outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#C5A880] text-black px-8 py-3 rounded text-xs uppercase font-bold tracking-widest hover:bg-[#A88B60]"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
