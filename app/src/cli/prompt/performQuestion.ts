import readline from "readline";

export default async function (question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => resolve(answer));
  }).then((answer) => {
    rl.close();
    return answer;
  });
}
