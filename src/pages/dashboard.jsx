import React from "react";
import SellerHeader from "../components/seller-dashboard/SellerHeader";
import SellerStats from "../components/seller-dashboard/SellerStats";
import OrderSection from "../components/seller-dashboard/OrderSection";
import SellerListings from "../components/seller-dashboard/SellerListings";

export default function SellerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans flex justify-center">
      <div className="w-full max-w-7xl flex flex-col gap-8">
        <SellerHeader />
        <SellerStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <OrderSection />
          </div>

          <div className="lg:col-span-1">
            <SellerListings />
          </div>
        </div>
      </div>
    </div>
  );
}
