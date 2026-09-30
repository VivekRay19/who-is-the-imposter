import { WordEntry } from '../types/game';

export const foodWords: WordEntry[] = [
  {
    category: 'food',
    word: "Biryani",
    image: "/images/food/biryani.jpg",
    impostorWords: [
      { word: "Pulao", image: "/images/food/pulao.jpg" },
      { word: "Fried Rice", image: "/images/food/fried_rice.jpg" },
      { word: "Risotto", image: "/images/food/risotto.jpg" },
      { word: "Khichdi", image: "/images/food/khichdi.jpg" },
    ],
    impostorHints: ["Dum sealed pot cooking", "Aromatic basmati rice", "Saffron yellow layers", "Spiced rich aroma", "Fried onions garnish"]
  },
  {
    category: 'food',
    word: "Samosa",
    image: "/images/food/samosa.jpg",
    impostorWords: [
      { word: "Kachori", image: "/images/food/kachori.jpg" },
      { word: "Spring Roll", image: "/images/food/spring_roll.jpg" },
      { word: "Empanada", image: "/images/food/empanada.jpg" },
      { word: "Pakora", image: "/images/food/pakora.jpg" },
    ],
    impostorHints: ["Golden triangular pastry", "Spiced potato pea filling", "Deep fried crunch", "Green mint chutney dip", "Street snack favorite"]
  },
  {
    category: 'food',
    word: "Butter Chicken",
    image: "/images/food/butter_chicken.jpg",
    impostorWords: [
      { word: "Chicken Tikka Masala", image: "/images/food/chicken_tikka_masala.jpg" },
      { word: "Paneer Makhani", image: "/images/food/paneer_makhani.jpg" },
      { word: "Rogan Josh", image: "/images/food/rogan_josh.jpg" },
      { word: "Korma", image: "/images/food/korma.jpg" },
    ],
    impostorHints: ["Velvety tomato cream gravy", "Tandoori roasted meat", "Fenugreek aromatic touch", "Butter melting on top", "Warm naan bread dip"]
  },
  {
    category: 'food',
    word: "Masala Dosa",
    image: "/images/food/masala_dosa.jpg",
    impostorWords: [
      { word: "Uttapam", image: "/images/food/uttapam.jpg" },
      { word: "Idli", image: "/images/food/idli.jpg" },
      { word: "Appam", image: "/images/food/appam.jpg" },
      { word: "Pesarattu", image: "/images/food/pesarattu.jpg" },
    ],
    impostorHints: ["Crispy fermented crepe", "Spiced potato mash inside", "Hot sambar bowl", "Coconut white chutney", "Golden rolled tawa"]
  },
  {
    category: 'food',
    word: "Pani Puri",
    image: "/images/food/pani_puri.jpg",
    impostorWords: [
      { word: "Sev Puri", image: "/images/food/sev_puri.jpg" },
      { word: "Bhelpuri", image: "/images/food/bhelpuri.jpg" },
      { word: "Dahi Puri", image: "/images/food/dahi_puri.jpg" },
      { word: "Papri Chaat", image: "/images/food/papri_chaat.jpg" },
    ],
    impostorHints: ["Crispy hollow semolina spheres", "Spicy tangy mint water", "Sweet tamarind drizzle", "Popped whole in mouth", "Street cart crowd"]
  },
  {
    category: 'food',
    word: "Chole Bhature",
    image: "/images/food/chole_bhature.jpg",
    impostorWords: [
      { word: "Puri Bhaji", image: "/images/food/puri_bhaji.jpg" },
      { word: "Kulcha", image: "/images/food/kulcha.jpg" },
      { word: "Dal Makhani", image: "/images/food/dal_makhani.jpg" },
      { word: "Pav Bhaji", image: "/images/food/pav_bhaji.jpg" },
    ],
    impostorHints: ["Puffy deep fried balloon bread", "Spicy dark chickpea gravy", "Pickled green chilli onion", "Hearty Punjabi breakfast", "Steaming plate"]
  },
  {
    category: 'food',
    word: "Dal Makhani",
    image: "/images/food/dal_makhani.jpg",
    impostorWords: [
      { word: "Rajma", image: "/images/food/rajma.jpg" },
      { word: "Dal Tadka", image: "/images/food/dal_tadka.jpg" },
      { word: "Chole", image: "/images/food/chole.jpg" },
      { word: "Sambar", image: "/images/food/sambar.jpg" },
    ],
    impostorHints: ["Slow cooked black lentils", "Simmered with butter cream", "Rich velvety texture", "Pairing with garlic naan", "Overnight charcoal simmer"]
  },
  {
    category: 'food',
    word: "Paneer Tikka",
    image: "/images/food/paneer_tikka.jpg",
    impostorWords: [
      { word: "Chicken Tikka", image: "/images/food/chicken_tikka.jpg" },
      { word: "Tandoori Soya Chaap", image: "/images/food/tandoori_soya_chaap.jpg" },
      { word: "Seekh Kabab", image: "/images/food/seekh_kabab.jpg" },
      { word: "Grilled Veggies", image: "/images/food/grilled_veggies.jpg" },
    ],
    impostorHints: ["Marinated cottage cheese cubes", "Skewered clay tandoor", "Charred spicy edges", "Capsicum onion slices", "Chaat masala squeeze"]
  },
  {
    category: 'food',
    word: "Pav Bhaji",
    image: "/images/food/pav_bhaji.jpg",
    impostorWords: [
      { word: "Misal Pav", image: "/images/food/misal_pav.jpg" },
      { word: "Vada Pav", image: "/images/food/vada_pav.jpg" },
      { word: "Chole Bhature", image: "/images/food/chole_bhature.jpg" },
      { word: "Keema Pav", image: "/images/food/keema_pav.jpg" },
    ],
    impostorHints: ["Mashed spiced mixed vegetables", "Butter toasted soft buns", "Chopped onions lemon squeeze", "Hot sizzling tawa", "Mumbai street feast"]
  },
  {
    category: 'food',
    word: "Gulab Jamun",
    image: "/images/food/gulab_jamun.jpg",
    impostorWords: [
      { word: "Rasgulla", image: "/images/food/rasgulla.jpg" },
      { word: "Jalebi", image: "/images/food/jalebi.jpg" },
      { word: "Kala Jamun", image: "/images/food/kala_jamun.jpg" },
      { word: "Rasmalai", image: "/images/food/rasmalai.jpg" },
    ],
    impostorHints: ["Deep fried dough spheres", "Warm rose cardamom syrup", "Melt in mouth sweetness", "Dark golden brown dessert", "Festive sweet feast"]
  },
  {
    category: 'food',
    word: "Jalebi",
    image: "/images/food/jalebi.jpg",
    impostorWords: [
      { word: "Imarti", image: "/images/food/imarti.jpg" },
      { word: "Gulab Jamun", image: "/images/food/gulab_jamun.jpg" },
      { word: "Churros", image: "/images/food/churros.jpg" },
      { word: "Laddoo", image: "/images/food/laddoo.jpg" },
    ],
    impostorHints: ["Swirling circular pretzel", "Crispy saffron orange loops", "Dripping hot sweet syrup", "Pairing with creamy rabdi", "Morning sweet stall"]
  },
  {
    category: 'food',
    word: "Rasgulla",
    image: "/images/food/rasgulla.jpg",
    impostorWords: [
      { word: "Gulab Jamun", image: "/images/food/gulab_jamun.jpg" },
      { word: "Rasmalai", image: "/images/food/rasmalai.jpg" },
      { word: "Cham Cham", image: "/images/food/cham_cham.jpg" },
      { word: "Sandesh", image: "/images/food/sandesh.jpg" },
    ],
    impostorHints: ["Spongy white cottage balls", "Light clear sugar syrup", "Sweet juicy squeeze", "Bengali dessert pride", "Chilled sweet delight"]
  },
  {
    category: 'food',
    word: "Kaju Katli",
    image: "/images/food/kaju_katli.jpg",
    impostorWords: [
      { word: "Barfi", image: "/images/food/barfi.jpg" },
      { word: "Peda", image: "/images/food/peda.jpg" },
      { word: "Besan Laddoo", image: "/images/food/besan_laddoo.jpg" },
      { word: "Soan Papdi", image: "/images/food/soan_papdi.jpg" },
    ],
    impostorHints: ["Diamond shaped fudge", "Silver foil leaf topping", "Ground cashew paste", "Diwali festive luxury", "Smooth rich bite"]
  },
  {
    category: 'food',
    word: "Idli Sambar",
    image: "/images/food/idli_sambar.jpg",
    impostorWords: [
      { word: "Medu Vada", image: "/images/food/medu_vada.jpg" },
      { word: "Dosa", image: "/images/food/dosa.jpg" },
      { word: "Uttapam", image: "/images/food/uttapam.jpg" },
      { word: "Dhokla", image: "/images/food/dhokla.jpg" },
    ],
    impostorHints: ["Steamed white rice cakes", "Lentil vegetable soup dip", "South Indian breakfast staple", "Coconut chutney side"]
  },
  {
    category: 'food',
    word: "Medu Vada",
    image: "/images/food/medu_vada.jpg",
    impostorWords: [
      { word: "Idli", image: "/images/food/idli.jpg" },
      { word: "Pakora", image: "/images/food/pakora.jpg" },
      { word: "Falafel", image: "/images/food/falafel.jpg" },
      { word: "Doughnut", image: "/images/food/doughnut.jpg" },
    ],
    impostorHints: ["Crispy savory donut", "Deep fried lentil batter", "Golden crunchy breakfast", "Sambar dipping favorite"]
  },
  {
    category: 'food',
    word: "Rajma Chawal",
    image: "/images/food/rajma_chawal.jpg",
    impostorWords: [
      { word: "Dal Makhani", image: "/images/food/dal_makhani.jpg" },
      { word: "Chole Rice", image: "/images/food/chole_rice.jpg" },
      { word: "Kadhi Pakora", image: "/images/food/kadhi_pakora.jpg" },
      { word: "Khichdi", image: "/images/food/khichdi.jpg" },
    ],
    impostorHints: ["Red kidney bean gravy", "Steaming white basmati rice", "Sunday comforting meal", "Ghee and onion pickle", "Punjabi home favorite"]
  },
  {
    category: 'food',
    word: "Rogan Josh",
    image: "/images/food/rogan_josh.jpg",
    impostorWords: [
      { word: "Butter Chicken", image: "/images/food/butter_chicken.jpg" },
      { word: "Mutton Korma", image: "/images/food/mutton_korma.jpg" },
      { word: "Nihari", image: "/images/food/nihari.jpg" },
      { word: "Laal Maas", image: "/images/food/laal_maas.jpg" },
    ],
    impostorHints: ["Aromatic Kashmiri gravy", "Rich red mutton curry", "Warm spices and ratan jot", "Slow cooked meat specialty"]
  },
  {
    category: 'food',
    word: "Malai Kofta",
    image: "/images/food/malai_kofta.jpg",
    impostorWords: [
      { word: "Shahi Paneer", image: "/images/food/shahi_paneer.jpg" },
      { word: "Palak Paneer", image: "/images/food/palak_paneer.jpg" },
      { word: "Dum Aloo", image: "/images/food/dum_aloo.jpg" },
      { word: "Navratan Korma", image: "/images/food/navratan_korma.jpg" },
    ],
    impostorHints: ["Soft creamy fried dumplings", "Rich cashew tomato gravy", "Paneer and potato balls", "Royal Mughlai dish"]
  },
  {
    category: 'food',
    word: "Palak Paneer",
    image: "/images/food/palak_paneer.jpg",
    impostorWords: [
      { word: "Sarson Ka Saag", image: "/images/food/sarson_ka_saag.jpg" },
      { word: "Paneer Makhani", image: "/images/food/paneer_makhani.jpg" },
      { word: "Methi Malai Matar", image: "/images/food/methi_malai_matar.jpg" },
      { word: "Aloo Palak", image: "/images/food/aloo_palak.jpg" },
    ],
    impostorHints: ["Vibrant green spinach gravy", "Soft white cheese cubes", "Garlic cumin aroma", "Healthy comforting curry", "Warm roti pairing"]
  },
  {
    category: 'food',
    word: "Aloo Paratha",
    image: "/images/food/aloo_paratha.jpg",
    impostorWords: [
      { word: "Paneer Paratha", image: "/images/food/paneer_paratha.jpg" },
      { word: "Gobi Paratha", image: "/images/food/gobi_paratha.jpg" },
      { word: "Roti", image: "/images/food/roti.jpg" },
      { word: "Naan", image: "/images/food/naan.jpg" },
    ],
    impostorHints: ["Spiced mashed potato filling", "Stuffed buttery flatbread", "Served with curd and butter", "North Indian breakfast favorite"]
  },
  {
    category: 'food',
    word: "Dhokla",
    image: "/images/food/dhokla.jpg",
    impostorWords: [
      { word: "Khandvi", image: "/images/food/khandvi.jpg" },
      { word: "Idli", image: "/images/food/idli.jpg" },
      { word: "Handvo", image: "/images/food/handvo.jpg" },
      { word: "Thepla", image: "/images/food/thepla.jpg" },
    ],
    impostorHints: ["Steamed yellow spongy cake", "Tempered mustard green chilli", "Tangy sweet juicy bite", "Gujarati savory snack", "Gram flour squares"]
  },
  {
    category: 'food',
    word: "Bhelpuri",
    image: "/images/food/bhelpuri.jpg",
    impostorWords: [
      { word: "Sev Puri", image: "/images/food/sev_puri.jpg" },
      { word: "Pani Puri", image: "/images/food/pani_puri.jpg" },
      { word: "Chaat", image: "/images/food/chaat.jpg" },
      { word: "Jhalmuri", image: "/images/food/jhalmuri.jpg" },
    ],
    impostorHints: ["Puffed rice tangy snack", "Tamarind sweet chutney drizzle", "Crispy sev and onions", "Mumbai beach chaat"]
  },
  {
    category: 'food',
    word: "Poha",
    image: "/images/food/poha.jpg",
    impostorWords: [
      { word: "Upma", image: "/images/food/upma.jpg" },
      { word: "Khichdi", image: "/images/food/khichdi.jpg" },
      { word: "Sabudana Khichdi", image: "/images/food/sabudana_khichdi.jpg" },
      { word: "Vermicelli", image: "/images/food/vermicelli.jpg" },
    ],
    impostorHints: ["Flattened rice flakes", "Turmeric yellow color", "Fried crunchy peanuts", "Finely chopped onions", "Morning breakfast bowl"]
  },
  {
    category: 'food',
    word: "Vada Pav",
    image: "/images/food/vada_pav.jpg",
    impostorWords: [
      { word: "Pav Bhaji", image: "/images/food/pav_bhaji.jpg" },
      { word: "Samosa Pav", image: "/images/food/samosa_pav.jpg" },
      { word: "Burger", image: "/images/food/burger.jpg" },
      { word: "Misal Pav", image: "/images/food/misal_pav.jpg" },
    ],
    impostorHints: ["Fried spiced potato dumpling", "Soft pillowy bread bun", "Spicy garlic red chutney", "Fried green chilli bite", "Mumbai burger snack"]
  },
  {
    category: 'food',
    word: "Lassi",
    image: "/images/food/lassi.jpg",
    impostorWords: [
      { word: "Chaas", image: "/images/food/chaas.jpg" },
      { word: "Milkshake", image: "/images/food/milkshake.jpg" },
      { word: "Smoothie", image: "/images/food/smoothie.jpg" },
      { word: "Kefir", image: "/images/food/kefir.jpg" },
    ],
    impostorHints: ["Thick sweet yogurt drink", "Topped with clotted malai", "Chilled tall brass glass", "Flavored with rose mango", "Summer thirst cooler"]
  },
  {
    category: 'food',
    word: "Chai",
    image: "/images/food/chai.jpg",
    impostorWords: [
      { word: "Green Tea", image: "/images/food/green_tea.jpg" },
      { word: "Filter Coffee", image: "/images/food/filter_coffee.jpg" },
      { word: "Milk Tea", image: "/images/food/milk_tea.jpg" },
      { word: "Kahwa", image: "/images/food/kahwa.jpg" },
    ],
    impostorHints: ["Brewed milk black tea", "Crushed ginger cardamom spice", "Street stall clay cup", "Morning waking up sip", "Steaming hot brew"]
  },
  {
    category: 'food',
    word: "Pakora",
    image: "/images/food/pakora.jpg",
    impostorWords: [
      { word: "Bhaji", image: "/images/food/bhaji.jpg" },
      { word: "Tempura", image: "/images/food/tempura.jpg" },
      { word: "Samosa", image: "/images/food/samosa.jpg" },
      { word: "Falafel", image: "/images/food/falafel.jpg" },
    ],
    impostorHints: ["Gram flour battered fritters", "Crispy deep fried crunch", "Onion potato filling", "Rainy monsoon tea snack", "Mint chutney dipping"]
  },
  {
    category: 'food',
    word: "Momos",
    image: "/images/food/momos.jpg",
    impostorWords: [
      { word: "Dumplings", image: "/images/food/dumplings.jpg" },
      { word: "Dim Sum", image: "/images/food/dim_sum.jpg" },
      { word: "Wonton", image: "/images/food/wonton.jpg" },
      { word: "Gyoza", image: "/images/food/gyoza.jpg" },
    ],
    impostorHints: ["Steamed flour dumplings", "Fiery spicy red chutney", "Tibetan street food pouch", "Vegetable or chicken stuffing"]
  },
  {
    category: 'food',
    word: "Pizza",
    image: "/images/food/pizza.jpg",
    impostorWords: [
      { word: "Calzone", image: "/images/food/calzone.jpg" },
      { word: "Flatbread", image: "/images/food/flatbread.jpg" },
      { word: "Focaccia", image: "/images/food/focaccia.jpg" },
      { word: "Lasagna", image: "/images/food/lasagna.jpg" },
    ],
    impostorHints: ["Cheese", "Slice", "Oven", "Toppings", "Round", "Italian"]
  },
  {
    category: 'food',
    word: "Burger",
    image: "/images/food/burger.jpg",
    impostorWords: [
      { word: "Sandwich", image: "/images/food/sandwich.jpg" },
      { word: "Hot Dog", image: "/images/food/hot_dog.jpg" },
      { word: "Vada Pav", image: "/images/food/vada_pav.jpg" },
      { word: "Submarine Roll", image: "/images/food/submarine_roll.jpg" },
    ],
    impostorHints: ["Grilled patty in split bun", "Layered lettuce and cheese", "Fast food hand sandwich", "Served with French fries"]
  },
  {
    category: 'food',
    word: "Pasta",
    image: "/images/food/pasta.jpg",
    impostorWords: [
      { word: "Noodles", image: "/images/food/noodles.jpg" },
      { word: "Lasagna", image: "/images/food/lasagna.jpg" },
      { word: "Ravioli", image: "/images/food/ravioli.jpg" },
      { word: "Macaroni", image: "/images/food/macaroni.jpg" },
    ],
    impostorHints: ["Boiled durum wheat shapes", "Rich tomato or creamy sauce", "Italian penne or spaghetti", "Grated parmesan topping"]
  },
  {
    category: 'food',
    word: "Noodles",
    image: "/images/food/noodles.jpg",
    impostorWords: [
      { word: "Pasta", image: "/images/food/pasta.jpg" },
      { word: "Ramen", image: "/images/food/ramen.jpg" },
      { word: "Spaghetti", image: "/images/food/spaghetti.jpg" },
      { word: "Chow Mein", image: "/images/food/chow_mein.jpg" },
    ],
    impostorHints: ["Long boiled dough strands", "Wok-tossed stir fry", "Soy sauce and veggies", "Slurped with chopsticks"]
  },
  {
    category: 'food',
    word: "Manchurian",
    image: "/images/food/manchurian.jpg",
    impostorWords: [
      { word: "Chilli Paneer", image: "/images/food/chilli_paneer.jpg" },
      { word: "Fried Rice", image: "/images/food/fried_rice.jpg" },
      { word: "Hakka Noodles", image: "/images/food/hakka_noodles.jpg" },
      { word: "Spring Roll", image: "/images/food/spring_roll.jpg" },
    ],
    impostorHints: ["Crispy battered veggie balls", "Garlicky soy gravy", "Indo-Chinese favorite", "Fried starter dish"]
  },
  {
    category: 'food',
    word: "Shawarma",
    image: "/images/food/shawarma.jpg",
    impostorWords: [
      { word: "Falafel Wrap", image: "/images/food/falafel_wrap.jpg" },
      { word: "Kathi Roll", image: "/images/food/kathi_roll.jpg" },
      { word: "Burrito", image: "/images/food/burrito.jpg" },
      { word: "Gyro", image: "/images/food/gyro.jpg" },
    ],
    impostorHints: ["Spiced meat carved from spit", "Wrapped in thin pita roll", "Garlic sauce and pickles", "Middle Eastern street roll"]
  },
  {
    category: 'food',
    word: "Kheer",
    image: "/images/food/kheer.jpg",
    impostorWords: [
      { word: "Phirni", image: "/images/food/phirni.jpg" },
      { word: "Payasam", image: "/images/food/payasam.jpg" },
      { word: "Rice Pudding", image: "/images/food/rice_pudding.jpg" },
      { word: "Rabri", image: "/images/food/rabri.jpg" },
    ],
    impostorHints: ["Simmered rice milk pudding", "Sweetened with cardamom sugar", "Chilled festive bowl", "Garnished with dry fruits", "Traditional dessert"]
  },
  {
    category: 'food',
    word: "Halwa",
    image: "/images/food/halwa.jpg",
    impostorWords: [
      { word: "Sheera", image: "/images/food/sheera.jpg" },
      { word: "Laddoo", image: "/images/food/laddoo.jpg" },
      { word: "Barfi", image: "/images/food/barfi.jpg" },
      { word: "Kheer", image: "/images/food/kheer.jpg" },
    ],
    impostorHints: ["Rich semolina pudding", "Roasted golden in pure ghee", "Garnished with sliced almonds", "Warm sweet bowl", "Festive kitchen aroma"]
  },
  {
    category: 'food',
    word: "Kulfi",
    image: "/images/food/kulfi.jpg",
    impostorWords: [
      { word: "Ice Cream", image: "/images/food/ice_cream.jpg" },
      { word: "Popsicle", image: "/images/food/popsicle.jpg" },
      { word: "Gelato", image: "/images/food/gelato.jpg" },
      { word: "Falooda", image: "/images/food/falooda.jpg" },
    ],
    impostorHints: ["Dense frozen dairy dessert", "Flavored with pistachio saffron", "Served on wooden stick", "Traditional clay matka", "Slow melted sweet treat"]
  },
  {
    category: 'food',
    word: "Misal Pav",
    image: "/images/food/misal_pav.jpg",
    impostorWords: [
      { word: "Pav Bhaji", image: "/images/food/pav_bhaji.jpg" },
      { word: "Usal", image: "/images/food/usal.jpg" },
      { word: "Vada Pav", image: "/images/food/vada_pav.jpg" },
      { word: "Chole Bhature", image: "/images/food/chole_bhature.jpg" },
    ],
    impostorHints: ["Spicy sprouted curry", "Crunchy farsan topping", "Served with buttered bread", "Fiery Maharashtrian breakfast"]
  },
  {
    category: 'food',
    word: "Uttapam",
    image: "/images/food/uttapam.jpg",
    impostorWords: [
      { word: "Dosa", image: "/images/food/dosa.jpg" },
      { word: "Pancake", image: "/images/food/pancake.jpg" },
      { word: "Idli", image: "/images/food/idli.jpg" },
      { word: "Appam", image: "/images/food/appam.jpg" },
    ],
    impostorHints: ["Thick savory pancake", "Topped with onions and tomatoes", "South Indian fermented batter", "Griddle roasted thick dosa"]
  },
  {
    category: 'food',
    word: "Spring Roll",
    image: "/images/food/spring_roll.jpg",
    impostorWords: [
      { word: "Samosa", image: "/images/food/samosa.jpg" },
      { word: "Egg Roll", image: "/images/food/egg_roll.jpg" },
      { word: "Momos", image: "/images/food/momos.jpg" },
      { word: "Wonton", image: "/images/food/wonton.jpg" },
    ],
    impostorHints: ["Crispy golden fried wrapper", "Shredded vegetable filling", "Served with sweet chili dip", "Crunchy Asian appetizer"]
  },
];
