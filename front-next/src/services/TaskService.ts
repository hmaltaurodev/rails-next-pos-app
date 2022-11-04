import axiosInstance from '../utils/axios'

const TaskService = {
  getAll: async () => {
    const response = await axiosInstance.get('/tasks');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axiosInstance.get(`/tasks/${id}`);
    return response.data;
  },

  create: async (task: any) => {
    if (!task) return

    const response = await axiosInstance.post('/tasks', { task: task })
    return response.data
  },

  destroy: async (id: number) => {
    if (!id) return

    const response = await axiosInstance.delete(`/tasks/${id}`)
    return response.data
  },

  update: async (id: number, task: any) => {
    if (!id && !task) return

    const response = await axiosInstance.put(`/tasks/${id}`, { task: task })
    return response.data
  }
}

export default TaskService;
