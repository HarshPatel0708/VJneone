import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CurrencyConfig {
  code: string;
  symbol: string;
  rate: number; // exchange rate relative to USD
}

export const currencies: Record<string, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", rate: 1.0 },
  EUR: { code: "EUR", symbol: "€", rate: 0.92 },
  GBP: { code: "GBP", symbol: "£", rate: 0.78 },
  AUD: { code: "AUD", symbol: "A$", rate: 1.51 },
  CAD: { code: "CAD", symbol: "C$", rate: 1.37 },
};

export interface CountryConfig {
  code: string;
  name: string;
  currency: string;
}

export const countries: CountryConfig[] = [
  { code: "US", name: "United States", currency: "USD" },
  { code: "DE", name: "Germany", currency: "EUR" },
  { code: "GB", name: "United Kingdom", currency: "GBP" },
  { code: "AU", name: "Australia", currency: "AUD" },
  { code: "CA", name: "Canada", currency: "CAD" },
];

interface ConfigState {
  currency: CurrencyConfig;
  country: CountryConfig;
  setCurrency: (code: string) => void;
  setCountry: (code: string) => void;
  formatPrice: (priceUSD: number) => string;
}

export const useConfig = create<ConfigState>()(
  persist(
    (set, get) => ({
      currency: currencies.USD,
      country: countries[0],

      setCurrency: (code) => {
        const selected = currencies[code];
        if (selected) {
          set({ currency: selected });
        }
      },

      setCountry: (code) => {
        const selectedCountry = countries.find((c) => c.code === code);
        if (selectedCountry) {
          set({
            country: selectedCountry,
            currency: currencies[selectedCountry.currency] || currencies.USD,
          });
        }
      },

      formatPrice: (priceUSD) => {
        const { symbol, rate } = get().currency;
        const converted = priceUSD * rate;
        return `${symbol}${Math.round(converted).toLocaleString()}`;
      },
    }),
    {
      name: "vjneon-config",
    }
  )
);
