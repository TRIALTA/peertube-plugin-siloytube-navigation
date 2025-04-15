const fs = require("fs");
const path = require("path");

// Path to package.json
const packageJsonPath = path.join(__dirname, "..", "package.json");

try {
    // Read package.json
    const data = fs.readFileSync(packageJsonPath, "utf8");

    // Parse JSON
    const packageJson = JSON.parse(data);

    if (!packageJson.version) {
        throw new Error("Version field not found in package.json");
    }

    // Split and increment semantic version
    const versionParts = packageJson.version.split(".").map(Number);
    if (versionParts.length !== 3 || versionParts.some(isNaN)) {
        throw new Error("Invalid version format in package.json");
    }

    versionParts[2] += 1; // Increment patch version
    packageJson.version = versionParts.join(".");

    // Write updated package.json back
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n", "utf8");
    console.log(`Version bumped to ${packageJson.version}`);
} catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
}