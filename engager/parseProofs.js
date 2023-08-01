const fs = require("fs");
const data = require("./data.json");
const userClaims = [];

for (let i = 0; i < data.proofs.length; i++) {
  const claim = data.proofs[i];
  userClaims.push({
    address: claim.value.address,
    amount: claim.value.totalRewards,
    proof: JSON.stringify(claim.proof),
  });
}

//check for duplicates
const uniqueClaims = userClaims.filter(
  (claim, index, self) =>
    index === self.findIndex((t) => t.address === claim.address)
);

console.log("uniqueClaims", uniqueClaims.length, userClaims.length);

fs.writeFileSync("userClaimsData.json", JSON.stringify(userClaims));
