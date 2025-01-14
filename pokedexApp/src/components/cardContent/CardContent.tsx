import { PokemonObj } from '../../types/Pokemon';
import { formatPokemonId } from '../../utils/pokemonFunctions';
import { PokemonBadgeType } from '../';
import styles from './cardContent.module.scss';
import { BiHeart, BiSolidHeart, BiInfoCircle } from 'react-icons/bi';
import { useUserContext } from '../../utils';
import { Tooltip as ReactTooltip } from 'react-tooltip';

type CardContentProps = {
	type: CardType;
	pokemon: PokemonObj;
	openModal?: () => void;
	openPokemonTypeModal?: (type: string) => void;
	favPokemons?: number[];
	onSetFavorites?: (id: PokemonObj) => void;
	onRemoveFavorites?: (id: number) => void;
};

type CardType = 'horizontal' | 'vertical';

export const CardContent = ({
	type,
	pokemon,
	openModal,
	openPokemonTypeModal,
	favPokemons = [],
	onSetFavorites,
	onRemoveFavorites,
}: CardContentProps) => {
	const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;
	const { user } = useUserContext();

	const renderFav = () => {
		if (!user.id) {
			return null;
		}
		const savedPokemon = favPokemons.filter(
			(savedPokemon: number) => savedPokemon === pokemon.id
		);

		if (savedPokemon.length > 0) {
			return (
				<BiSolidHeart
					size={'1.5rem'}
					onClick={() => onRemoveFavorites && onRemoveFavorites(pokemon.id)}
				/>
			);
		} else {
			return (
				<BiHeart
					size={'1.5rem'}
					onClick={() => onSetFavorites && onSetFavorites(pokemon)}
				/>
			);
		}
	};

	const renderCardContent = () => {
		if (type === 'horizontal') {
			return (
				<div
					className={`${styles.cardContent} ${styles.horizontalCardContent}`}
				>
					{renderPokemonCharacteristics(pokemon)}
					<img
						src={imgUrl}
						alt={pokemon.name}
						className={styles.horizontalCardContent__image}
						loading='lazy'
					/>
				</div>
			);
		} else {
			return (
				<div className={styles.cardContent}>
					<ReactTooltip
						id={`pokemon-tooltip-${pokemon.id}`}
						place='top-end'
						variant='info'
						content='Press here to get more information'
					/>

					<div className={styles.cardContent__favorite}>{renderFav()}</div>
					<div
						className={styles.cardContent__info}
						onClick={openModal}
						data-tooltip-id={`pokemon-tooltip-${pokemon.id}`}
					>
						<BiInfoCircle size={'1.5rem'} />
					</div>
					<div
						className={`${styles.cardContent} ${styles.verticalCardContent}`}
					>
						<img
							src={imgUrl}
							alt={pokemon.name}
							className={styles.verticalCardContent__image}
							loading='lazy'
						/>

						{renderPokemonCharacteristics(pokemon, openPokemonTypeModal)}
					</div>
				</div>
			);
		}
	};

	return <>{renderCardContent()}</>;
};

export const renderPokemonCharacteristics = (
	pokemon: PokemonObj,
	openPokemonTypeModal?: (type: string) => void
) => {
	return (
		<div
			className={`${styles.cardContent__pokemonInfo} ${styles.verticalCardContent__pokemonInfo}`}
		>
			<div className={styles.cardContent__pokemonInfo__number}>
				{formatPokemonId(pokemon.id)}
			</div>
			<div className={styles.cardContent__pokemonInfo__name}>
				{pokemon.name}
			</div>

			<div className={styles.cardContent__badgeList}>
				{pokemon.types.map(({ type }) => (
					<PokemonBadgeType
						key={type.name}
						type={type.name}
						tabIndex={false}
						openPokemonTypeModal={() =>
							openPokemonTypeModal && openPokemonTypeModal(type.name)
						}
					/>
				))}
			</div>
			<div className={styles.pokemon__characteristics}>
				<div className={styles.characteristic}>
					<div className={styles.value}>{pokemon.height} m</div>
					<div>Height</div>
				</div>
				<div className={styles.characteristic}>
					<div className={styles.value}>{pokemon.weight} Kg</div>
					<div>Weight</div>
				</div>
			</div>
		</div>
	);
};
