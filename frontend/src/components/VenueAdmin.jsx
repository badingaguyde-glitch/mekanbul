// Gerekli bileşenleri ve kütüphaneleri içe aktar
import { NavLink } from "react-router-dom"; // Sayfa yönlendirme için link bileşeni
import Rating from "./Rating"; // Yıldız puanlama bileşeni
import FoodAndDrinkList from "./FoodAndDrinkList"; // Yiyecek/içecek listesi bileşeni
import React from "react";
import { useDispatch } from "react-redux";
import VenueDataService from "../services/VenueDataService";
import { useNavigate } from "react-router-dom";

// Tek bir mekan kartı bileşeni - Mekan bilgilerini gösterir
const VenueAdmin = ({ venue }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onClickDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await VenueDataService.deleteVenue(venue.id, token);
            dispatch({ type: "REMOVE_VENUE_SUCCESS", payload: venue.id });
            setTimeout(() => {
                navigate(0);
            }, 1000);
        } catch (error) {
            dispatch({ type: "REMOVE_VENUE_FAILURE" });
        }


    }
    const onClickGuncelle = () => navigate(`/admin/venues/${venue.id}`);
    return (
        <div className="list-group">
            <div className="col-xs-12 col-sm-12">
                <div className="col-xs-12 list-group-item">
                    {/* Mekan adı ve puanlama */}
                    <h4>
                        {/* Tıklanabilir mekan adı - Detay sayfasına yönlendirir */}
                        <NavLink to={`/venue/${venue.id}`}>{venue.name} </NavLink>
                        {/* Yıldız puanlama göster */}
                        <Rating rating={venue.rating} />
                    </h4>
                    <span className="btn pull-right"><button className="btn btn-primary pull-right" name="Sil" onClick={onClickDelete}>Sil</button></span>
                    <span className="btn pull-right"><button className="btn btn-info pull-right" name="Güncelle" onClick={onClickGuncelle}>Güncelle</button></span>

                    {/* Mekan adresi */}
                    <p className="address"> {venue.address}</p>

                    {/* Yiyecek ve içecek listesi */}
                    <FoodAndDrinkList foodAndDrinkList={venue.foodanddrink} />
                </div>
            </div>
        </div>
    );
};

// Bileşeni dışa aktar
export default VenueAdmin;
