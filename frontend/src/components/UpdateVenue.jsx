import Header from "./Header";
import React, { useEffect } from "react";
import VenueDataService from "../services/VenueDataService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function UpdateVenue() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const location = useSelector((state) => state.location);
    const navigate = useNavigate();
    const venue = useSelector((state) => state.data);
    const user = JSON.parse(localStorage.getItem("user"));
        React.useEffect(() => {
            if (!user || user.role !== "admin") {
                return navigate("/login", { state: { from: location }, replace: true });
            }
        }, [user]);

    const [formData, setFormData] = React.useState({
        name: "",
        address: "",
        foodanddrink: "",
        coordinates: "",
        gunler1: "",
        gunler2: "",
        acilisKapanis1: "",
        acilisKapanis2: "",
    });

    useEffect(() => {
        dispatch({ type: "FETCH_INIT" });
        VenueDataService.getVenue(id)
            .then((res) => {
                dispatch({ type: "FETCH_SUCCESS", payload: res.data });
            })
            .catch(() => dispatch({ type: "FETCH_FAILURE" }));
    }, [id]);

    useEffect(() => {
        if (venue && venue.hours && venue.hours.length >= 2) {
            setFormData({
                name: venue.name || "",
                address: venue.address || "",
                rating: venue.rating || 0,
                foodanddrink: venue.foodanddrink?.join(", ") || "",
                coordinates: venue.coordinates?.join(",") || "",
                gunler1: venue.hours[0].days || "",
                acilisKapanis1: `${venue.hours[0].open}-${venue.hours[0].close}`,
                gunler2: venue.hours[1].days || "",
                acilisKapanis2: `${venue.hours[1].open}-${venue.hours[1].close}`,
            });
        }
    }, [venue]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Eğer mekan bulunamazsa hata mesajı göster
    if (!venue) {
        return <div>Mekan bulunamadı!</div>;
    }
    const onSubmit = async (evt) => {
  evt.preventDefault();

  try {
    let latlong = evt.target.elements.coordinates.value.split(",");
    let AcKapat = evt.target.elements.acilisKapanis1.value.split("-");
    let AcKapat2 = evt.target.elements.acilisKapanis2.value.split("-");

    let newVenue = {
      name: evt.target.elements.name.value,
      address: evt.target.elements.address.value,
      foodanddrink: evt.target.elements.foodanddrink.value.split(","), // important
      lat: latlong[0].trim(),
      long: latlong[1].trim(),
      days1: evt.target.elements.gunler1.value,
      days2: evt.target.elements.gunler2.value,
      open1: AcKapat[0].trim(),
      close1: AcKapat[1].trim(),
      open2: AcKapat2[0].trim(),
      close2: AcKapat2[1].trim()
    };

    const token = localStorage.getItem("token");

    await VenueDataService.updateVenue(id, newVenue, token);

    dispatch({ type: "ADD_UPDATE_VENUE_SUCCESS" });
    navigate("/admin/venues");

  } catch (error) {
    console.error("API ERROR:", error);
    dispatch({ type: "ADD_UPDATE_VENUE_FAILURE" });
  }
};


    return (
        <>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    {/* Venue ekleme formu */}
                    <form
                        className="form-horizontal"
                        id="venueEkle"
                        onSubmit={(evt) => onSubmit(evt)}
                    >
                        {/* İsim alanı */}
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Ad:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Adres:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">İmkanlar:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                    className="form-control"
                                    id="foodanddrink"
                                    name="foodanddrink"
                                    value={formData.foodanddrink}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Enlem & Boylam:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                    className="form-control"
                                    id="coordinates"
                                    name="coordinates"
                                    value={formData.coordinates}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Günler-1:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                    className="form-control"
                                    id="gunler1"
                                    name="gunler1"
                                    value={formData.gunler1}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Açılış & Kapanış-1:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                    className="form-control"
                                    id="acilisKapanis1"
                                    name="acilisKapanis1"
                                    value={formData.acilisKapanis1}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Günler-2:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                    className="form-control"
                                    id="gunler2"
                                    name="gunler2"
                                    value={formData.gunler2}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Açılış & Kapanış-2:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                    className="form-control"
                                    id="acilisKapanis2"
                                    name="acilisKapanis2"
                                    value={formData.acilisKapanis2}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Form gönderme butonu */}
                        <button className="btn btn-default pull-right" type="submit">Venue Güncelle</button>
                    </form>
                </div>

            </div>
        </>
    )

}

export default UpdateVenue;

