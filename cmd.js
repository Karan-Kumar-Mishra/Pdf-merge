
import ex from "child_process"
const command = "bash script.sh";
ex.exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing the command: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`Error returned by the command: ${stderr}`);
    return;
  }
  console.log(`Command output:\n${stdout}`);
});
