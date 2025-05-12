import { fightRepository } from "../repositories/fightRepository.js";
import { fighterRepository } from "../repositories/fighterRepository.js";

class FightersService {
  createFight(fighter1Id, fighter2Id) {
    const originalFighter1 = fighterRepository.getOne({ id: fighter1Id });
    const originalFighter2 = fighterRepository.getOne({ id: fighter2Id });

    if (!originalFighter1 || !originalFighter2) {
      throw new Error("One or both fighters were not found.");
    }

    // clonning the fighters to Ensure they have a default health value if not provided
    const fighter1 = { ...originalFighter1, health: originalFighter1.health };
    const fighter2 = { ...originalFighter2, health: originalFighter2.health };

    // --- Start of Fight Logic ---
    let fightLog = [];
    let winner = null;

    // Simple random selection of attacker and defender
    let attacker, defender;
    if (Math.random() < 0.5) {
      attacker = fighter1;
      defender = fighter2;
    } else {
      attacker = fighter2;
      defender = fighter1;
    }

    // Simple turn-based simulation
    for (let i = 0; i < 10; i++) { // Maximum of 10 turns, in this case
      const damage = Math.max(1, attacker.power - defender.defense);
      defender.health -= damage;
      fightLog.push(`${attacker.name} attacks ${defender.name} causing ${damage} damage. ${defender.name} has ${defender.health} health left.`);

      if (defender.health <= 0) {
        winner = attacker;
        fightLog.push(`${defender.name} was defeated! ${attacker.name} is the winner!`);
        break;
      }

      // Swap attacker and defender
      [attacker, defender] = [defender, attacker];
    }

    if (!winner) {
      fightLog.push("The fight ended in a draw after many turns!");
    }
    // --- End of Fight Logic ---

    const fightResult = {
      fighter1: fighter1Id,
      fighter2: fighter2Id,
      log: fightLog,
      winner: winner ? winner.id : null,
    };

    return fightRepository.create(fightResult);
  }

  getAllFights() {
    return fightRepository.getAll();
  }
}

const fightersService = new FightersService();

export { fightersService };
