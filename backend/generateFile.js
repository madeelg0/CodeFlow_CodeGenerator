const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const codesDir = path.join(__dirname, "codes");

const generateFile = async (code) => {
  if (!fs.existsSync(codesDir)) {
    fs.mkdirSync(codesDir, { recursive: true });
  }

  const jobId = uuid();
  const fileName = `${jobId}.cpp`;
  const filePath = path.join(codesDir, fileName);

  await fs.writeFileSync(filePath, code);
  return filePath;
};

module.exports = {
  generateFile,
};
