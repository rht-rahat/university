import { Form, TimePicker } from "antd";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label?: string;
};

const PHTimePicker = ({ name, label }: TDatePickerProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            {/* <Input {...field} type={type} id={name} size="large" /> */}
            <TimePicker
              {...field}
              size="large"
              style={{ width: "100%" }}
              format={"HH:mm"}
              value={field.value ? dayjs(field.value, "HH:mm") : null}
              onChange={(time) =>
                field.onChange(time ? time.format("HH:mm") : null)
              }
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHTimePicker;
