import { useMutation } from "@tanstack/react-query"
import { signup as signupApi } from "../../services/apiAuth"
import toast from "react-hot-toast";


export default function useSignup(){
   const {mutate: signup , isPending} = useMutation({
      mutationFn: signupApi,
      onSuccess: (user)=>{
          console.log(user);
          toast.success('New User Account is Created successfully');
      }
    })


  return {signup, isPending}
}