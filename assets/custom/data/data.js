const CLASS = ['green-darker', 'success', 'warning', 'danger'];

let global_history = [];

let all_items = [
    {
        "id":1,
        "picture":"item_1",
        "name":"Tofu",
        "ingredients":[
            "Eggs",
            "Salt"
        ],
        "recipe":"Labore incididunt magna aliquip laborum deserunt sint labore. Nisi culpa magna aute pariatur aute.\r\n",
        "best_serving_hours":3,
        "safety_level":25,
        "cooking_time":0.5,
        "maximum_amount":2000,
        "cooked_items":[
        ],
        "cooking_items": []
    },
    {
        "id":2,
        "picture":"item_2",
        "name":"Tofu2",
        "ingredients":[
            "Butter",
            "Water",
            "honey"
        ],
        "recipe":"Enim laboris occaecat ea ullamco ea excepteur esse.\r\n",
        "best_serving_hours":3,
        "safety_level":20,
        "cooking_time":0.3,
        "maximum_amount":3000,
        "cooked_items":[
        ],
        "cooking_items": []
    },
    {
        "id":3,
        "picture":"item_3",
        "name":"Read bean soup",
        "ingredients":[
            "Sugar",
            "Yeast"
        ],
        "recipe":"Laboris est consequat cupidatat aliquip exercitation incididunt aliqua consequat exercitation occaecat. Deserunt Lorem laboris id non nulla fugiat eu ad.\r\n",
        "best_serving_hours":6,
        "safety_level":10,
        "cooking_time":0.2,
        "maximum_amount":4000,
        "cooked_items":[
        ],
        "cooking_items": []
    },
    {
        "id":4,
        "picture":"item_4",
        "name":"Boba pearl",
        "ingredients":[
            "Butter",
            "Eggs"
        ],
        "recipe":"Sunt tempor adipisicing qui laborum aliquip id dolore ipsum ad mollit cupidatat sint.\r\n",
        "best_serving_hours":2,
        "safety_level":30,
        "cooking_time":0.1,
        "maximum_amount":1000,
        "cooked_items":[
        ],
        "cooking_items": []
    },
    {
        "id":5,
        "picture":"item_5",
        "name":"Boba pearl",
        "ingredients":[
            "Water",
            "Eggs",
            "honey"
        ],
        "recipe":"Consequat incididunt nostrud culpa esse sunt eu exercitation culpa adipisicing ullamco proident. Ex ipsum ut veniam do. Proident veniam anim amet labore est est est non labore.\r\n",
        "best_serving_hours":3,
        "safety_level":20,
        "cooking_time":0.5,
        "maximum_amount":3000,
        "cooked_items":[
        ],
        "cooking_items": []
    },
    {
        "id":6,
        "picture":"item_6",
        "name":"Coffee",
        "ingredients":[
            "Flour",
            "Eggs",
            "Water",
            "Sugar"
        ],
        "recipe":"Fugiat ea esse quis ea non ipsum laborum nisi sunt deserunt eiusmod incididunt. Aute dolor laborum ullamco quis ipsum consequat laboris. Laboris ad Lorem dolore et esse exercitation.\r\n",
        "best_serving_hours":1,
        "safety_level":30,
        "cooking_time":0.1,
        "maximum_amount":2000,
        "cooked_items":[
        ],
        "cooking_items": []
    },
    {
        "id":7,
        "picture":"item_7",
        "name":"Coffee",
        "ingredients":[
            "Salt",
            "Water"
        ],
        "recipe":"Veniam id nostrud adipisicing adipisicing laboris officia Lorem irure occaecat consequat laboris eiusmod ad.\r\n",
        "best_serving_hours":4,
        "safety_level":25,
        "cooking_time":0.2,
        "maximum_amount":1000,
        "cooked_items":[
        ],
        "cooking_items": []
    },
    {
        "id":8,
        "picture":"item_8",
        "name":"Grass jelly",
        "ingredients":[
            "Eggs",
            "Butter"
        ],
        "recipe":"Enim ea aliqua esse enim pariatur cupidatat ad reprehenderit laborum incididunt. Velit tempor occaecat veniam veniam. Adipisicing anim quis laboris fugiat anim incididunt officia sit.\r\n",
        "best_serving_hours":3,
        "safety_level":20,
        "cooking_time":0.3,
        "maximum_amount":500,
        "cooked_items":[
        ],
        "cooking_items": []
    },
    {
        "id":9,
        "picture":"item_9",
        "name":"Mochi",
        "ingredients":[
            "Yeast",
            "Butter"
        ],
        "recipe":"Ipsum enim id esse est aute aliqua esse dolor eiusmod ipsum velit.\r\n",
        "best_serving_hours":6,
        "safety_level":20,
        "cooking_time":0.5,
        "maximum_amount":3000,
        "cooked_items":[
        ],
        "cooking_items": []
    },
    {
        "id":10,
        "picture":"item_10",
        "name":"Boba pearl",
        "ingredients":[
            "honey",
            "Salt"
        ],
        "recipe":"Laboris qui labore veniam tempor. Tempor exercitation sunt fugiat nulla irure excepteur eiusmod minim magna fugiat dolor labore. Commodo velit incididunt dolor irure.\r\n",
        "best_serving_hours":1,
        "safety_level":25,
        "cooking_time":0.1,
        "maximum_amount":2000,
        "cooked_items":[
        ],
        "cooking_items": []
    }
]

