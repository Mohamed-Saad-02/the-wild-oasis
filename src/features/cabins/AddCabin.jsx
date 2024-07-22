import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   const handleIsOpenModal = () => setIsOpenModal((open) => !open);

//   return (
//     <div>
//       <Button onClick={handleIsOpenModal}>Add new cabin</Button>
//       {isOpenModal && (
//         <Modal onClose={handleIsOpenModal}>
//           <CreateCabinForm onCloseModal={handleIsOpenModal} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
