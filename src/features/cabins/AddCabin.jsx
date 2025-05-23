import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

export default function AddCabin(){
  return (
    //here the modal is placed in div so the button is not occupy the whole space 
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

      </Modal>
    </div>
  )
}

//----------------------------------------------------------------------------------------------------------------------------------------
      {/* this is to show that you can use one or more additionla window also */} //it written written inside the modal component to show another window in it 

      {/* 
          <Modal.Open opens='table'>
            <Button>Show Table</Button>
          </Modal.Open>
          <Modal.Window name='table'>
            <CreateCabinForm />
          </Modal.Window> 
      */}
//----------------------------------------------------------------------------------------------------------------------------------------------

// export default function AddCabin() {
//   const [isOpenModel, setIsopenModel] = useState(false);

//   return (
//     <div>
//       <Button
//         $size="medium"
//         $variation="secondary"
//         onClick={() => setIsopenModel((show) => !show)}
//       >
//         Add New Cabin
//       </Button>
//       {isOpenModel && (
//         <Modal onClose={() => setIsopenModel(false)}>
//           {" "}
//           <CreateCabinForm onCloseModal={() => setIsopenModel(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
