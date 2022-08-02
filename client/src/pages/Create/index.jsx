import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateForm from "../../components/CreateForm";
import { getDietsFromDb } from "../../redux/actions";

export default function Create() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDietsFromDb());
  }, [dispatch]);

  const diets = useSelector((state) => state.dbDiets);

  return (
    <main>
      <CreateForm diets={diets} />
    </main>
  );
}
