// import { TextField } from "material-ui";
import TextField from "@material-ui/core/TextField";
import { createFighter } from "../../services/domainRequest/fightersRequest";
import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "./newFighter.css";

export default function NewFighter({ onCreated }) {
  const [name, setName] = useState();
  const [power, setPower] = useState();
  const [defense, setDefense] = useState();
  const [health, setHealth] = useState(100);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onPowerChange = (event) => {
    const value =
      event.target.value || event.target.value === 0
        ? Number(event.target.value)
        : null;
    setPower(value);
  };

  const onDefenseChange = (event) => {
    const value =
      event.target.value || event.target.value === 0
        ? Number(event.target.value)
        : null;
    setDefense(value);
  };

  const onHealthChange = (event) => {
    const value =
      event.target.value || event.target.value === 0
        ? Number(event.target.value)
        : null;
    setHealth(value);
  };

  const onSubmit = async () => {
    // const data = await createFighter({ name, power, defense });
    const fighterData = {
      name,
      power,
      defense,
      health: health === null ? 100 : health,
    };
    const data = await createFighter(fighterData);

    if (data && !data.error) {
      onCreated(data);
    }
  };

  // const onSubmit = async () => {
  //     const data = await createFighter({ name, power, defense });
  //     if(data && !data.error) {
  //         onCreated(data);
  //     }
  // }

  return (
    <div id="new-fighter">
      <div>New Fighter</div>
      {/* <TextField
        onChange={onNameChange}
        id="standard-basic"
        label="Name"
        placeholder="Name"
      />
      <TextField
        onChange={onPowerChange}
        id="standard-basic"
        label="Power"
        placeholder="Power"
        type="number"
      /> */}
      {/* <TextField
        onChange={onDefenseChange}
        id="standard-basic"
        label="Standard"
        placeholder="Defense"
        type="number"
      /> */}
      <TextField
        onChange={onNameChange}
        value={name || ""}
        id="name"
        label="Name"
        placeholder="Name"
      />
      <TextField
        onChange={onPowerChange}
        value={power === null || power === undefined ? "" : power}
        id="power"
        label="Power"
        placeholder="Power"
        type="number"
      />
      <TextField
        onChange={onDefenseChange}
        value={defense === null || defense === undefined ? "" : defense}
        id="defense"
        label="Defense"
        placeholder="Defense"
        type="number"
      />
      <TextField
        onChange={onHealthChange}
        value={health === null || health === undefined ? "" : health}
        id="health"
        label="Health"
        placeholder="Health (default 100)"
        type="number"
      />
      <Button onClick={onSubmit} variant="contained" color="primary">
        Create
      </Button>
    </div>
  );
}
