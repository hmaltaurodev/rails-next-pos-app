import axiosInstance from "../utils/axios"

const CategoryService = {
  getAll: async () => {
    const response = await axiosInstance.get('/categories');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axiosInstance.get(`/categories/${id}`);
    return response.data;
  },

  create: async (category: any) => {
    if (!category) return

    const response = await axiosInstance.post('/categories', { category: category })
    return response.data
  },

  destroy: async (id: number) => {
    if (!id) return

    const response = await axiosInstance.delete(`/categories/${id}`)
    return response.data
  },

  update: async (id: number, category: any) => {
    if (!id && !category) return

    const response = await axiosInstance.put(`/categories/${id}`, { category: category })
    return response.data
  }
}

export default CategoryService;
