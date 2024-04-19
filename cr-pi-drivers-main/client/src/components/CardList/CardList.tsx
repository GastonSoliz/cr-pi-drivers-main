import Card from "../Card/Card";
//import style from "./CardList.module.css";
import React from "react";
import { DriverError } from "../../types/types";

interface DriverList {
  allDrivers: DriverError[];
}

export default function CardList({ allDrivers }: DriverList) {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
      {allDrivers?.map((driver) => (
        <div key={driver.id} className="cols">
          <Card driver={driver} />
        </div>
      ))}
    </div>
  );
}
