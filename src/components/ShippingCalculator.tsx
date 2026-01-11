"use client";

import { useState } from "react";

interface ShippingRate {
  method: string;
  price: number;
  days: string;
}

const US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

// States that have additional shipping costs
const REMOTE_STATES = ["AK", "HI"];

export function calculateShipping(
  orderTotal: number,
  stateCode: string
): ShippingRate[] {
  const isRemote = REMOTE_STATES.includes(stateCode);
  const remoteSurcharge = isRemote ? 5.00 : 0;

  let standardPrice: number;
  let expressPrice: number;

  if (orderTotal >= 5000) { // $50 in cents
    standardPrice = 0;
    expressPrice = 899 + remoteSurcharge * 100;
  } else if (orderTotal >= 2500) { // $25 in cents
    standardPrice = 499 + remoteSurcharge * 100;
    expressPrice = 1099 + remoteSurcharge * 100;
  } else {
    standardPrice = 599 + remoteSurcharge * 100;
    expressPrice = 1299 + remoteSurcharge * 100;
  }

  const standardDays = isRemote ? "7-10" : "5-7";
  const expressDays = isRemote ? "3-5" : "2-3";

  return [
    {
      method: "Standard Shipping",
      price: standardPrice,
      days: `${standardDays} business days`,
    },
    {
      method: "Express Shipping",
      price: expressPrice,
      days: `${expressDays} business days`,
    },
  ];
}

interface ShippingCalculatorProps {
  orderTotal?: number;
  onSelectRate?: (rate: ShippingRate) => void;
}

export default function ShippingCalculator({
  orderTotal = 2500, // Default $25
  onSelectRate,
}: ShippingCalculatorProps) {
  const [selectedState, setSelectedState] = useState("");
  const [rates, setRates] = useState<ShippingRate[] | null>(null);

  const handleCalculate = () => {
    if (!selectedState) return;
    const shippingRates = calculateShipping(orderTotal, selectedState);
    setRates(shippingRates);
  };

  const formatPrice = (cents: number) => {
    if (cents === 0) return "FREE";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="state"
          className="block text-14 font-medium text-brown mb-2"
        >
          Ship to:
        </label>
        <select
          id="state"
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setRates(null);
          }}
          className="w-full px-4 py-3 rounded-lg border border-brown/20 bg-white text-brown focus:outline-none focus:border-brown"
        >
          <option value="">Select a state</option>
          {US_STATES.map((state) => (
            <option key={state.code} value={state.code}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleCalculate}
        disabled={!selectedState}
        className="w-full bg-brown text-cream px-6 py-3 rounded-lg font-semibold hover:bg-brown/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Calculate Shipping
      </button>

      {rates && (
        <div className="space-y-3 pt-4">
          <h3 className="text-16 font-semibold text-brown">Available Options:</h3>
          {rates.map((rate, index) => (
            <div
              key={index}
              onClick={() => onSelectRate?.(rate)}
              className={`p-4 rounded-lg border ${
                onSelectRate
                  ? "cursor-pointer hover:border-brown"
                  : ""
              } ${
                rate.price === 0
                  ? "border-green-300 bg-green-50"
                  : "border-brown/20 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-16 font-medium text-brown">
                  {rate.method}
                </span>
                <span
                  className={`text-16 font-semibold ${
                    rate.price === 0 ? "text-green-600" : "text-brown"
                  }`}
                >
                  {formatPrice(rate.price)}
                </span>
              </div>
              <p className="text-14 text-brown/60">{rate.days}</p>
            </div>
          ))}

          {REMOTE_STATES.includes(selectedState) && (
            <p className="text-14 text-brown/60 italic">
              * Additional surcharge applies for Alaska and Hawaii shipments.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