let raw_materials = [
  {
    "id": 7123,
    "name": "Rice",
    "description": "In officia laboris veniam voluptate incididunt cillum exercitation minim anim consequat. Ut Lorem nisi fugiat incididunt consequat aliquip voluptate. Ex nulla labore anim cupidatat consectetur magna in tempor nisi ea nostrud mollit Lorem. Dolor anim eu nulla proident. Et eu in deserunt consectetur esse qui proident velit irure magna elit dolore mollit pariatur.\r\n",
    "history": []
  },
  {
    "id": 8391,
    "name": "Meat",
    "description": "Duis enim anim nulla tempor ut officia magna ea. Quis sint elit Lorem reprehenderit commodo esse nulla adipisicing do eu voluptate id et. Est nisi pariatur eu eiusmod fugiat est occaecat labore mollit labore.\r\n",
    "history": []
  },
  {
    "id": 4924,
    "name": "Radish",
    "description": "Cupidatat consequat elit veniam in exercitation excepteur aliquip elit. Ad ea ad do ullamco incididunt aute aliqua. Nisi exercitation ullamco dolore quis consectetur pariatur. Non consequat officia pariatur cillum ex aliqua in consequat occaecat. Pariatur mollit non voluptate occaecat. Laborum ex in id quis cillum anim deserunt velit quis proident.\r\n",
    "history": []
  },
  {
    "id": 9272,
    "name": "Rice",
    "description": "Laborum non in sit ad eu laboris eiusmod minim laboris nulla dolore. Aliqua excepteur dolore dolore quis excepteur adipisicing laborum. Amet culpa veniam sit dolore sunt laboris culpa magna nisi magna. Velit exercitation velit aute irure ea laborum duis dolor minim sint.\r\n",
    "history": []
  },
  {
    "id": 6470,
    "name": "Beans",
    "description": "Irure ad duis eu deserunt aute eiusmod adipisicing esse consequat dolor labore sint aliquip proident. Nulla ullamco reprehenderit id ea mollit incididunt anim pariatur irure aute. Tempor irure do ipsum duis quis esse ut esse. Quis elit aliqua deserunt commodo aute reprehenderit laborum reprehenderit. Dolore qui do duis esse culpa nisi cillum. Proident aliqua incididunt elit pariatur aliqua cillum cillum amet consectetur in nulla officia mollit.\r\n",
    "history": []
  },
  {
    "id": 3971,
    "name": "Wheet",
    "description": "Ut deserunt adipisicing anim in eiusmod voluptate elit velit proident sit sunt cillum Lorem est. Nisi ad est mollit ea excepteur. Nisi laborum sit amet aute. Aliqua ex cillum excepteur nulla elit fugiat in do eu id.\r\n",
    "history": []
  },
  {
    "id": 6726,
    "name": "Radish",
    "description": "Id sint ex voluptate aliqua eu consectetur anim ex fugiat amet cillum in enim fugiat. Dolor reprehenderit enim fugiat ullamco velit proident. Id duis occaecat ad anim deserunt fugiat ex non amet tempor quis ullamco aliquip. Commodo ut et aliquip voluptate veniam ea culpa velit est labore proident ad. Cillum sint exercitation est et reprehenderit velit et deserunt adipisicing anim.\r\n",
    "history": []
  },
  {
    "id": 1374,
    "name": "Rice",
    "description": "Sint enim veniam consequat commodo exercitation tempor minim consequat amet et eiusmod cillum labore. Commodo nisi labore elit laborum quis laborum magna aliquip et veniam tempor cupidatat. Labore nostrud labore elit anim nulla sit amet deserunt pariatur commodo pariatur. Labore ullamco duis consequat sint eiusmod eiusmod magna commodo quis irure ex et.\r\n",
    "history": []
  },
  {
    "id": 9571,
    "name": "Milk",
    "description": "Excepteur ipsum nulla exercitation aliquip culpa sunt sint. Enim mollit proident elit ea ut minim consectetur velit fugiat. Et dolor qui in exercitation elit. Amet et id laborum ad officia do laborum nostrud sit sit qui tempor dolore nisi. Tempor tempor veniam fugiat non sint adipisicing aliqua. Nulla commodo est qui est duis irure elit pariatur fugiat et adipisicing. Proident enim laborum eu sit enim minim dolor consequat deserunt ut ex tempor.\r\n",
    "history": []
  },
  {
    "id": 1110,
    "name": "Flour",
    "description": "Commodo velit eu qui pariatur adipisicing cupidatat magna ea quis ex consectetur reprehenderit. Amet sint dolore irure laborum exercitation. Laborum ex id qui ea nisi mollit consequat ut Lorem qui sint proident.\r\n",
    "history": []
  },
  {
    "id": 1051,
    "name": "Flour",
    "description": "Labore id magna ex consectetur enim consequat. Minim occaecat ipsum exercitation duis excepteur pariatur quis nulla deserunt ex Lorem exercitation Lorem. Ipsum id laborum incididunt id id Lorem reprehenderit ut deserunt est irure.\r\n",
    "history": []
  },
  {
    "id": 2706,
    "name": "Rice",
    "description": "Laborum ipsum nisi consequat non pariatur sint et commodo pariatur cillum dolor. Voluptate commodo voluptate occaecat occaecat fugiat consectetur consectetur cupidatat non occaecat anim tempor. Minim consectetur ipsum amet laborum cupidatat voluptate esse. Laboris ea enim labore nostrud enim ea.\r\n",
    "history": []
  },
  {
    "id": 3683,
    "name": "Carrot",
    "description": "Consequat elit deserunt Lorem culpa. Magna excepteur aliquip reprehenderit eiusmod veniam sint anim quis velit cupidatat nostrud non. Ad irure veniam eiusmod ea. Quis voluptate ad pariatur nostrud aute nisi eiusmod amet officia tempor velit ad deserunt. Deserunt enim est enim consequat non incididunt duis ut aute et. Voluptate eiusmod aliqua aliquip cupidatat laboris excepteur officia.\r\n",
    "history": []
  },
  {
    "id": 2907,
    "name": "Wheet",
    "description": "Do fugiat commodo officia laborum adipisicing excepteur velit elit pariatur culpa minim. Ipsum exercitation culpa duis mollit excepteur anim voluptate incididunt esse est. Amet pariatur nisi incididunt elit in voluptate labore.\r\n",
    "history": []
  },
  {
    "id": 2394,
    "name": "Meat",
    "description": "Do pariatur ipsum eiusmod ad exercitation eu ad veniam laborum officia fugiat esse aliqua duis. Id aliqua sint ex ullamco adipisicing Lorem. Sit enim est amet exercitation dolore tempor ipsum velit. Enim anim do Lorem id anim tempor veniam nulla. Id anim laborum deserunt quis irure dolor. Et reprehenderit incididunt nulla mollit elit nisi veniam sit amet consectetur sunt deserunt non sit.\r\n",
    "history": []
  }
];
