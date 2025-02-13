import prisma from "../prisma/prisma.js";
const pageSize = 20;

function parsePokemon(pokemonToParse) {
  const {
    species: { shape, color, ...species },
    ...pokemon
  } = pokemonToParse;

  return {
    ...pokemon,
    ...species,
    shape_id: shape?.identifier || null,
    color: color?.identifier || null,
  };
}

const select = {
  identifier: true,
  is_default: true,
  height: true,
  weight: true,
  base_experience: true,
  id: true,
  species: {
    select: {
      generation_id: true,
      evolves_from_species_id: true,
      evolution_chain_id: true,
      habitat_id: true,
      gender_rate: true,
      capture_rate: true,
      base_happiness: true,
      is_baby: true,
      hatch_counter: true,
      has_gender_differences: true,
      growth_rate_id: true,
      forms_switchable: true,
      order: true,
      conquest_order: true,
      color: {
        select: {
          identifier: true,
        },
      },
      shape: {
        select: {
          identifier: true,
        },
      },
    },
  },
};

export function getAllPokemon(page) {
  return prisma.pokemon
    .findMany({
      relationLoadStrategy: process.env.JOIN,
      select,
      take: pageSize,
      skip: (page - 1) * pageSize,
    })
    .then((results) => results.map(parsePokemon));
}

export function getPokemonById(id) {
  return prisma.pokemon
    .findUniqueOrThrow({
      relationLoadStrategy: process.env.JOIN,
      select,
      where: {
        id: parseInt(id),
      },
    })
    .then(parsePokemon);
}

export function createPokemon(data) {
  return prisma.pokemon
    .create({
      relationLoadStrategy: process.env.JOIN,
      data: {
        id: data.id,
        identifier: data.identifier,
        height: data.height,
        weight: data.weight,
        base_experience: data.base_experience,
        order: data.order,
        is_default: data.is_default,
        species: {
          create: {
            generation_id: data.generation_id,
            evolves_from_species_id: data.evolves_from_species_id,
            evolution_chain_id: data.evolution_chain_id,
            habitat_id: data.habitat,
            color_id: data.color_id,
            shape_id: data.shape_id,
            gender_rate: data.gender_rate,
            capture_rate: data.capture_rate,
            base_happiness: data.base_happiness,
            is_baby: data.is_baby,
            hatch_counter: data.hatch_counter,
            has_gender_differences: data.has_gender_differences,
            growth_rate_id: data.growth_rate_id,
            forms_switchable: data.forms_switchable,
            conquest_order: data.conquest_order,
            identifier: data.identifier,
            id: data.id,
            order: data.order,
          },
        },
      },
      select,
    })
    .then(parsePokemon);
}

export function updatePokemon(data) {
  return prisma.pokemon
    .update({
      relationLoadStrategy: process.env.JOIN,
      where: {
        id: data.id,
      },
      data: {
        // id: data.id,
        identifier: data.identifier,
        height: data.height,
        weight: data.weight,
        base_experience: data.base_experience,
        order: data.order,
        is_default: data.is_default,
        species: {
          update: {
            generation_id: data.generation_id,
            evolves_from_species_id: data.evolves_from_species_id,
            evolution_chain_id: data.evolution_chain_id,
            habitat_id: data.habitat,
            color_id: data.color_id,
            shape_id: data.shape_id,
            gender_rate: data.gender_rate,
            capture_rate: data.capture_rate,
            base_happiness: data.base_happiness,
            is_baby: data.is_baby,
            hatch_counter: data.hatch_counter,
            has_gender_differences: data.has_gender_differences,
            growth_rate_id: data.growth_rate_id,
            forms_switchable: data.forms_switchable,
            conquest_order: data.conquest_order,
            identifier: data.identifier,
            //   id: data.id,
            order: data.order,
          },
        },
      },
      select,
    })
    .then(parsePokemon);
}

export function deletePokemon(id) {
  return prisma.$transaction([
    prisma.pokemon_species.delete({
      where: {
        id: id,
      },
    }),
    prisma.pokemon.delete({
      where: {
        id: id,
      },
    }),
  ]);
}
