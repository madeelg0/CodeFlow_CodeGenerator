const { exec } = require("child_process");
const { error } = require("console");

const fs = require("fs");
const path = require("path");
const { stdout, stderr } = require("process");

const outputDir = path.join(__dirname, "outputs");

const executeCpp = (filePath) => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const jobId = path.basename(filePath).split(".")[0]
  const outputPath = path.join(outputDir,`${jobId}.out`)
  return new Promise((resolve, reject) => {
    exec(`g++ ${filePath} -o ${outputPath} && cd ${outputDir} && ./${jobId}.out`, (error, stdout, stderr) => {
        if(error){
            reject({error,stderr})
        }
        if(stderr){
            reject(stderr
            )
        }
        resolve(stdout)
    })

  });
};

module.exports = {
  executeCpp,
};
