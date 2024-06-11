interface ISlot {
  service: string;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "canceled";
}

export default ISlot;
