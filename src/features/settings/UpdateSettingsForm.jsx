import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    isPending,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    },
  } = useSettings();
  const { isUpdating, updateSettings } = useUpdateSettings();

  if (isPending) return <Spinner />;

  function handleSetting(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSettings({ [field]: value });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          disabled={isUpdating}
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleSetting(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          disabled={isUpdating}
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleSetting(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          disabled={isUpdating}
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleSetting(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          disabled={isUpdating}
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleSetting(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
