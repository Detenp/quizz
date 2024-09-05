import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ListGames from "@/pages/ListGames";

const container = document.getElementById("app");

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ListGames />}></Route>
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
