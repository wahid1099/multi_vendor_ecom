import { useEffect, useState } from "react";
import { userApi } from "../../../redux/features/user/userApi";
import { TUser } from "../../../type/global.type";
import Swal from "sweetalert2";
import { useCurrentToken } from "../../../redux/features/Auth/AuthSlice";
import { useAppSelector } from "../../../redux/hook";

const ProfilePage = () => {
  const token = useAppSelector(useCurrentToken);

  const { data: getMe } = userApi.useGetMeQuery(undefined, { skip: !token });
  const user = getMe?.data;

  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<TUser | null>(null);
  const [updateUser] = userApi.useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setUserProfile(user);
    }
  }, [user]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserProfile({
      ...userProfile!,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async () => {
    if (userProfile) {
      const updatedProfile = {
        id: userProfile._id,
        name: userProfile.name,
        phone: userProfile.phone,
        addressBook: userProfile.addressBook,
        profileImage: userProfile.profileImage,
        zipCode: userProfile.zipCode,
        city: userProfile.city,
        state: userProfile.state,
        country: userProfile.country,
      };
      try {
        await updateUser(updatedProfile).unwrap();
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsEditing(false);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong while updating your profile",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        My Profile
      </h1>
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={userProfile.profileImage || "/default-profile.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-300"
          />
          <div>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userProfile.name || ""}
                onChange={handleInputChange}
                className="text-xl font-medium border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                placeholder="Your Name"
              />
            ) : (
              <h2 className="text-2xl font-semibold text-gray-700">
                {userProfile.name || "Name not set"}
              </h2>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              label: "Username",
              name: "username",
              value: userProfile.username,
              editable: false,
            },
            {
              label: "Email",
              name: "email",
              value: userProfile.email,
              editable: false,
            },
            {
              label: "Phone",
              name: "phone",
              value: userProfile.phone,
              editable: true,
            },
            {
              label: "Address",
              name: "addressBook",
              value: userProfile.addressBook,
              editable: true,
            },
            {
              label: "Zip Code",
              name: "zipCode",
              value: userProfile.zipCode,
              editable: true,
            },
            {
              label: "City",
              name: "city",
              value: userProfile.city,
              editable: true,
            },
            {
              label: "State",
              name: "state",
              value: userProfile.state,
              editable: true,
            },
            {
              label: "Country",
              name: "country",
              value: userProfile.country,
              editable: true,
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-600 font-semibold mb-2">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={field.value || "N/A"}
                onChange={field.editable ? handleInputChange : undefined}
                disabled={!field.editable || !isEditing}
                className={`w-full p-3 border rounded-md ${
                  field.editable && isEditing
                    ? "bg-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleEditToggle}
            className="px-5 py-2 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
          {isEditing && (
            <button
              onClick={handleUpdateProfile}
              className="px-5 py-2 text-lg font-semibold rounded-lg bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 text-white"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
