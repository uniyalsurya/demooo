import { useState } from "react";
import DatePicker from "react-datepicker";
// import  "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Calendar } from "lucide-react"; // optional icon from lucide-react

export default function DateSelector() {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 relative">
      {/* Calendar Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
      >
        <Calendar className="w-5 h-5 text-gray-700" />
      </button>

      {/* Selected Date */}
      <span className="text-sm text-gray-700">
        {format(startDate, "dd MMMM yyyy")}
      </span>

      {/* Date Picker Popup */}
      {isOpen && (
        <div className="absolute top-10 left-0 bg-white shadow-lg p-2 rounded-lg z-50">
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setIsOpen(false);
            }}
            inline
          />
        </div>
      )}
    </div>
  );
}
