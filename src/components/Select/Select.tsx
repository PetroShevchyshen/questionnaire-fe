import { Form, Select } from "antd";
import { FC } from "react";
import { ISelector } from "../../contracts/ISelector";

interface SelectorProp {
  data: ISelector[];
  placeholder: string;
  label: string;
  onChange: (value: string) => void;
}

export const Selector: FC<SelectorProp> = ({
  data,
  placeholder,
  label,
  onChange,
}) => {
  return (
    <Form.Item label={label}>
      <Select
        onChange={(value) => {
          onChange(value);
        }}
        placeholder={placeholder}
        allowClear
        className="min-w-40"
      >
        {data.map((field) => (
          <Select.Option
            key={field.label}
            value={field.value}
            label={field.label}
          >
            {field.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
