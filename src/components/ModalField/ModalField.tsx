import React from "react";
import {FormGroup, Input, Label} from "reactstrap";
import {InputType} from "reactstrap/es/Input";

interface ModalField {
  type: InputType,
  name: string,
  placeholder?: string
  id?: string
  text: string
  value: any
  [x:string]: any;
}

export const ModalField: React.FC<ModalField> =
    ({ type = 'text',
       name,
       placeholder,
       id,
       text,
       ...props
    }) => (
        <FormGroup>
          <Label for={id}>{ text }</Label>
          <Input type={type}
                 name={name}
                 placeholder={placeholder}
                 id={id}
                 {...props}
          />
        </FormGroup>
    )
