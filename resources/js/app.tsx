import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ListGamesPage from "@/pages/ListGamesPage";
import GamePage from "@/pages/GamePage";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import "../css/app.css"

const container = document.getElementById("app");

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ListGamesPage />}></Route>
                <Route path={"/game/:id"} element={<GamePage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

if (container) {
    const root = ReactDOM.createRoot(container);

    root.render(
        <>
            <App />
        </>
    );
}
