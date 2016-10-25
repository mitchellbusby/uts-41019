/**
 * Maps the raw potentiometer value to a limiting number of people to a single room
 * @param  {int} potentiometerValue [The potentiometer value, should be between 1-1024]
 * @return {int}                    [The maximum number of people that should be in a room]
 */
const mapPotentiometerToPeopleThreshold = function(potentiometerValue) {
  let people_threshold = 0

  if (potentiometerValue < 250)
    people_threshold = 2
  else if (potentiometerValue < 500)
    people_threshold = 7
  else if (potentiometerValue < 750)
    people_threshold = 15
  else if (potentiometerValue < 1000)
    people_threshold = 20
  else
    people_threshold = 1000
  return people_threshold;
}

module.exports = {
  mapPotentiometerToPeopleThreshold
}
