interface Link {
  to: string;
  title: string;
}
export const API_URL = import.meta.env.VITE_RICK_AND_MORTY_API_URL;
export const speciesList:string[] = [
    "human",
    "humanoid",
    "alien",
    "robot",
    "animal",
    "disease",
    "poopybutthole",
    "mythological creature",
    "unknown",
  ];
export  const genderList :string[] = ["Male", "Female", "Genderless", "unknown"];
export const statusList:string[] = ["alive", "dead", "unknown"];
export const typeList:string[] = ["planet", 
  "space station", 
  "cluster",
  "microverse",
  "TV", 
  "fantasy town",
  "dream", 
  "dimention", 
  "menagerie",
  "arcade",
  "cuasar", 
  "customs", 
  "resort", 
  "game", 
  "dwarf planet", 
  "teenyverse", 
  "SPA", 
  "box", 
  "diegesis", 
  "non-diegetic alternative reality", 
  "nightmare", 
  "asteroid", 
  "acid planet", 
  "death star", 
  "liquid", 
  "reality", 
  "human", 
  "spacecraft", 
  "base", 
  "elemental rings", 
  "hell", "space", 
  "Consciousness", 
  "country", 
  "police department", 
  "memory",  
  "unknown"];
export const dimensionList:string[] = ["Dimension C-137", "post-apocalyptic dimension", "replacement dimension", "cronenberg dimension", "fantasy dimension", "Dimension 5-126", "Testicle Monster Dimension", "Cromulon Dimension", "Dimension C-500A", "Dimension K-83", "Dimension J19ζ7", "Giant Telepathic Spiders Dimension", "fascist teddy bear dimension", "evil rick`s target dimension", "Dimension K-22", "Dimension D-99", "Dimension D716", "Dimension D716-B", "Dimension D716-C", "Dimension J-22", "Dimension C-35", "pizza dimension", "phone dimension", "chair dimension", "fascist dimension", "fascist shimp dimesion", "unknown"];

export const linkArr: Link[] = [
  { to: "/characters", title: "Characters" },
  { to: "/locations", title: "Locations" },
  { to: "/episodes", title: "Episodes" },
];