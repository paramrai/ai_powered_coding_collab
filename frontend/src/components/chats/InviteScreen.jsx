import { useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  selectToken,
  selectUser,
  updateUserObject,
} from "../../redux/slices/userSlice";
// todo import { selectCurrentGem } from "../../redux/slices/gemSlice";
import { toast } from "react-toastify";
import { selectCurrentGem } from "../../redux/slices/gemSlice";

function InviteScreen({ activeTab }) {
  const token = useSelector(selectToken);
  const currentUser = useSelector(selectUser);
  const currentGem = useSelector(selectCurrentGem);
  const [potentialInvites, setPotentialInvites] = useState([]);
  const dispatch = useDispatch();
  const sentInvites = currentUser.sentInvites;

  useEffect(() => {
    // fetch all users
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/users/getAllUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data.allUser);
        const filteredUsers = allUsers.filter(
          (user) => !currentGem.collaborator.includes(user.id)
        );

        setPotentialInvites(filteredUsers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const isUserInvited = (userId) => {
    return sentInvites.some(
      (invite) =>
        invite.gemId === currentGem._id && invite.recieverIds.includes(userId)
    );
  };

  const handleInviteUser = async (user) => {
    try {
      // invite user
      const res = await axiosInstance.put(
        "/users/inviteUser",
        {
          inviteSenderId: currentUser._id,
          inviteReceiverId: user._id,
          gemId: currentGem._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      if (res.status === 200 || res.statusText === "OK") {
        dispatch(updateUserObject(res.data.user));
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    activeTab === "add" && (
      <div className="p-4">
        <h2 className="text-lg font-bold text-white mb-4">Invite Users</h2>
        {potentialInvites.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between text-white mb-2 p-2 bg-gray-700 rounded"
          >
            <div>
              <div>{user.username}</div>
              <div className="text-sm text-gray-400">{user.email}</div>
            </div>
            <button
              onClick={() => handleInviteUser(user)}
              className={`px-3 py-1 rounded-lg ${
                isUserInvited(user._id) ? "bg-gray-500" : "bg-blue-500"
              }`}
            >
              {isUserInvited(user._id) ? "Invited" : "Invite"}
            </button>
          </div>
        ))}
      </div>
    )
  );
}

export default InviteScreen;
