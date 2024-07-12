import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputValues = {
  type: "text" | "number";
  name: string;
  label?: string;
  disabled?: boolean;
  className?: string;
};

const PHInput = ({ type, name, label, disabled }: TInputValues) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        rules={{
          required: "This field is required",
          ...(type === "number" && { valueAsNumber: true }),
        }}
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

export default PHInput;
