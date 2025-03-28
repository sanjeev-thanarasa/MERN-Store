import { create } from "zustand";

export const userProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields" };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || "Failed to create product",
        };
      }

      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] }));

      return {
        success: true,
        message: "Product created successfully",
      };
    } catch (err) {
      console.error("Error creating product:", err);
      return {
        success: false,
        message: "Network error: Unable to create product",
      };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) {
        console.error("Failed to fetch products:", res.statusText);
        return;
      }
      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: "Product deleted successfully" };
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || "Failed to update product",
        };
      }

      const data = await res.json();
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: "Product updated successfully" };
    } catch (err) {
      console.error("Error updating product:", err);
      return {
        success: false,
        message: "Network error: Unable to update product",
      };
    }
  },
}));
