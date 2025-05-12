import React from "react";

import { getFighters } from "../../services/domainRequest/fightersRequest";
import { startFight } from "../../services/domainRequest/fightRequest";
import NewFighter from "../newFighter";
import Fighter from "../fighter";
import { Button } from "@material-ui/core";

import "./fight.css";

class Fight extends React.Component {
  state = {
    fighters: [],
    fighter1: null,
    fighter2: null,
    fightResult: null,
  };

  async componentDidMount() {
    const fighters = await getFighters();
    if (fighters && !fighters.error) {
      this.setState({ fighters });
    }
  }

  onFightStart = async () => {
    const { fighter1, fighter2 } = this.state;
    if (fighter1 && fighter2) {
      try {
        const fightData = {
          fighter1Id: fighter1.id,
          fighter2Id: fighter2.id,
        };
        const result = await startFight(fightData);
        if (result && !result.error) {
          console.log("Fight started successfully:", result);
          console.log("Fight result:", result);

          this.setState({ fightResult: result });
          let alertMessage = "Fight Finished!";

          // Determine the winner's and loser's names
          // Assuming this.state.fighter1 and this.state.fighter2 contain { id: '...', name: '...' }
          if (result.winner) {
            // If there is a 'winner' property with the winner's ID
            const winnerId = result.winner;
            let winnerName = "";
            let loserName = "";

            if (winnerId === fighter1.id) {
              winnerName = fighter1.name;
              loserName = fighter2.name;
            } else if (winnerId === fighter2.id) {
              winnerName = fighter2.name;
              loserName = fighter1.name;
            }

            if (winnerName) {
              alertMessage += `\n\nCongratulations, ${winnerName}!\nYou defeated ${loserName}.`;
            } else {
              // If the winner's ID does not match any of the current fighters
              alertMessage += `\n\nThe registered winner has the ID: ${winnerId}.`;
            }
          } else {
            // If there is no 'winner' or it is null/undefined (possible draw or inconclusive result)
            alertMessage += `\n\nThe fight between ${fighter1.name} and ${fighter2.name} ended without a clear winner (or was a draw).`;
          }

          alert(alertMessage);
        } else {
          console.error(
            "Failed to start the fight:",
            result ? result.message : "Unknown error"
          );
        }
        if (result && result.message) {
          alert(`Fight error: ${result.message}`);
        } else if (!result) {
          // If result is undefined or null for some reason
          alert(
            "An error occurred while processing the fight and there was no response from the server."
          );
        }
      } catch (error) {
        // Error in the startFight service call itself (e.g., network)
        console.error("Error trying to process the fight:", error);
      }
    } else {
      alert("Please select both fighters before starting the fight.");
    }
  };

  onCreate = (fighter) => {
    this.setState({ fighters: [...this.state.fighters, fighter] });
  };

  onFighter1Select = (fighter1) => {
    this.setState({ fighter1 });
  };

  onFighter2Select = (fighter2) => {
    this.setState({ fighter2 });
  };

  getFighter1List = () => {
    const { fighter2, fighters } = this.state;
    if (!fighter2) {
      return fighters;
    }

    return fighters.filter((it) => it.id !== fighter2.id);
  };

  getFighter2List = () => {
    const { fighter1, fighters } = this.state;
    if (!fighter1) {
      return fighters;
    }

    return fighters.filter((it) => it.id !== fighter1.id);
  };

  render() {
    const { fighter1, fighter2 } = this.state;
    return (
      <div id="wrapper">
        <NewFighter onCreated={this.onCreate} />
        <div id="figh-wrapper">
          <Fighter
            selectedFighter={fighter1}
            onFighterSelect={this.onFighter1Select}
            fightersList={this.getFighter1List() || []}
          />
          <div className="btn-wrapper">
            <Button
              onClick={this.onFightStart}
              variant="contained"
              color="primary"
            >
              Start Fight
            </Button>
          </div>
          <Fighter
            selectedFighter={fighter2}
            onFighterSelect={this.onFighter2Select}
            fightersList={this.getFighter2List() || []}
          />
        </div>
        {this.state.fightResult && (
          <div>
            <h3>Fight Result:</h3>
            <pre>{JSON.stringify(this.state.fightResult, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }
}

export default Fight;
