import React, { useState } from "react";
import "./App.css";
import logo from "./assets/airplaneLogo.png";
import { FlightCard } from "./components/FlightCard";
import { SideBar } from "./components/SideBar";
import data from "./tickets.json";

export type Flight = {
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  carrier: string;
  stops: number;
  price: number;
};

function App() {
  const [currency, setCurrency] = useState<string>("RUB");
  const [transfer, setTransfer] = useState<string[]>(["all"]);

  function getFilteredFlight(tickets: Flight[]) {
    if (transfer[0] === "all") {
      return tickets;
    }
    const filteredFlight = tickets.reduce(
      (accum: Flight[], current: Flight) => {
        if (transfer.includes(current.stops.toString())) {
          accum.push(current);
        }
        return accum;
      },
      []
    );

    return filteredFlight;
  }

  const flights = getFilteredFlight(data.tickets);

  return (
    <div className="App">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="container">
        <SideBar
          currency={currency}
          setCurrency={setCurrency}
          transfer={transfer}
          setTransfer={setTransfer}
        />
        <div className="flights">
          {flights.map((item, index) => {
            return <FlightCard flight={item} key={index} currency={currency} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
