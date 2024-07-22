import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import { formatCurrency, getImageNameFromUrl } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useDetectItem from "../../hooks/useDetectItem";

const Img = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin = {}, count }) {
  const {
    id: cabinId,
    name,
    regularPrice,
    maxCapacity,
    image,
    discount,
    description,
  } = cabin;

  const imageName = getImageNameFromUrl(image);

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const { handleDetect } = useDetectItem(count, "cabins");

  const handleDuplicateCabin = () =>
    createCabin({
      name: `Copy of ${name}`,
      image,
      regularPrice,
      maxCapacity,
      discount,
      description,
    });

  const handleDeleteCabin = () =>
    deleteCabin({ cabinId, imageName }, { onSuccess: handleDetect });

  return (
    <Table.Row>
      <Img src={image} alt={name} />

      <div>
        <h3>Cabin</h3>
        <Cabin>{name}</Cabin>
      </div>
      <div>
        <h3>Capacity</h3>
        <div>Fits up to {maxCapacity} guests</div>
      </div>
      <div>
        <h3>Price</h3>
        <Price>{formatCurrency(regularPrice)}</Price>
      </div>
      <div>
        <h3>Discount</h3>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
      </div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicateCabin}
              >
                Duplicate
              </Menus.Button>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />} disabled={isCreating}>
                  Edit
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={handleDeleteCabin}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
