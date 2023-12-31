import Card from "../Card/Card";
import style from "./CardList.module.css";

export default function CardList({ allDrivers }) {
  return (
    <div className={style.cardList}>
      {allDrivers?.map((driver) => (
        <Card key={driver.id} driver={driver} />
      ))}
    </div>
  );
}
