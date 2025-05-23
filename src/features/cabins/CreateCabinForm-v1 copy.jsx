import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  //These are the functions that we use in react form
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  //here formState is used to get the error from every state or you can say register field that we use in form
  const { errors } = formState;

  //   Why do we need invalidateQueries?
  // After creating a new cabin (via createCabin), the local data in React Query’s cache is outdated. This means that:

  // The newly added cabin won’t automatically appear in the UI.
  // Users might see old, stale data until they refresh the page manually.
  // 👉 Solution: Calling invalidateQueries(['cabins']) tells React Query:

  // "Mark the ['cabins'] query as stale."
  // "Automatically refetch the latest list of cabins from the server."

  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate } = useMutation({
    mutationKey: ["createCabin"],
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New Cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    // console.log(data);
    mutate({ ...data, image: data.image[0] });
    //we did not reset in this function because we didn't
    // know  that mutate function is success or not with data so we decide to do it after
    // onSuccess function in mutattion function
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "This field is required",
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
