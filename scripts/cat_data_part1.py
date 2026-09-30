# Complete 13 categories definitions
# 40 main words per category, 4 impostor words per word = 160 impostor options per category
# All words have exact queries and subtle 1-word hints

ALL_CATEGORIES_DATA = [
  # ----------------------------------------------------
  # 1. ANIMALS
  # ----------------------------------------------------
  {
    "id": "animals",
    "name": "Animals",
    "emoji": "🐯",
    "description": "Wild beasts, aquatic creatures, and furry companions.",
    "color": "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400",
    "entries": [
      {
        "word": "Buffalo",
        "query": "Water buffalo",
        "impostorWords": [
          {"word": "Bison", "query": "American bison"},
          {"word": "Cow", "query": "Cattle"},
          {"word": "Bull", "query": "Bull"},
          {"word": "Yak", "query": "Domestic yak"}
        ],
        "hints": ["Horns", "Bovine", "Pasture", "Heavy"]
      },
      {
        "word": "Tiger",
        "query": "Bengal tiger",
        "impostorWords": [
          {"word": "Lion", "query": "Lion"},
          {"word": "Leopard", "query": "Indian leopard"},
          {"word": "Jaguar", "query": "Jaguar"},
          {"word": "Cheetah", "query": "Cheetah"}
        ],
        "hints": ["Stripes", "Feline", "Stalk", "Predator"]
      },
      {
        "word": "Lion",
        "query": "Lion",
        "impostorWords": [
          {"word": "Tiger", "query": "Bengal tiger"},
          {"word": "Leopard", "query": "Indian leopard"},
          {"word": "Cheetah", "query": "Cheetah"},
          {"word": "Cougar", "query": "Cougar"}
        ],
        "hints": ["Pride", "Savannah", "Mane", "Roar"]
      },
      {
        "word": "Elephant",
        "query": "Asian elephant",
        "impostorWords": [
          {"word": "Mammoth", "query": "Mammoth"},
          {"word": "Rhino", "query": "Indian rhinoceros"},
          {"word": "Hippopotamus", "query": "Hippopotamus"},
          {"word": "Tapir", "query": "Tapir"}
        ],
        "hints": ["Tusks", "Pachyderm", "Herds", "Memory"]
      },
      {
        "word": "Leopard",
        "query": "Indian leopard",
        "impostorWords": [
          {"word": "Cheetah", "query": "Cheetah"},
          {"word": "Jaguar", "query": "Jaguar"},
          {"word": "Panther", "query": "Black panther"},
          {"word": "Snow Leopard", "query": "Snow leopard"}
        ],
        "hints": ["Rosettes", "Canopy", "Agility", "Nocturnal"]
      },
      {
        "word": "Rhino",
        "query": "Indian rhinoceros",
        "impostorWords": [
          {"word": "Hippopotamus", "query": "Hippopotamus"},
          {"word": "Elephant", "query": "Asian elephant"},
          {"word": "Buffalo", "query": "Water buffalo"},
          {"word": "Warthog", "query": "Common warthog"}
        ],
        "hints": ["Horn", "Armor", "Grassland", "Herbivore"]
      },
      {
        "word": "Bear",
        "query": "Sloth bear",
        "impostorWords": [
          {"word": "Panda", "query": "Giant panda"},
          {"word": "Polar Bear", "query": "Polar bear"},
          {"word": "Grizzly Bear", "query": "Grizzly bear"},
          {"word": "Badger", "query": "Honey badger"}
        ],
        "hints": ["Claws", "Forage", "Den", "Shaggy"]
      },
      {
        "word": "Snow Leopard",
        "query": "Snow leopard",
        "impostorWords": [
          {"word": "Leopard", "query": "Indian leopard"},
          {"word": "Lynx", "query": "Eurasian lynx"},
          {"word": "Cougar", "query": "Cougar"},
          {"word": "Cheetah", "query": "Cheetah"}
        ],
        "hints": ["Altitude", "Cliffs", "Camouflage", "Prowl"]
      },
      {
        "word": "King Cobra",
        "query": "King cobra",
        "impostorWords": [
          {"word": "Python", "query": "Python (genus)"},
          {"word": "Viper", "query": "Viperidae"},
          {"word": "Rattlesnake", "query": "Rattlesnake"},
          {"word": "Black Mamba", "query": "Black mamba"}
        ],
        "hints": ["Venom", "Hood", "Reptilian", "Slither"]
      },
      {
        "word": "Crocodile",
        "query": "Mugger crocodile",
        "impostorWords": [
          {"word": "Alligator", "query": "American alligator"},
          {"word": "Gharial", "query": "Gharial"},
          {"word": "Caiman", "query": "Caiman"},
          {"word": "Monitor Lizard", "query": "Bengal monitor"}
        ],
        "hints": ["Reptile", "Swamp", "Scales", "Ambush"]
      },
      {
        "word": "Pangolin",
        "query": "Indian pangolin",
        "impostorWords": [
          {"word": "Armadillo", "query": "Armadillo"},
          {"word": "Anteater", "query": "Giant anteater"},
          {"word": "Porcupine", "query": "Indian crested porcupine"},
          {"word": "Hedgehog", "query": "Hedgehog"}
        ],
        "hints": ["Armor", "Scales", "Burrow", "Insectivore"]
      },
      {
        "word": "Nilgai",
        "query": "Nilgai",
        "impostorWords": [
          {"word": "Blackbuck", "query": "Blackbuck"},
          {"word": "Deer", "query": "Chital"},
          {"word": "Antelope", "query": "Antelope"},
          {"word": "Ibex", "query": "Alpine ibex"}
        ],
        "hints": ["Hooves", "Brushland", "Ungulate", "Grace"]
      },
      {
        "word": "Blackbuck",
        "query": "Blackbuck",
        "impostorWords": [
          {"word": "Chinkara", "query": "Chinkara"},
          {"word": "Gazelle", "query": "Gazelle"},
          {"word": "Impala", "query": "Impala"},
          {"word": "Deer", "query": "Chital"}
        ],
        "hints": ["Spiral-horns", "Agility", "Plains", "Bound"]
      },
      {
        "word": "Spotted Deer",
        "query": "Chital",
        "impostorWords": [
          {"word": "Sambar Deer", "query": "Sambar deer"},
          {"word": "Blackbuck", "query": "Blackbuck"},
          {"word": "Barking Deer", "query": "Indian muntjac"},
          {"word": "Reindeer", "query": "Reindeer"}
        ],
        "hints": ["Antlers", "Spots", "Woodland", "Fleet"]
      },
      {
        "word": "Wolf",
        "query": "Indian wolf",
        "impostorWords": [
          {"word": "Jackal", "query": "Golden jackal"},
          {"word": "Fox", "query": "Bengal fox"},
          {"word": "Wild Dog", "query": "Dhole"},
          {"word": "Hyena", "query": "Striped hyena"}
        ],
        "hints": ["Pack", "Howl", "Canine", "Tundra"]
      },
      {
        "word": "Jackal",
        "query": "Golden jackal",
        "impostorWords": [
          {"word": "Fox", "query": "Bengal fox"},
          {"word": "Wolf", "query": "Indian wolf"},
          {"word": "Hyena", "query": "Striped hyena"},
          {"word": "Coyote", "query": "Coyote"}
        ],
        "hints": ["Scavenger", "Cunning", "Wild", "Nocturnal"]
      },
      {
        "word": "Fox",
        "query": "Bengal fox",
        "impostorWords": [
          {"word": "Jackal", "query": "Golden jackal"},
          {"word": "Red Fox", "query": "Red fox"},
          {"word": "Wolf", "query": "Indian wolf"},
          {"word": "Raccoon", "query": "Raccoon"}
        ],
        "hints": ["Bushy-tail", "Burrow", "Stealth", "Alert"]
      },
      {
        "word": "Hyena",
        "query": "Striped hyena",
        "impostorWords": [
          {"word": "Jackal", "query": "Golden jackal"},
          {"word": "Wild Dog", "query": "Dhole"},
          {"word": "Wolf", "query": "Indian wolf"},
          {"word": "Aardwolf", "query": "Aardwolf"}
        ],
        "hints": ["Scavenger", "Jaws", "Savannah", "Stripe"]
      },
      {
        "word": "Wild Boar",
        "query": "Wild boar",
        "impostorWords": [
          {"word": "Pig", "query": "Domestic pig"},
          {"word": "Warthog", "query": "Common warthog"},
          {"word": "Peccary", "query": "Peccary"},
          {"word": "Hippopotamus", "query": "Hippopotamus"}
        ],
        "hints": ["Snout", "Tusks", "Bristles", "Forager"]
      },
      {
        "word": "Langur",
        "query": "Gray langur",
        "impostorWords": [
          {"word": "Macaque", "query": "Rhesus macaque"},
          {"word": "Baboon", "query": "Baboon"},
          {"word": "Gibbon", "query": "Gibbon"},
          {"word": "Chimpanzee", "query": "Chimpanzee"}
        ],
        "hints": ["Arboreal", "Long-tail", "Troop", "Primate"]
      },
      {
        "word": "Monkey",
        "query": "Rhesus macaque",
        "impostorWords": [
          {"word": "Langur", "query": "Gray langur"},
          {"word": "Baboon", "query": "Baboon"},
          {"word": "Squirrel Monkey", "query": "Squirrel monkey"},
          {"word": "Lemur", "query": "Ring-tailed lemur"}
        ],
        "hints": ["Canopy", "Agility", "Omnivore", "Troop"]
      },
      {
        "word": "Camel",
        "query": "Dromedary",
        "impostorWords": [
          {"word": "Llama", "query": "Llama"},
          {"word": "Alpaca", "query": "Alpaca"},
          {"word": "Donkey", "query": "Donkey"},
          {"word": "Horse", "query": "Horse"}
        ],
        "hints": ["Hump", "Desert", "Endurance", "Caravan"]
      },
      {
        "word": "Horse",
        "query": "Horse",
        "impostorWords": [
          {"word": "Donkey", "query": "Donkey"},
          {"word": "Mule", "query": "Mule"},
          {"word": "Zebra", "query": "Plains zebra"},
          {"word": "Pony", "query": "Pony"}
        ],
        "hints": ["Equine", "Gallop", "Mane", "Stallion"]
      },
      {
        "word": "Donkey",
        "query": "Donkey",
        "impostorWords": [
          {"word": "Mule", "query": "Mule"},
          {"word": "Horse", "query": "Horse"},
          {"word": "Zebra", "query": "Plains zebra"},
          {"word": "Camel", "query": "Dromedary"}
        ],
        "hints": ["Equine", "Endurance", "Ears", "Pack-animal"]
      },
      {
        "word": "Cow",
        "query": "Cattle",
        "impostorWords": [
          {"word": "Buffalo", "query": "Water buffalo"},
          {"word": "Bull", "query": "Bull"},
          {"word": "Ox", "query": "Ox"},
          {"word": "Goat", "query": "Domestic goat"}
        ],
        "hints": ["Bovine", "Pasture", "Cud", "Farm"]
      },
      {
        "word": "Goat",
        "query": "Domestic goat",
        "impostorWords": [
          {"word": "Sheep", "query": "Domestic sheep"},
          {"word": "Ibex", "query": "Alpine ibex"},
          {"word": "Llama", "query": "Llama"},
          {"word": "Cow", "query": "Cattle"}
        ],
        "hints": ["Caprine", "Horns", "Forage", "Herd"]
      },
      {
        "word": "Sheep",
        "query": "Domestic sheep",
        "impostorWords": [
          {"word": "Goat", "query": "Domestic goat"},
          {"word": "Lamb", "query": "Domestic sheep"},
          {"word": "Alpaca", "query": "Alpaca"},
          {"word": "Llama", "query": "Llama"}
        ],
        "hints": ["Fleece", "Pastoral", "Flock", "Grazer"]
      },
      {
        "word": "Dog",
        "query": "Dog",
        "impostorWords": [
          {"word": "Wolf", "query": "Indian wolf"},
          {"word": "Fox", "query": "Bengal fox"},
          {"word": "Jackal", "query": "Golden jackal"},
          {"word": "Dingo", "query": "Dingo"}
        ],
        "hints": ["Canine", "Companion", "Loyal", "Bark"]
      },
      {
        "word": "Cat",
        "query": "Cat",
        "impostorWords": [
          {"word": "Leopard", "query": "Indian leopard"},
          {"word": "Cheetah", "query": "Cheetah"},
          {"word": "Lynx", "query": "Eurasian lynx"},
          {"word": "Serval", "query": "Serval"}
        ],
        "hints": ["Feline", "Whiskers", "Agility", "Purr"]
      },
      {
        "word": "Rabbit",
        "query": "Rabbit",
        "impostorWords": [
          {"word": "Hare", "query": "Indian hare"},
          {"word": "Guinea Pig", "query": "Guinea pig"},
          {"word": "Hamster", "query": "Hamster"},
          {"word": "Chinchilla", "query": "Chinchilla"}
        ],
        "hints": ["Burrow", "Ears", "Forage", "Hops"]
      },
      {
        "word": "Otter",
        "query": "Smooth-coated otter",
        "impostorWords": [
          {"word": "Beaver", "query": "North American beaver"},
          {"word": "Seal", "query": "Earless seal"},
          {"word": "Platypus", "query": "Platypus"},
          {"word": "Mink", "query": "European mink"}
        ],
        "hints": ["Aquatic", "Streamline", "River", "Sleek"]
      },
      {
        "word": "Gharial",
        "query": "Gharial",
        "impostorWords": [
          {"word": "Crocodile", "query": "Mugger crocodile"},
          {"word": "Alligator", "query": "American alligator"},
          {"word": "Caiman", "query": "Caiman"},
          {"word": "Monitor Lizard", "query": "Bengal monitor"}
        ],
        "hints": ["Snout", "Riverine", "Fish-hunter", "Armor"]
      },
      {
        "word": "Monitor Lizard",
        "query": "Bengal monitor",
        "impostorWords": [
          {"word": "Komodo Dragon", "query": "Komodo dragon"},
          {"word": "Iguana", "query": "Green iguana"},
          {"word": "Chameleon", "query": "Indian chameleon"},
          {"word": "Gecko", "query": "Gecko"}
        ],
        "hints": ["Forked-tongue", "Reptilian", "Claws", "Scales"]
      },
      {
        "word": "Chameleon",
        "query": "Indian chameleon",
        "impostorWords": [
          {"word": "Gecko", "query": "Gecko"},
          {"word": "Iguana", "query": "Green iguana"},
          {"word": "Lizard", "query": "Bengal monitor"},
          {"word": "Salamander", "query": "Salamander"}
        ],
        "hints": ["Color-shift", "Independent-eyes", "Prehensile", "Arboreal"]
      },
      {
        "word": "Tortoise",
        "query": "Indian star tortoise",
        "impostorWords": [
          {"word": "Turtle", "query": "Olive ridley sea turtle"},
          {"word": "Terrapin", "query": "Diamondback terrapin"},
          {"word": "Armadillo", "query": "Armadillo"},
          {"word": "Pangolin", "query": "Indian pangolin"}
        ],
        "hints": ["Carapace", "Dome", "Slow", "Herbivore"]
      },
      {
        "word": "Dolphin",
        "query": "South Asian river dolphin",
        "impostorWords": [
          {"word": "Whale", "query": "Blue whale"},
          {"word": "Porpoise", "query": "Harbour porpoise"},
          {"word": "Seal", "query": "Earless seal"},
          {"word": "Manatee", "query": "Manatee"}
        ],
        "hints": ["Echolocation", "Aquatic", "Pod", "Cetacean"]
      },
      {
        "word": "Mongoose",
        "query": "Indian grey mongoose",
        "impostorWords": [
          {"word": "Meerkat", "query": "Meerkat"},
          {"word": "Weasel", "query": "Least weasel"},
          {"word": "Ferret", "query": "Ferret"},
          {"word": "Civet", "query": "Asian palm civet"}
        ],
        "hints": ["Reflexes", "Agility", "Burrow", "Stealth"]
      },
      {
        "word": "Porcupine",
        "query": "Indian crested porcupine",
        "impostorWords": [
          {"word": "Hedgehog", "query": "Hedgehog"},
          {"word": "Echidna", "query": "Short-beaked echidna"},
          {"word": "Pangolin", "query": "Indian pangolin"},
          {"word": "Armadillo", "query": "Armadillo"}
        ],
        "hints": ["Quills", "Defense", "Rodent", "Nocturnal"]
      },
      {
        "word": "Squirrel",
        "query": "Indian palm squirrel",
        "impostorWords": [
          {"word": "Chipmunk", "query": "Chipmunk"},
          {"word": "Prairie Dog", "query": "Prairie dog"},
          {"word": "Hamster", "query": "Hamster"},
          {"word": "Mouse", "query": "House mouse"}
        ],
        "hints": ["Acorn", "Bushy-tail", "Rodent", "Agility"]
      },
      {
        "word": "Bat",
        "query": "Indian flying fox",
        "impostorWords": [
          {"word": "Owl", "query": "Barn owl"},
          {"word": "Flying Squirrel", "query": "Indian giant flying squirrel"},
          {"word": "Vampire Bat", "query": "Common vampire bat"},
          {"word": "Moth", "query": "Moth"}
        ],
        "hints": ["Nocturnal", "Echolocation", "Roost", "Wings"]
      }
    ]
  }
]
