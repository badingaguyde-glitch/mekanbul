import Header from "./Header";
import React from "react";
import VenueDataService from "../services/VenueDataService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddVenue(){
    const navigate=useNavigate();
    const location = useSelector((state) => state.location);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
        React.useEffect(() => {
            if (!user || user.role !== "admin") {
                return navigate("/login", { state: { from: location }, replace: true });
            }
        }, [user]);
    const onSubmit=(evt)=>{
        evt.preventDefault();
        if(evt.target.elements.name.value &&
        evt.target.elements.address.value &&
        evt.target.elements.foodanddrink.value &&
        evt.target.elements.coordinates.value &&
        evt.target.elements.gunler1.value&&
        evt.target.elements.gunler2.value&&
        evt.target.elements.acilisKapanis1.value &&
        evt.target.elements.acilisKapanis2.value
        ){
            let latlong=evt.target.elements.coordinates.value.split(",");
            let AcKapat=evt.target.elements.acilisKapanis1.value.split("-");
            let AcKapat2=evt.target.elements.acilisKapanis2.value.split("-");
            let newVenue={
                name:evt.target.elements.name.value,
                address:evt.target.elements.address.value,
                foodanddrink:evt.target.elements.foodanddrink.value,
                lat:latlong[0].trim(),
                long:latlong[1].trim(),
                days1:evt.target.elements.gunler1.value,
                days2:evt.target.elements.gunler2.value,
                open1:AcKapat[0].trim(),
                close1:AcKapat[1].trim(),
                open2:AcKapat2[0].trim(),
                close2:AcKapat2[1].trim()
            };
            const token=localStorage.getItem("token");
            try{
              VenueDataService.addVenue(newVenue,token).then(()=>{
                dispatch({type:"ADD_UPDATE_VENUE_SUCCESS"});
                navigate("/admin/venues");
            });
            }catch{
              dispatch({type:"ADD_UPDATE_VENUE_FAILURE"});
              console.log("Hata oluştu");
            }
        }
    }

    return (
        <>
      {/* Sayfa başlığı - Önceki sayfadan gelen mekan adını göster */}
      <Header headerText="Yönetici" motto="Yeni mekan ekleyin!" />
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
                />
              </div>
            </div>
            
            {/* Form gönderme butonu */}
            <button className="btn btn-default pull-right">Venue Ekle</button>
          </form>
        </div>
          
      </div>
    </>
    )

}

export default AddVenue;

