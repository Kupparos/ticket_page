import React from "react";
import { SegmentedControl, Checkbox } from "@mantine/core";
import styles from "../styles/sideBar.module.css";

export const SideBar: React.FC<{
  currency: string;
  transfer: string[];
  setCurrency: (currency: string) => void;
  setTransfer: (transfer: string[]) => void;
}> = ({ currency, setCurrency, transfer, setTransfer }) => {
  function setTransferChange(value: string[]) {
    if (value[0] === "all") {
      value.shift();
      setTransfer(value);
      return;
    }

    if (!value.length || value[value.length - 1] === "all") {
      setTransfer(["all"]);
      return;
    }

    setTransfer(value);
  }

  return (
    <div className={styles.sideBar}>
      <p>ВАЛЮТА</p>
      <SegmentedControl
        color="blue"
        data={[
          { label: "RUB", value: "RUB" },
          { label: "USD", value: "USD" },
          { label: "EUR", value: "EUR" },
        ]}
        onChange={(value: string) => setCurrency(value)}
      />
      <p>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
      <Checkbox.Group
        orientation="vertical"
        offset="xs"
        value={transfer}
        onChange={setTransferChange}
      >
        <Checkbox value="all" label="Все" />
        <Checkbox value="0" label="Без пересадок" />
        <Checkbox value="1" label="1 пересадка" />
        <Checkbox value="2" label="2 пересадки" />
        <Checkbox value="3" label="3 пересадки" />
      </Checkbox.Group>
    </div>
  );
};
