import { Types } from "mongoose";

// Define an enumeration for the vehicle types
enum VehicleType {
  Car = "car",
  Truck = "truck",
  SUV = "SUV",
  Van = "van",
  Motorcycle = "motorcycle",
  Bus = "bus",
  ElectricVehicle = "electricVehicle",
  HybridVehicle = "hybridVehicle",
  Bicycle = "bicycle",
  Tractor = "tractor",
}

// Define the interface for the booking system
export interface IBooking {
  customer: Types.ObjectId | string;
  slot: Types.ObjectId | string;
  service: Types.ObjectId | string;
  vehicleType: VehicleType;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
}
