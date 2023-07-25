import { useEffect, useState } from 'react';
import styles from './favoriteList.module.scss';
import {
	getFavoritePokemons,
	setFavoritePokemons,
} from '../../../utils/setGetLocalStorageInfo';
import { useGetPokemonById } from '../../../customHooks/useGetPokemonById';
import { PokemonObj } from '../../../types/Pokemon';
import { BiSolidHeart } from 'react-icons/bi';
import _ from 'lodash';

export const FavoriteList = () => {
	const pokemonIds = getFavoritePokemons();
	const { queryPokemonsById, pokemonsArray } =
		useGetPokemonById();
	const [favPokemons, setFavPokemons] = useState<PokemonObj[]>([]);

	const favPokemonsLength: number = pokemonsArray.length;

	useEffect(() => {
		queryPokemonsById(pokemonIds);
		setFavPokemons(pokemonsArray);
	}, [favPokemonsLength]);

	const handleRemoveFavorite = (pokemonId: number) => {
		const savedPokemon = pokemonIds.filter(
			(savedPokemon: number) => savedPokemon === pokemonId
		);

		if (savedPokemon.length > 0) {
			const newArray = [...favPokemons];
			_.remove(newArray, (n) => {
				return n.id === savedPokemon[0];
			});

			setFavPokemons(newArray);
			setFavoritePokemons(
				newArray.map((pokemon) => {
					return pokemon.id;
				})
			);
		}
	};

	return (
		<div className={styles.favoriteList}>
			{favPokemons.map((pokemon: PokemonObj) => {
				const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;

				return (
					<div className={styles.favoriteList__pokemon}>
						<img
							src={imgUrl}
							alt={pokemon.name}
							className={styles.favoriteList__pokemon__image}
						/>
						<div className={styles.favoriteList__pokemon__name}>
							{pokemon.name}
						</div>
						<BiSolidHeart
							size={'1.5rem'}
							className={styles.favoriteList__pokemon__icon}
							onClick={() => handleRemoveFavorite(pokemon.id)}
						/>
					</div>
				);
			})}
		</div>
	);
};
