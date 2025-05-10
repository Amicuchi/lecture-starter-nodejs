import { fightRepository } from "../repositories/fightRepository.js";
import { fighterRepository } from "../repositories/fighterRepository.js";

class FightersService {
  createFight(fighter1Id, fighter2Id) {
    const fighter1 = fighterRepository.getOne({ id: fighter1Id });
    const fighter2 = fighterRepository.getOne({ id: fighter2Id });

    if (!fighter1 || !fighter2) {
      throw new Error("One or both fighters were not found.");
    }

    // --- Start of Fight Logic ---
    let fightLog = [];
    let attacker = fighter1;
    let defender = fighter2;
    let winner = null;

    // Simple turn-based simulation
    for (let i = 0; i < 10; i++) { // Maximum of 10 turns, for example
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
