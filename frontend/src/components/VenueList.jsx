// Gerekli bileşenleri içe aktar
import Venue from "./Venue"; // Tek bir mekan kartı bileşeni
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import VenueAdmin from "./VenueAdmin";

// Mekan listesi bileşeni - Birden fazla mekanı listeler
const VenueList = ({ venues }) => {
  const [isAdminPage, setIsAdminPage] = React.useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("admin")) {
      setIsAdminPage(true);
    }
  }, [isAdminPage]);
  return (
    <div>
      {/* Mekanlar varsa, her birini Venue bileşeni ile göster */}
      {/* map() fonksiyonu ile venues dizisindeki her elemanı döngüye al */}
      {/* key={index} = React'in her elemanı takip edebilmesi için benzersiz anahtar */}
      {venues ? (venues.map((venue, index) => (
        !!isAdminPage ? (
          <VenueAdmin key={index} venue={venue} />
        ) : (
          <Venue key={index} venue={venue} />
        )
      ))) : ("") // Mekan yoksa boş string göster
      }
    </div>
  );
};

// Bileşeni dışa aktar
export default VenueList;
