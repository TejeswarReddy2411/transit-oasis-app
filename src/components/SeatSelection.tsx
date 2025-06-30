import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Circle, User } from 'lucide-react';

interface SeatSelectionProps {
  onSeatSelect: (seats: string[]) => void;
  selectedSeats: string[];
}

const SeatSelection = ({ onSeatSelect, selectedSeats }: SeatSelectionProps) => {
  // Mock seat layout (A-F rows, 1-10 columns for a 60-seat bus)
  const generateSeats = () => {
    const seats = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seatsPerRow = 10;
    
    // Some seats are already booked (mock data)
    const bookedSeats = ['A3', 'B5', 'C1', 'D7', 'E2', 'F8'];
    
    for (let row of rows) {
      for (let col = 1; col <= seatsPerRow; col++) {
        const seatNumber = `${row}${col}`;
        seats.push({
          number: seatNumber,
          isBooked: bookedSeats.includes(seatNumber),
          isSelected: selectedSeats.includes(seatNumber)
        });
      }
    }
    return seats;
  };

  const seats = generateSeats();

  const handleSeatClick = (seatNumber: string) => {
    const seat = seats.find(s => s.number === seatNumber);
    if (seat?.isBooked) return;

    let newSelectedSeats;
    if (selectedSeats.includes(seatNumber)) {
      newSelectedSeats = selectedSeats.filter(s => s !== seatNumber);
    } else {
      newSelectedSeats = [...selectedSeats, seatNumber];
    }
    onSeatSelect(newSelectedSeats);
  };

  const getSeatColor = (seat: any) => {
    if (seat.isBooked) return 'bg-gray-300 cursor-not-allowed';
    if (seat.isSelected) return 'bg-blue-600 text-white';
    return 'bg-green-100 hover:bg-green-200 cursor-pointer';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Select Your Seats
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Legend */}
        <div className="flex items-center gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-100 border rounded"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 border rounded"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-300 border rounded"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div>

        {/* Bus Layout */}
        <div className="bg-gray-100 rounded-lg p-6 max-w-md mx-auto">
          {/* Driver Section */}
          <div className="flex items-center justify-center mb-4 pb-4 border-b border-gray-300">
            <div className="flex items-center gap-2 text-gray-600">
              <Circle className="h-5 w-5" />
              <span className="text-sm">Driver</span>
            </div>
          </div>

          {/* Seats Grid */}
          <div className="grid grid-cols-4 gap-2">
            {seats.map((seat, index) => {
              // Add aisle space after 2nd column
              const shouldAddAisle = (index + 1) % 10 === 3;
              
              return (
                <div key={seat.number} className="flex items-center">
                  <button
                    onClick={() => handleSeatClick(seat.number)}
                    className={`w-8 h-8 rounded text-xs font-medium border transition-colors ${getSeatColor(seat)}`}
                    disabled={seat.isBooked}
                  >
                    {seat.number}
                  </button>
                  {shouldAddAisle && <div className="w-4"></div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Seats Info */}
        {selectedSeats.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Selected Seats:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map(seat => (
                <Badge key={seat} className="bg-blue-100 text-blue-800">
                  {seat}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-blue-700 mt-2">
              Total: {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''} selected
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SeatSelection;
