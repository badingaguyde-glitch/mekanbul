import React, { useEffect, useState } from "react";
import VenueDataService from "../services/VenueDataService.jsx";
import InputWithLabel from "./InputWithLabel";
import Header from "./Header.jsx";
import { useSelector, useDispatch } from "react-redux";
import VenueList from "./VenueList.jsx";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminDashBoard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));
    const [count, setCount] = useState(10);
    const token = localStorage.getItem("token");
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    const onClick=()=>navigate("/admin/venues/new");

    useEffect(() => {
        if (count === 0) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
        const timer = setTimeout(() => {
            setCount((prev) => prev - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [count]);

    useEffect(() => {
        const reset = () => setCount(10);
        const events = ['click', 'mousemove', 'keydown', 'scroll'];
        events.forEach(e =>
            window.addEventListener(e, reset)
        );
        return () => {
            events.forEach(e =>
                window.removeEventListener(e, reset)
            );
        };
    }, []);
    console.log(isLoggedIn);
    React.useEffect(() => {
        if (!user || user.role !== "admin") {
            return navigate("/login", { state: { from: location }, replace: true });
        }
    }, [user]);
    const dispatch = useDispatch();
    const {
        data: venues,
        isError,
        isLoading,
        isSuccess
    } = useSelector((state) => state);
    const [searchVenue, setSearchVenue] = useState("");
    const search = (event) => {
        setSearchVenue(event.target.value);
    };
    React.useEffect(() => {
        dispatch({ type: "FETCH_INIT" });
        VenueDataService.getAllVenues(token)
            .then((response) => {
                dispatch({ type: "FETCH_SUCCESS", payload: response.data });
            }).catch(() => {
                dispatch({ type: "FETCH_FAILURE" });
            })
    }, []);
    const filteredVenues = Array.isArray(venues) ? venues.filter((venue) => {
        return venue.name.toLowerCase().includes(searchVenue.toLowerCase()) ||
            venue.address.toLowerCase().includes(searchVenue.toLowerCase());
    }) : [];
    return (
        <div>
            <Header
                headerText="Yönetici Paneli"
                motto={`Mekanları Yönetin (${count}s)`}
            />
            <InputWithLabel
                id="arama"
                label="Mekan Ara:"
                type="text"
                isFocused
                onInputChange={search}
                value={searchVenue}>
            </InputWithLabel>
            <hr />

            {/* Mekan listesi */}
            <div className="row">
                {isError ? (
                    <p>
                        <strong>Birseyler ters gitti!...</strong>
                    </p>
                ) : isLoading ? (
                    <p>
                        <strong>Mekanlar yukleniyor...</strong>
                    </p>
                ) : (
                    isSuccess && (
                        <div className="row">
                            {/* Filtrelenmiş mekanları listele */}
                            <VenueList venues={filteredVenues} />
                        </div>
                    )
                )}

            </div>
            <div className="row">
                <div className="column pull-right">
                    <span className="btn pull-right">
                        <button className="btn btn-success pull-right" name="Mekan Ekle" onClick={onClick}>Mekan Ekle
                        </button>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default AdminDashBoard;