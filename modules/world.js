const crafts = [
  {
    From: [3],
    FromNumber: [1],
    To: 5,
    ToNumber: 4,
  },
  {
    From: [1],
    FromNumber: [1],
    To: 2,
    ToNumber: 1,
  },
  {
    From: [36],
    FromNumber: [3],
    To: 14,
    ToNumber: 1,
  },
  {
    From:[5],
    FromNumber:[2],
    To:16,
    ToNumber:4,
  },
  {
    From:[8,21],
    FromNumber:[1,1],
    To:22,
    ToNumber:1,
  },
  {
    From:[9,21],
    FromNumber:[1,1],
    To:23,
    ToNumber:1,
  },
  {
    From:[12,21],
    FromNumber:[1,1],
    To:26,
    ToNumber:1,
  },
  {
    From:[21,16],
    FromNumber:[1,1],
    To:27,
    ToNumber:4,
  },
  {
    From: [16,5],
    FromNumber:[2,3],
    To: 17,
    ToNumber: 1,
  },
  {
    From: [16,22],
    FromNumber:[2,3],
    To: 18,
    ToNumber: 1,
  },
  {
    From: [16,23],
    FromNumber:[2,3],
    To: 19,
    ToNumber: 1,
  },
  {
    From: [16,26],
    FromNumber:[2,3],
    To: 20,
    ToNumber: 1,
  }
];

const drop_table = {
  1 : [1,1],
  2 : [1,1],
  3 : [3,1],
  5 : [5,1],
  6 : [6,1],
  7 : [21,4],
  8 : [8,1],
  9 : [9,1],
  10 : [24,4],
  11 : [25,4],
  12 : [12,4],
  27 : [27,1],
  28 : [28,1],
  29 : [29,1],
  30 : [30,1],
  31 : [31,1],
  32 : [32,1],
  33 : [36,1],
  34 : [36,1],
  35 : [36,1],
}

let player_texture_right = "assets/player_right.webp"
let player_texture_left = "assets/player_left.webp"

