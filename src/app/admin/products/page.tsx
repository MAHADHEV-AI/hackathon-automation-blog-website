'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Save,
  X,
  Check,
  AlertCircle,
  Tag,
  Scale,
  Sparkles,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Product, ProductCategory } from '@/lib/types';
import { CATEGORIES_DATA } from '@/lib/data';

export default function AdminProductsPage() {
  const {
    products,
    updateProductPrice,
    updateProductStock,
    addNewProduct,
    editProduct,
    removeProduct,
  } = useStore();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form states
  const [name, setName] = useState('');
  const [tamilName, setTamilName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('chicken');
  const [basePrice, setBasePrice] = useState(199);
  const [discountPrice, setDiscountPrice] = useState<number | undefined>(185);
  const [stockQuantity, setStockQuantity] = useState(50);
  const [cuttingType, setCuttingType] = useState('Medium Curry Cut');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80'
  );

  // Inline editing state for quick price/stock updates
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPriceVal, setEditPriceVal] = useState<number>(0);
  const [editDiscountVal, setEditDiscountVal] = useState<number | undefined>(0);
  const [editStockVal, setEditStockVal] = useState<number>(0);

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setEditPriceVal(p.basePrice);
    setEditDiscountVal(p.discountPrice);
    setEditStockVal(p.stockQuantity);
  };

  const saveEdit = (productId: string) => {
    updateProductPrice(productId, editPriceVal, editDiscountVal);
    const p = products.find((prod) => prod.id === productId);
    if (p) {
      updateProductStock(productId, editStockVal, p.isAvailable);
    }
    setEditingId(null);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProd: Product = {
      id: slug,
      name,
      tamilName,
      slug,
      category,
      description: description || 'Freshly cut and trimmed meat from Komban Cuts butchery.',
      shortDescription: description ? description.slice(0, 70) : 'Freshly prepared meat cut.',
      cuttingType,
      grossWeight: '500g',
      netWeight: '480g - 500g',
      serves: '2-3 people',
      basePrice,
      discountPrice,
      stockQuantity,
      isAvailable: true,
      imageUrl,
      variants: [
        {
          id: `${slug}-250`,
          weightLabel: '250g',
          price: Math.round(basePrice * 0.5),
          discountPrice: discountPrice ? Math.round(discountPrice * 0.5) : undefined,
          multiplier: 0.5,
          stock: Math.round(stockQuantity * 0.5),
        },
        {
          id: `${slug}-500`,
          weightLabel: '500g',
          price: basePrice,
          discountPrice,
          multiplier: 1.0,
          stock: stockQuantity,
        },
        {
          id: `${slug}-1000`,
          weightLabel: '1kg',
          price: Math.round(basePrice * 1.9),
          discountPrice: discountPrice ? Math.round(discountPrice * 1.9) : undefined,
          multiplier: 2.0,
          stock: Math.round(stockQuantity * 0.5),
        },
      ],
      rating: 5.0,
      reviewCount: 1,
    };

    addNewProduct(newProd);
    setShowAddModal(false);
    setName('');
    setTamilName('');
    setDescription('');
  };

  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCat === 'all' || p.category === selectedCat;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tamilName?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-gray-900 tracking-tight">
            Product & Cut Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Add new meat cuts, edit prices, manage discounts, and update Coimbatore butchery inventory
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold rounded-xl shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product Cut</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products or Tamil names..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-brand-red"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              selectedCat === 'all'
                ? 'bg-brand-black text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({products.length})
          </button>
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.slug)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                selectedCat === cat.slug
                  ? 'bg-brand-red text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-bold uppercase text-gray-400">
                <th className="p-4">Product Cut</th>
                <th className="p-4">Category</th>
                <th className="p-4">Base Price</th>
                <th className="p-4">Discount Price</th>
                <th className="p-4">Stock Qty</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((p) => {
                const isEditing = editingId === p.id;

                return (
                  <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                    {/* Product Name & Thumb */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={p.imageUrl}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 block line-clamp-1">
                            {p.name}
                          </span>
                          <span className="text-[11px] text-gray-400 block">
                            {p.tamilName || p.cuttingType}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4 capitalize font-semibold text-gray-600">
                      {p.category.replace('-', ' & ')}
                    </td>

                    {/* Base Price */}
                    <td className="p-4">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editPriceVal}
                          onChange={(e) => setEditPriceVal(Number(e.target.value))}
                          className="w-20 bg-white border border-brand-red rounded-lg px-2 py-1 text-xs font-bold"
                        />
                      ) : (
                        <span className="font-extrabold text-gray-900">
                          ₹{p.basePrice}
                        </span>
                      )}
                    </td>

                    {/* Discount Price */}
                    <td className="p-4">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editDiscountVal || ''}
                          onChange={(e) =>
                            setEditDiscountVal(
                              e.target.value ? Number(e.target.value) : undefined
                            )
                          }
                          placeholder="Optional"
                          className="w-20 bg-white border border-brand-red rounded-lg px-2 py-1 text-xs font-bold"
                        />
                      ) : p.discountPrice ? (
                        <span className="font-extrabold text-brand-red">
                          ₹{p.discountPrice}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>

                    {/* Stock Quantity */}
                    <td className="p-4">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editStockVal}
                          onChange={(e) => setEditStockVal(Number(e.target.value))}
                          className="w-16 bg-white border border-brand-red rounded-lg px-2 py-1 text-xs font-bold"
                        />
                      ) : (
                        <span
                          className={`font-bold ${
                            p.stockQuantity < 25 ? 'text-red-600' : 'text-gray-800'
                          }`}
                        >
                          {p.stockQuantity} units
                        </span>
                      )}
                    </td>

                    {/* Availability Status Toggle */}
                    <td className="p-4">
                      <button
                        onClick={() =>
                          updateProductStock(p.id, p.stockQuantity, !p.isAvailable)
                        }
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-colors ${
                          p.isAvailable
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {p.isAvailable ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => saveEdit(p.id)}
                              className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                              title="Save changes"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(p)}
                              className="p-1.5 text-gray-500 hover:text-brand-red hover:bg-gray-100 rounded-lg transition-colors"
                              title="Quick Edit Price & Stock"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (
                                  confirm(
                                    `Are you sure you want to delete "${p.name}"?`
                                  )
                                ) {
                                  removeProduct(p.id);
                                }
                              }}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setShowAddModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl z-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h2 className="font-display font-black text-xl text-gray-900">
                Add New Meat or Seafood Cut
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Product Name in English *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Chicken Ghee Roast Cut"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Tamil Name (for Coimbatore localization)
                </label>
                <input
                  type="text"
                  value={tamilName}
                  onChange={(e) => setTamilName(e.target.value)}
                  placeholder="e.g. நெய் ரோஸ்ட் சிக்கன்"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-brand-red"
                  >
                    <option value="chicken">Chicken</option>
                    <option value="mutton">Mutton</option>
                    <option value="fish-seafood">Fish & Seafood</option>
                    <option value="eggs">Eggs</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Cutting Style
                  </label>
                  <input
                    type="text"
                    value={cuttingType}
                    onChange={(e) => setCuttingType(e.target.value)}
                    placeholder="e.g. Biryani Cut, Boneless"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Base Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={basePrice}
                    onChange={(e) => setBasePrice(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Discount Price (₹)
                  </label>
                  <input
                    type="number"
                    value={discountPrice || ''}
                    onChange={(e) =>
                      setDiscountPrice(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="Optional"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Initial Stock Qty *
                  </label>
                  <input
                    type="number"
                    required
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Product Image URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed description of cut quality, freshness, recipe suggestions..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:border-brand-red focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Save & Publish Cut
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

