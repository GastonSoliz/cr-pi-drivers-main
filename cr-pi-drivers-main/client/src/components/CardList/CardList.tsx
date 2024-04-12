import Card from "../Card/Card";
import style from "./CardList.module.css";
import React from "react";
import { DriverError } from "../../types/types";

interface DriverList {
  allDrivers: DriverError[];
}

export default function CardList({ allDrivers }: DriverList) {
  return (
    <div className={style.cardList}>
      {allDrivers?.map((driver) => (
        <Card key={driver.id} driver={driver} />
      ))}
    </div>
  );
}
