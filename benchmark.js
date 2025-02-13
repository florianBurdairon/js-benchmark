console.time("fetching 1000 times");
await fetch("https://localhost:3000/api/pokemons/1");
console.timeEnd("fetching 1000 times");

// console.time("fetching 1000 times");
// for (let i = 0; i < 1; i++) {
//   await fetch("http://localhost:3000/api/pokemons", { method: "GET" }).then(
//     (res) => console.log(res) || res.json()
//   );
// }
// console.timeEnd("fetching 1000 times");
