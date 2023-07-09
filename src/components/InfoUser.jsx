// eslint-disable-next-line no-unused-vars
import React from "react";
import { useParams } from "react-router-dom";
import useStore from "../store";

const InfoUser = () => {
  const { userId } = useParams();
  const { users } = useStore();
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <div>
      <h2>Información del usuario</h2>
      <form>
        <div>
          <label>Nombre:</label>
          <input type="text" value={user.name} readOnly />
        </div>
        <div>
          <label>Loked:</label>
          <input type="email" value={user.locked} readOnly />
        </div>
        <div>
          <label>ID:</label>
          <input type="tel" value={user.id} readOnly />
        </div>
        {/* Otros campos del usuario */}
      </form>
    </div>
  );
};

export default InfoUser;
