import axiosInstance from '../utils/axios'

const PersonService = {
  getAll: async () => {
    const response = await axiosInstance.get('/persons');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axiosInstance.get(`/persons/${id}`);
    return response.data;
  },

  create: async (person: any) => {
    if (!person) return

    const response = await axiosInstance.post('/persons', { person: person })
    return response.data
  },

  destroy: async (id: number) => {
    if (!id) return

    const response = await axiosInstance.delete(`/persons/${id}`)
    return response.data
  },

  update: async (id: number, person: any) => {
    if (!id && !person) return

    const response = await axiosInstance.put(`/persons/${id}`, { person: person })
    return response.data
  }
}

export default PersonService;
