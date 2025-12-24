import { useState } from 'react';
import Header from './Header';
import { useDispatch } from 'react-redux';
import VenueDataService from '../services/VenueDataService';
import { useParams, useLocation, useNavigate, Navigate } from 'react-router-dom';

function Login() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const onSubmit = async (evt) => {
        evt.preventDefault();
        dispatch({ type: "LOGIN_INIT" });
        try {
            const res = await VenueDataService.login({
                email: evt.target.elements.email.value,  //envoie les data au bakend via api
                password: evt.target.elements.password.value
            });
            localStorage.setItem("token", res.data.token); //sauvegarde le token retoruné par le backend
            localStorage.setItem("user", JSON.stringify(res.data.user));//sauvegarde les info user
            dispatch({type:"LOGIN_SUCCESS",payload:res.data.user});
            navigate("/admin/venues", { state: { from: location }, replace: true })
        } catch (e){
            setError("Invalid email or password");
            dispatch({ type: "LOGIN_FAILURE" });
            console.error("Login failed:", e);
        }
    };
    return (
    <>
      <Header headerText="Login" motto="Giriş yap" />

      <div className="row">
        <div className="col-xs-12 col-md-6">
          <form className="form-horizontal" onSubmit={onSubmit}>
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
              Giriş Yap
            </button>
            <a className="pull-right-href" href="/register" >Kayıt Ol</a>
            <span></span>
          </form>
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default Login;