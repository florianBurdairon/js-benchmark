console.time("fetching 1000 times");
for (let i = 0; i < 100; i++) {
  await fetch("http://localhost:3000/api/pokemons", { method: "GET" });
}
console.timeEnd("fetching 1000 times");

const pool = 100;

let request = 10000;

function fetch2() {
    request--;
  return fetch("http://localhost:3000/api/pokemons", { method: "GET" }).then(() => {
    if (request > 0) {
      return fetch2();
    }
  });
}
console.time("fetching 1000 times2");
await Promise.all(Array.from({ length: pool }, () => fetch2()));
console.timeEnd("fetching 1000 times2");