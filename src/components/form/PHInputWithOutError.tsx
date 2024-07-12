import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputValues = {
  type: "text" | "number";
  name: string;
  label?: string;
  disabled?: boolean;
};

const PHInputWithOutError = ({ type, name, label, disabled }: TInputValues) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label} validateStatus={error ? "error" : ""}>
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              disabled={disabled}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInputWithOutError;
