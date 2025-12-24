import React, { useState } from "react";
import Header from "./Header.jsx";
import { useDispatch } from "react-redux";
import VenueDataService from "../services/VenueDataService.jsx";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function Register() {
  const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const onSubmit = async (evt) => {
        evt.preventDefault();
        try {
            await VenueDataService.register({
                name: evt.target.elements.name.value,
                email: evt.target.elements.email.value,
                password: evt.target.elements.password.value
            });
            dispatch({ type: "REGISTER_SUCCESS" });
            navigate("/login", { state: { from: location }, replace: true });
        } catch {
            setError("Registration failed. Please try again.");
        }
    }
    return(
        <>
      <Header headerText="Sign Up" motto="Kayıdını ekle" />

      <div className="row">
        <div className="col-xs-12 col-md-6">
          <form className="form-horizontal" onSubmit={onSubmit}>
            <div className="form-group">
              <label className="col-sm-2 control-label">Name:</label>
              <div className="col-sm-10">
                <input name="name" className="form-control" />
              </div>
            </div>

            <div className="form-group">
              <label className="col-sm-2 control-label">Email:</label>
              <div className="col-sm-10">
                <input name="email" className="form-control" />
              </div>
            </div>

            <div className="form-group">
              <label className="col-sm-2 control-label">Şifre:</label>
              <div className="col-sm-10">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                />
              </div>
            </div>

            <button className="btn btn-default pull-right">
              Kayıt ol
            </button>
            <a className="pull-right-href" href="/login" >Giriş Yap</a>
            <span></span>
          </form>
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
    )
}
export default Register;