const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg"];
const OUTPUT_FORMATS = ["webp", "avif"];

async function getFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getFiles(fullPath)));
    } else if (IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

async function convertImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const outputDir = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);

  const image = sharp(filePath);
  const metadata = await image.metadata();

  await Promise.all(
    OUTPUT_FORMATS.map(async (format) => {
      const outputPath = path.join(outputDir, `${baseName}.${format}`);
      const exists = await fs
        .access(outputPath)
        .then(() => true)
        .catch(() => false);

      if (exists) {
        const [sourceStat, targetStat] = await Promise.all([
          fs.stat(filePath),
          fs.stat(outputPath),
        ]);
        if (targetStat.mtimeMs >= sourceStat.mtimeMs) {
          return;
        }
      }

      console.log(`Converting ${path.relative(PUBLIC_DIR, filePath)} → ${format}`);

      const pipeline = sharp(filePath).withMetadata();
      if (format === "webp") {
        await pipeline.webp({ quality: 85 }).toFile(outputPath);
      } else if (format === "avif") {
        await pipeline.avif({ quality: 60 }).toFile(outputPath);
      }

      if (metadata.orientation) {
        await sharp(outputPath).rotate().toFile(outputPath);
      }
    })
  );
}

(async () => {
  try {
    const files = await getFiles(PUBLIC_DIR);
    const imagesToConvert = files.filter((file) => file.includes(`${path.sep}portfolio-n0hacks${path.sep}`) || file.includes(`${path.sep}og${path.sep}`));

    if (!imagesToConvert.length) {
      console.log("No PNG/JPEG files found for conversion.");
      return;
    }

    for (const file of imagesToConvert) {
      await convertImage(file);
    }

    console.log("Image optimization complete.");
  } catch (error) {
    console.error("Image conversion failed:", error);
    process.exit(1);
  }
})();
