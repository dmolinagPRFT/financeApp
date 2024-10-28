import { useState } from "react";
import { usePokemonsListContext, useToastContext } from "../utils";
import { useSpinnerContext } from "../utils/loadingContext";
import { fetchPokemonByType } from "../api/pokemon";

export function useListPokemonByType() {
  const { definePokemonList } = usePokemonsListContext();
  const { showToast } = useToastContext();
  const { showSpinner } = useSpinnerContext();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const queryPokemonsByType = async (type: string, page: number) => {
    setIsLoading(true);
    showSpinner(true);

    const response = await fetchPokemonByType(type, page);

    if (!response.error) {
      definePokemonList(response.pokemonList, type, true);
      setIsLoading(false);
    } else {
      definePokemonList([], type);
      setIsLoading(false);

      showToast({
        isDisplay: true,
        message: "Error retrieving Pokemon's list by type",
        type: "error",
      });
    }
    showSpinner(false);
  };

  return { isLoading, queryPokemonsByType };
}