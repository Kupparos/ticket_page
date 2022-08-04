import React, { useEffect, useState } from "react";
import turkishAirlines from "../assets/turkishAirlines.png";
import s7 from "../assets/s7airlines.png";
import britishAirlines from "../assets/britishAirlines.png";
import singapureAirlines from "../assets/singapureAirlines.png";
import styles from "../styles/flightCard.module.css";
import { IoIosAirplane } from "react-icons/io";
import { exchangeRates } from "../utils/exchangeRates";
import moment from 'moment';
import 'moment/locale/ru'
import { Flight } from "../App";


export const FlightCard: React.FC<{ flight: Flight; currency: string }> = ({
  flight,
  currency,
}) => {
  const [exchangeRate, setExchangeRate] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await exchangeRates(currency);
      setExchangeRate(response);
    };

    fetchData();
  }, [currency]);

  function getAirline(name: string): string {
    switch (name) {
      case "TK":
        return turkishAirlines;
      case "S7":
        return s7;
      case "BA":
        return britishAirlines;
      case "SU":
        return singapureAirlines;
      default:
        return "";
    }
  }

  function getStops(amount: number): string {
    if (amount === 0) return "Без пересадок";
    else if (amount === 1) return "1 пересадка";
    else return `${amount} пересадки`;
  }

  function getPrice(price: number): string {
    if (currency === "RUB") return `${price} ₽`;
    else if (currency === "USD") return `${Math.round(price * exchangeRate)} $`;
    else if (currency === "EUR") return `${Math.round(price * exchangeRate)} €`;
    else return "Не указано";
  }

  return (
    <div className={styles.card}>
      <div className={styles.card_info}>
        <img src={getAirline(flight.carrier)} alt="" />
        <button>
          Купить <br /> за {getPrice(flight.price)}
        </button>
      </div>
      <div className={styles.card_path}>
        <div className={styles.card_path_from}>
          <h1>{flight.departure_time}</h1>
          <h3>
            {flight.origin}, {flight.origin_name}
          </h3>
          <p>{moment(flight.departure_date).locale('ru').format('DD MMM YYYY, dd')}</p>
        </div>
        <div className={styles.card_path_stops}>
          <div>{getStops(flight.stops)}</div>
          <div className={styles.card_path_stops_way}>
            <hr />
            <IoIosAirplane />
          </div>
        </div>
        <div className={styles.card_path_to}>
          <h1>{flight.arrival_time}</h1>
          <h3>
            {flight.destination}, {flight.destination_name}
          </h3>
          <p>{moment(flight.arrival_date).locale('ru').format('DD MMM YYYY, dd')}</p>
        </div>
      </div>
    </div>
  );
};
