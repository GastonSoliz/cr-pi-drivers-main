import Card from "../Card/Card";
import style from "./CardList.module.css";
import React from "react";

type Driver = {
  birthdate: string;
  description: string;
  id: number;
  image: string;
  name: string;
  nationality: string;
  surname: string;
  teams: string;
};

interface DriverList {
  allDrivers: Driver[];
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
