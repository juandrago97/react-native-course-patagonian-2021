import { characterDetailEndpoint, charactersEndpoint, charactersByNameEndpoint } from './endpoints';

export const getAllCharacters = async () => {
  try {
    let serviceResponse;

    const response = await fetch(charactersEndpoint);
    const parsedResponse = await response.json();

    if (response.status === 200) {
      const orderedReponse = parsedResponse.sort((a: Character, b: Character) =>
        a.name.localeCompare(b.name),
      );
      serviceResponse = { success: true, data: orderedReponse };
    } else {
      serviceResponse = { success: false, data: parsedResponse };
    }

    return serviceResponse;
  } catch (error) {
    console.log('Error fetching all characters: ', error);
    return {
      success: false,
      data: error,
    };
  }
};

export const getCharacterById = async (id: number) => {
  try {
    let serviceResponse;

    const response = await fetch(characterDetailEndpoint(id));
    const parsedResponse = await response.json();

    if (response.status === 200) {
      serviceResponse = { success: true, data: parsedResponse };
    } else {
      serviceResponse = { success: false, data: parsedResponse };
    }

    return serviceResponse;
  } catch (error) {
    console.log(`Error fetching character with id: ${id}`, error);
    return {
      success: false,
      data: error,
    };
  }
};

export const getCharactersByName = async (name: string) => {
  try {
    let serviceResponse;

    const response = await fetch(charactersByNameEndpoint(name));
    const parsedResponse = await response.json();

    if (response.status === 200) {
      serviceResponse = { success: true, data: parsedResponse };
    } else {
      serviceResponse = { success: false, data: parsedResponse };
    }

    return serviceResponse;
  } catch (error) {
    console.log(`Error fetching character with name: ${name}`, error);
    return {
      success: false,
      data: error,
    };
  }
};
