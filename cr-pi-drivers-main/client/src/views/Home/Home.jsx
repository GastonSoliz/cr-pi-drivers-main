import { useDispatch, useSelector } from "react-redux";
import { getDrivers } from "../../redux/actions";
import CardList from "../../components/CardList/CardList";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  let allDrivers = useSelector((state) => state.allDrivers);
  const driversName = useSelector((state) => state.driverName);

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch, driversName]);

  // function onSearch(id) {
  //   dispatch(searchById(id));
  // }

  return (
    <div>
      <h1>PRUEBA DE PAGINA HOME</h1>
      <CardList allDrivers={allDrivers} />
    </div>
  );
}
