import { useNavigate } from "react-router"



export const useBackTo = () => {
  const nav = useNavigate();
  return nav(-1);
}