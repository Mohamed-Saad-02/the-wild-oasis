import { PAGE_SIZE } from "../utils/constants";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins({ page }) {
  let query = supabase.from("cabins").select("*", { count: "exact" });

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return { data, count };
}

export async function createEditCabin(newCabin, id, currentImage) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/ Edit Cabin
  let query = supabase.from("cabins");

  //A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B) EDIT
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be Created");
  }

  // 2. Upload Image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploading and the cabin was not created"
    );
  }

  // Delete The Old Image From Cabin Storage If Only Cabin Edit
  if (id && currentImage && (!error || !error.message))
    deleteImageFromCabinStorage(currentImage);

  return data;
}

export async function deleteCabin(id, imgName) {
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;

  // #1. Delete the cabin item from DB cabins table
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  // >#2. Check if image is being shared with more than 1 entry
  const { data: imageHoldersList, error: imageListerError } = await supabase
    .from("cabins")
    .select("image")
    .eq("image", imagePath);

  if (imageListerError) {
    console.error(imageListerError);
    throw new Error("Failed to know number of the same image in cabin");
  }

  // #3. Delete Image from DB bucket
  if (imageHoldersList.length === 0) await deleteImageFromCabinStorage(imgName);
}

async function deleteImageFromCabinStorage(imgName) {
  const { error: imageError } = await supabase.storage
    .from("cabin-images")
    .remove([imgName]);

  if (imageError) {
    console.error(imageError);
    throw new Error("Cabin deleted, but unable to delete image from DB bucket");
  }
}
