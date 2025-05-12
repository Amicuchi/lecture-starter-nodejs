import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAll() {
    const fighters = fighterRepository.getAll();
    if (!fighters || fighters.length === 0) {
      return [];
    }
    return fighters;
  }

  getById(id) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) {
      throw new Error("Fighter not found");
    }
    return fighter;
  }

  create(data) {
    const existingFighterByName = fighterRepository.getOne({ name: data.name });
    if (existingFighterByName) {
      throw new Error("Fighter with this name already exists.");
    }
    // Health has a default value in the model if not provided
    const health = data.health === undefined || data.health === null ? 85 : data.health;
    const fighterData = { ...data, health };

    const newFighter = fighterRepository.create(fighterData);
    return newFighter;
  }

  update(id, dataToUpdate) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) {
      return null;
    }
    if (dataToUpdate.name && dataToUpdate.name.toLowerCase() !== fighter.name.toLowerCase()) {
      const existingFighterByName = fighterRepository.getOne({ name: dataToUpdate.name });
      if (existingFighterByName) {
        throw new Error("Fighter with this name already exists.");
      }
    }
    const updatedFighter = fighterRepository.update(id, dataToUpdate);
    return updatedFighter;
  }

  delete(id) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) {
      throw new Error("Fighter not found.");
    }
    fighterRepository.delete(id);
    return { message: "Fighter deleted successfully" };
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const fighterService = new FighterService();

export { fighterService };
