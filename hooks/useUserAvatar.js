import { useEffect } from "react";
import useUI from "@redux/actions/ui";
import { getRandomPairOfColors } from "@utlis/colors";

export const useUserAvatar = (name = "userAvatar") => {
  let { userAvatar, setUserAvatar } = useUI();

  useEffect(() => {
    if (!userAvatar && localStorage.getItem(user).Name || localStorage.getItem(user).Organisation) {
      // Get bg from localStorage and push it to the context.
      setUserAvatar(localStorage.getItem(user).Name || localStorage.getItem(user).Organisation);
    }
    if (!localStorage.getItem(user).Name && !localStorage.getItem(user).Organisation) {
      // bg not set locally, generating one, setting localStorage and context to persist.
      const bg = getRandomPairOfColors();
      const value = `linear-gradient(140deg, ${bg[0]}, ${bg[1]} 100%)`;
      localStorage.setItem(name, value);
      setUserAvatar(value);
    }
  }, []);

  return {
    userAvatar,
    setUserAvatar,
  };
};
