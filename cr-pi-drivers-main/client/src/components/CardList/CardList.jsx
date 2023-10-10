import Card from "../Card/Card";

export default function CardList({ allDrivers }) {
  return (
    <div>
      <h1>SOY LA CARD LIST</h1>
      {allDrivers?.map((driver) => (
        <Card key={driver.id} driver={driver} />
      ))}
    </div>
  );
}
