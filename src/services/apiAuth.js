import supabase, { supabase2, supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  let { error, data } = await supabase2.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    if (error.message.includes("unique"))
      throw new Error("This Email is already exist");
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error("Failed Logout");
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
  currentAvatar,
}) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: updateUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (currentAvatar) deleteImageFromAvatarStorage(currentAvatar);
  if (updateUserError) throw new Error(updateUserError.message);

  return updatedUser;
}

async function deleteImageFromAvatarStorage(imgName) {
  const { error: imageError } = await supabase.storage
    .from("avatars")
    .remove([imgName]);

  if (imageError) console.error(imageError);
}
