import toast from "react-hot-toast";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSetting from "./useUpdateSetting";
import { useForm } from "react-hook-form";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const {
    register,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const { isUpdating, updateSetting } = useUpdateSetting();

  const handleUpdateSettings = (e) => {
    const {
      value,
      defaultValue,
      dataset: { field },
    } = e.target;

    if (!value || value === defaultValue) return;
    if (+value === 0) {
      e.target.value = defaultValue;
      return toast.error("It should At Least One");
    }

    updateSetting({ [field]: value });
  };

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow
        label="Minimum nights/booking"
        error={errors?.minBookingLength?.message}
      >
        <Input
          type="number"
          id="min-nights"
          data-field="minBookingLength"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          {...register("minBookingLength", {
            onBlur: handleUpdateSettings,
            required: "This Field Is Required",
          })}
        />
      </FormRow>
      <FormRow
        label="Maximum nights/booking"
        error={errors?.maxBookingLength?.message}
      >
        <Input
          type="number"
          id="max-nights"
          data-field="maxBookingLength"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          {...register("maxBookingLength", {
            onBlur: handleUpdateSettings,
            required: "This Field Is Required",
          })}
        />
      </FormRow>
      <FormRow
        label="Maximum guests/booking"
        error={errors?.maxGuestsPerBooking?.message}
      >
        <Input
          type="number"
          id="max-guests"
          data-field="maxGuestsPerBooking"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          {...register("maxGuestsPerBooking", {
            onBlur: handleUpdateSettings,
            required: "This Field Is Required",
          })}
        />
      </FormRow>
      <FormRow label="Breakfast price" error={errors?.breakfastPrice?.message}>
        <Input
          type="number"
          id="breakfast-price"
          data-field="breakfastPrice"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          {...register("breakfastPrice", {
            onBlur: handleUpdateSettings,
            required: "This Field Is Required",
          })}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
