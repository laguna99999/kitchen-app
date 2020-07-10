const CLASS = ['green-darker', 'success', 'warning', 'danger'];

let all_items = [
    {
        "id":1,
        "picture":"item_1",
        "name":"Tofu",
        "ingredients":[
            "Eggs",
            "Salt"
        ],
        "recipe":"Ex Lorem excepteur labore fugiat officia. Aliquip commodo voluptate exercitation eu magna. Reprehenderit eiusmod laborum deserunt deserunt. Et ea quis est velit. Labore incididunt magna aliquip laborum deserunt sint labore. Nisi culpa magna aute pariatur aute.\r\n",
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
        "recipe":"Minim nulla reprehenderit dolor dolore incididunt ex nisi consectetur qui id dolore ex ex sint. Incididunt mollit aliqua pariatur amet dolor. Enim laboris occaecat ea ullamco ea excepteur esse.\r\n",
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
        "recipe":"Sunt officia magna nulla ipsum quis duis amet elit eiusmod. Pariatur veniam id aliquip pariatur incididunt id excepteur ullamco eiusmod sit. Mollit consectetur labore elit aute deserunt aute. Elit dolore commodo elit cillum irure Lorem non culpa tempor pariatur ut voluptate nisi qui. Dolore aute amet dolor velit aute commodo occaecat adipisicing incididunt adipisicing velit ipsum. Laboris est consequat cupidatat aliquip exercitation incididunt aliqua consequat exercitation occaecat. Deserunt Lorem laboris id non nulla fugiat eu ad.\r\n",
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
        "recipe":"Et ea sint occaecat aute ut pariatur cupidatat. Excepteur consequat tempor enim magna et culpa esse. Reprehenderit dolore dolor quis elit velit. Sunt tempor adipisicing qui laborum aliquip id dolore ipsum ad mollit cupidatat sint.\r\n",
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
        "recipe":"Qui dolor commodo laborum excepteur. Excepteur aliquip esse magna proident laboris id incididunt Lorem. Tempor ullamco enim ea tempor cillum veniam velit. Consequat incididunt nostrud culpa esse sunt eu exercitation culpa adipisicing ullamco proident. Ex ipsum ut veniam do. Proident veniam anim amet labore est est est non labore.\r\n",
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
        "recipe":"Sint consectetur anim exercitation amet officia deserunt Lorem consequat esse. Sit adipisicing velit id adipisicing amet dolor elit. Fugiat ea esse quis ea non ipsum laborum nisi sunt deserunt eiusmod incididunt. Aute dolor laborum ullamco quis ipsum consequat laboris. Laboris ad Lorem dolore et esse exercitation.\r\n",
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
        "recipe":"Esse eiusmod adipisicing laboris proident ipsum ut qui labore ut ea magna Lorem. Id labore exercitation pariatur officia ea nisi do ut. Voluptate nisi aliquip nostrud consectetur proident officia pariatur ipsum incididunt fugiat et duis ut. Consectetur nisi occaecat in voluptate incididunt laboris ut. Veniam id nostrud adipisicing adipisicing laboris officia Lorem irure occaecat consequat laboris eiusmod ad.\r\n",
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
        "recipe":"Enim magna ea pariatur culpa sint tempor reprehenderit sunt aute aliqua culpa labore consequat. Eiusmod quis laboris proident sit occaecat aliquip anim labore ad culpa exercitation id proident. Enim ea aliqua esse enim pariatur cupidatat ad reprehenderit laborum incididunt. Velit tempor occaecat veniam veniam. Adipisicing anim quis laboris fugiat anim incididunt officia sit.\r\n",
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
        "recipe":"Dolor amet qui ullamco sunt consectetur id. Occaecat consectetur Lorem ullamco officia reprehenderit minim deserunt minim aliquip nulla ipsum non id. Ipsum enim id esse est aute aliqua esse dolor eiusmod ipsum velit.\r\n",
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
        "recipe":"Consectetur occaecat Lorem et nulla. Dolore pariatur ad occaecat aliquip incididunt ex non officia nulla ut veniam. Ut anim non non velit voluptate voluptate eiusmod veniam ea sunt amet. Enim qui laboris esse consequat ut anim esse proident. Laboris qui labore veniam tempor. Tempor exercitation sunt fugiat nulla irure excepteur eiusmod minim magna fugiat dolor labore. Commodo velit incididunt dolor irure.\r\n",
        "best_serving_hours":1,
        "safety_level":25,
        "cooking_time":0.1,
        "maximum_amount":2000,
        "cooked_items":[
        ],
        "cooking_items": []
    }
]
