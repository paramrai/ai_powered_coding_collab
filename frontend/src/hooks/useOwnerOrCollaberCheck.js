import { useSelector } from "react-redux";
import { selectCurrentGem } from "../redux/slices/gemSlice";
import { selectUser } from "../redux/slices/userSlice";

const useOwnerOrCollaberCheck = () => {
  const gem = useSelector(selectCurrentGem);
  const user = useSelector(selectUser);

  const ownerOrCollaber =
    String(gem.owner) === String(user._id) ||
    gem.collaborator.some(
      (collaber) => String(collaber._id) === String(user._id)
    );

  return ownerOrCollaber;
};

export default useOwnerOrCollaberCheck;
