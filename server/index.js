const prisma = require("./helper/prisma.js");
console.log(prisma);
async function main() {
  const post = await prisma.user.create({
    data: {
      username: "Rich",
      email: "hello@prisma.com",
      password: "new123",
      phone: "8840330283",
      bio: "new one two three",
      avatar: "https://robohash.org/quamquiaet.png?size=100x100&set=set1",
    },
  });
  console.log(post);
}

main();
