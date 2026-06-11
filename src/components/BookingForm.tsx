import type { Item } from "../data/products";
import BookingFormTour from "./booking/BookingFormTour";
import BookingFormSalon from "./booking/BookingFormSalon";
import BookingFormHotel from "./booking/BookingFormHotel";
import BookingFormPackage from "./booking/BookingFormPackage";

interface BookingFormProps {
  item: Item;
  onClose: () => void;
  onConfirm: () => void;
}

export default function BookingForm({ item, onClose, onConfirm }: BookingFormProps) {
  const props = { item, onClose, onConfirm };

  switch (item.category) {
    case "tour":    return <BookingFormTour    {...props} />;
    case "salon":   return <BookingFormSalon   {...props} />;
    case "hotel":   return <BookingFormHotel   {...props} />;
    case "package": return <BookingFormPackage {...props} />;
    default:        return <BookingFormTour    {...props} />;
  }
}
