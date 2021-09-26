import {Select} from "antd";
import {SelectValue} from "antd/lib/select";
import React from "react";
import {SelectData} from "../../../models/Common";

/* const {Option} = Select; */

type InputSelectProps = {
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  name?: string;
  placeholder?: string;
  options: SelectData[];
  value: string;
};

export const InputSelect = ({
  name = "",
  options,
  onChange,
  placeholder,
  value,
}: InputSelectProps) => {
  const handleSelectChange = (value: SelectValue) => {
    if (onChange && name) {
      const newEvent = {
        target: {
          name,
          value,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

      onChange(newEvent);
    }
  };

  return (
    <Select
      value={value}
      showSearch={true}
      optionFilterProp="label"
      onChange={handleSelectChange}
      placeholder={placeholder}
      options={options}
    />
  );
};
