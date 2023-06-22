import { PokemonObj } from '../../types/Pokemon';
import { Card } from '../generalComponents/card/Card';
import styles from './home.module.scss';
import { PokemonTypeBadge } from '../pokemonBadgeType/PokemonType';
import { formatPokemonId, getPokemonColor } from '../../utils/pokemonFunctions';

type HomeProps = {
	pokemon: PokemonObj | null;
};

export const Home = ({ pokemon }: HomeProps) => {
	const renderPokemon = () => {
		let pokemonVar;

		if (pokemon !== null) {
			const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;

			pokemonVar = (
				<div className={styles.home__card}>
					<div className={styles.home__card__pokemon}>
						<div className={styles.pokemon__number}>
							{formatPokemonId(pokemon.id)}
						</div>
						<div className={styles.pokemon__name}>{pokemon.name}</div>

						<div className={styles.card__badge}>
							{pokemon.types.map(({ type }) => (
								<PokemonTypeBadge
									key={type.name}
									type={type.name}
									tabIndex={false}
								/>
							))}
						</div>
						<div className={styles.pokemon__characteristics}>
							<div className={styles.characteristic}>
								<div className={styles.value}>{pokemon.height} m</div>
								<div>Altura</div>
							</div>
							<div className={styles.characteristic}>
								<div className={styles.value}>{pokemon.weight} Kg</div>
								<div>Peso</div>
							</div>
						</div>
					</div>
					<img src={imgUrl} alt={pokemon.name} className={styles.card__image} />
				</div>
			);
		}
		return pokemonVar;
	};

	return (
		<div className={styles.home}>
			<Card size='lg' backgroundColor={getPokemonColor(pokemon).color}>
				<>
					<h2 className={styles.card__title}>
						Your today's random Pokemon is...
					</h2>
					{renderPokemon()}
				</>
			</Card>
		</div>
	);
};
