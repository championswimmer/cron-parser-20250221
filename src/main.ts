import { parseCronString } from "parser";
import { checkCronValidForTime, parseTimeString } from "time";


function check(cronString: string, time: string) {
  const cronData = parseCronString(cronString);
  const timeToCheck = parseTimeString(time);
  const isValid = checkCronValidForTime(cronData, timeToCheck);
  console.log(isValid);
}

function next(cronString: string) {

}

function main () {
  if (process.argv[2] === 'check') {
    check(process.argv[3], process.argv[4]);
  }
  if (process.argv[2] === 'next') {
    next(process.argv[3]);
  }
}

main();