const blocks = [
  {
    Name: "Air",
    Color: [51, 153, 255],
    Id: 0,
  },
  {
    Name: "Dirt",
    Color: [153, 102, 51],
    Id: 1,
    Source: 'assets/sprite_01.png',
    CanRotate: true,
    Type: "Block",
    MinRank: 0,
  },
  {
    Name: "Grass",
    Color: [51, 204, 51],
    Id: 2,
    Source: 'assets/sprite_02.png',
    CanRotate: false,
    Type: "Block",
    MinRank: 0,
  },
  {
    Name: "Oak Log",
    Color: [187, 129, 65],
    Id: 3,
    Source: 'assets/sprite_03.png',
    CanRotate: false,
    Type: "Block",
    MinRank: 0,
  },
  {
    Name: "Oak Leave",
    Color: [97, 138, 61],
    Id: 4,
    Source: 'assets/sprite_04.png',
    CanRotate: true,
    Type: "Block",
    MinRank: 0,
  },
  {
    Name: "Oak Plank",
    Color: [186, 141, 89],
    Id: 5,
    Source: 'assets/sprite_05.png',
    CanRotate: true,
    Type: "Block",
    MinRank: 0,
  },
  {
    Name: "Stone",
    Color: [136, 140, 141],
    Id: 6,
    Source: 'assets/sprite_00.png',
    CanRotate: true,
    Type: "Block",
    MinRank: 1,
  },
  {
    Name: "Coal Ore",
    Color: [25, 25, 25],
    Id: 7,
    Source: 'assets/sprite_07.png',
    CanRotate: true,
    Type: "Block",
    MinRank: 1,
  },
  {
    Name: "Iron Ore",
    Color: [255, 210, 210],
    Id: 8,
    Source: 'assets/sprite_08.png',
    CanRotate: true,
    Type: "Block",
    MinRank: 1,
  },
  {
    Name: "Gold Ore",
    Color: [255, 221, 0],
    Id: 9,
    Source: 'assets/sprite_11.png',
    CanRotate: true,
    Type: "Block",
    MinRank: 2,
  },
  {
    Name: "Redstone Ore",
    Color: [255, 20, 20],
    Id: 10,
    Source: 'assets/sprite_10.png',
    CanRotate: true,
    Type: "Block",
    MinRank: 2,
  },
  {
    Name: "Lapis Ore",
    Color: [62, 20, 255],
    Id: 11,
    Source: 'assets/sprite_09.png',
    CanRotate: true,
    Type: "Block",
    MinRank: 2,
  },
  {
    Name: "Diamond Ore",
    Color: [20, 219, 255],
    Id: 12,
    Source: 'assets/sprite_12.png',
    CanRotate: true,
    Type: "Block",
    MinRank: 3,
  },
  {
    Name: "Bedrock",
    Color: [0, 0, 0],
    Id: 13,
    Source: 'assets/sprite_06.png',
    CanRotate: true,
    Type: "Block",
    MinRank: 0,
  },
  {
    Name: "Portal",
    Color: [255, 0, 255],
    Id: 14,
    Source: 'assets/sprite_13.png',
    CanRotate: true,
    Type: "Block",
    MinRank: 0,
  },
  {
    Name: "Missigno",
    Color: [255, 255, 255],
    Id: 15,
    Source: 'assets/sprite_14.png',
    CanRotate: true,
    Type: "Block",
    MinRank: 0,
  },
  {
    Name: "Stick",
    Id: 16,
    Source: 'assets/stick.png',
    Type:"Item"
  },
  {
    Name: "Wooden Pickaxe",
    Id: 17,
    Source: 'assets/wood_pickaxe.png',
    Type:"Tool",
    Categorie: "Pickaxe",
    Block_Damage: "0.5",
    Entity_Damage: "1",
    Rank:1,
    Durability: 100
  },
  {
    Name: "Iron Pickaxe",
    Id: 18,
    Source: 'assets/iron_pickaxe.png',
    Type:"Tool",
    Categorie: "Pickaxe",
    Block_Damage: "1",
    Entity_Damage: "1",
    Rank:2,
    Durability: 300
  },
  {
    Name: "Gold Pickaxe",
    Id: 19,
    Source: 'assets/gold_pickaxe.png',
    Type:"Tool",
    Categorie: "Pickaxe",
    Block_Damage: "3",
    Entity_Damage: "5",
    Rank:3,
    Durability: 50
  },
  {
    Name: "Diamond Pickaxe",
    Id: 20,
    Source: 'assets/diamond_pickaxe.png',
    Type:"Tool",
    Categorie: "Pickaxe",
    Block_Damage: "2",
    Entity_Damage: "3",
    Rank:4,
    Durability: 500
  },
  {
    Name: "Coal",
    Id: 21,
    Source: "assets/coal.png",
    Type: "Item",
  },
  {
    Name: "Iron Ingot",
    Id: 22,
    Source: "assets/iron_ingot.png",
    Type: "Item",
  },
  {
    Name: "Gold Ingot",
    Id: 23,
    Source: "assets/gold_ingot.png",
    Type: "Item",
  },
  {
    Name: "Redstone",
    Id: 24,
    Source: "assets/redstone.png",
    Type: "Item",
  },
  {
    Name: "Lapis",
    Id: 25,
    Source: "assets/lapis.png",
    Type: "Item",
  },
  {
    Name: "Diamond",
    Id: 26,
    Source: "assets/diamond.png",
    Type: "Item",
  },
  {
    Name: "Torch",
    Id: 27,
    Source: "assets/torch.png",
    Type: "Block",
    MinRank: 0,
    Light: 10,
    Color: [187, 129, 65],
  },

  {
    Name: "Crimson Stone",
    Id: 28,
    Source: "assets/stone_red.png",
    Type: "Block",
    MinRank: 4,
    Color: [255,0,0]
  },

  {
    Name: "Sky Stone",
    Id: 29,
    Source: "assets/stone_sky.png",
    Type: "Block",
    MinRank: 4,
    Color: [0,255,255]
  },

  {
    Name: "Azure Stone",
    Id: 30,
    Source: "assets/stone_blue.png",
    Type: "Block",
    MinRank: 4,
    Color: [0,0,255]
  },

  {
    Name: "Sand",
    Id: 31,
    Source: "assets/sand.png",
    Type: "Block",
    MinRank: 0,
    Color: [255,255,0]
  },

  {
    Name: "Sand Stone",
    Id: 32,
    Source: "assets/sand_stone.png",
    Type: "Block",
    MinRank: 1,
    Color: [255,255,0]
  },

  {
    Name: "Sand Rainbow",
    Id: 33,
    Source: "assets/sand_rainbow.png",
    Type: "Block",
    MinRank: 4,
    Color: [255,255,0]
  },

  {
    Name: "Azure Rainbow",
    Id: 34,
    Source: "assets/azure_rainbow.png",
    Type: "Block",
    MinRank: 4,
    Color: [255,255,0]
  },

  {
    Name: "Crimson Rainbow",
    Id: 35,
    Source: "assets/crimson_rainbow.png",
    Type: "Block",
    MinRank: 4,
    Color: [255,255,0]
  },

  {
    Name:"Rainbowite",
    Id: 36,
    Source: "assets/rainbowite.png",
    Type: "Item",
  }

];
