import IService from "./service.interface";
import Service from "./service.model";

const createService = async (payload: IService) => {
  const result = await Service.create(payload);
  return result;
};

export const getSingleService = async (id: string) => {
  const result = await Service.findById(id);
  return result;
};

const servicesService = {
  createService,
  getSingleService,
};

export default servicesService;
