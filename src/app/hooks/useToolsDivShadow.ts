import useContextNullChecker from "../helpers/useContextNullChecker";

export default function useToolsDivShadow() {
  const { height } = useContextNullChecker();
  return {
    boxShadow: height >= 480 ? "0 -3px 2px rgba(0, 0, 0, 0.3)" : "",
  };
}
