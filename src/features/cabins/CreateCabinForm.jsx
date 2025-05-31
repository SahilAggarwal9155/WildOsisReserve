import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import useCreateCabins from "./useCreateCabins";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  //These are the functions that we use in react form
  const { id: editId, ...editValues } = cabinToEdit;
  const checkEdit = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: checkEdit ? editValues : {},
  });

  //here formState is used to get the error from every state or you can say register field that we use in form
  const { errors } = formState;

  //   Why do we need invalidateQueries?
  // After creating a new cabin (via createCabin), the local data in React Query’s cache is outdated. This means that:

  // The newly added cabin won’t automatically appear in the UI.
  // Users might see old, stale data until they refresh the page manually.
  // 👉 Solution: Calling invalidateQueries(['cabins']) tells React Query:

  // "Mark the ['cabins'] query as stale."
  // "Automatically refetch the latest list of cabins from the server."
  const { isCreating, createCabin } = useCreateCabins();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = data.image
      ? typeof data.image === "string"
        ? data.image
        : data.image[0]
      : "";
    // console.log(data);
    if (checkEdit)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset(),
              //Same thing happen here if its edit the cabin so it automatically remove the modal from window
            onCloseModal?.();
          },
        },
      );
    else
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset(),
              //If apply this so after sucess created the cabin it automatically off the modal window
              onCloseModal?.();
          },
        },
      );
    //we did not reset in this function because we didn't
    // know  that mutate function is success or not with data so we decide to do it after
    // onSuccess function in mutattion function
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      $type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Capacity should be atleast one",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "regular price should be atleast one",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required",
            valueAsNumber: true,
            //Here getValues() is a function which is present in useForm, it use to get the value of every input assign by id of input
            validate: (value) =>
              value < getValues().regularPrice ||
              "The discount should be less than regular Price",
          })}
        />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea
          type="description"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: checkEdit ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute!   
            ✅ Using optional chaining (?.()) prevents crashes if onCloseModal is not passed.
            ✅ Using a callback (() => onCloseModal?.()) ensures controlled execution.
            ✅ Without these safeguards, the app may break if onCloseModal is undefined.
        */}
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {checkEdit ? "Edit Cabin" : "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
