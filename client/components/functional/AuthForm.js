import React, { useState } from "react";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";

export default props => {
  const [input, updateInput] = useState(props.initialState);

  return (
    <div className="app__auth__form">
      <p />
      {props.inputFields.map(field => {
        return (
          <InputGroup>
            <InputGroupAddon type="prepend" className="abc">
              {field.name}
            </InputGroupAddon>
            <Input
              type={field.type}
              onInput={e => {
                updateInput({
                  ...input,
                  [field.name.toLowerCase()]: e.target.value
                });
              }}
            />
          </InputGroup>
        );
      })}
      <Button color="primary" onClick={props.buttonCb.bind(null, input)}>
        {props.inputType}
      </Button>
    </div>
  );
};
