function GameData() {
	this.rawMapData =
	{
		"room": [
		         [2,2,2,2,1,2,2,2,2,2,2,2,2,2],
		         [2,0,0,0,6,3,5,2,4,0,0,0,0,1],
		         [2,3,2,2,2,2,2,2,2,3,2,2,2,2],
		         [2,0,0,0,0,2,5,3,0,0,0,3,0,2],
		         [2,2,2,2,0,2,2,2,0,2,0,2,0,2],
		         [1,0,4,2,0,3,0,0,0,2,0,2,0,2],
		         [2,0,2,2,0,2,2,2,2,2,0,2,0,2],
		         [2,0,3,0,0,2,5,3,0,0,0,2,0,2],
		         [2,2,2,2,2,2,2,2,2,2,2,2,1,2]
		     ],
		 "monsters": [
		 		{ "id": 1, "type": "mele", "col":11, "row":3 },
		 		{ "id": 2, "type": "mele", "col":9, "row":2 },
		 		{ "id": 3, "type": "mele", "col":5, "row":1 },
		 		{ "id": 4, "type": "mele", "col":1, "row":2 },
		 		{ "id": 5, "type": "mele", "col":5, "row":5 },
		 		{ "id": 6, "type": "mele", "col":7, "row":3 },
		 		{ "id": 7, "type": "mele", "col":7, "row":7 },
		 		{ "id": 8, "type": "mele", "col":2, "row":7 }
		 	],
		 "npcs": [
		 		{ "id": 1, "type": "npc", "col":8, "row":1 },
		 		{ "id": 2, "type": "npc", "col":2, "row":5 }
		 	],
		 "quests": [
		            [
		             {
		            	 "questID": 1, "monsterID":1,
		            	 "type": "kill_monster", "col":11, "row":3, 
		            	 "reward": {"exp": 100, "gold": 100}
		             }
		            ],
		            [
		             {
		            	 "questID": 2, "item_name": "stick lvl 2",
		            	 "type": "find_item", "item_id": 10,
		            	 "reward": {"exp": 50, "gold": 200 }
		             }
		            ]
		  ],
		  "items_in_room": [
		  	{ "id":1, "col": 6, "row":7 }, 
		  	{ "id": 6, "col": 6, "row":3 }, 
		  	{ "id": 10, "col": 6, "row":1 }
		  ],
		  "system": 
		  [
		    [
		        null,
		        null,
		        null,
		        {
		            "type": "gate",
		            "col": 3,
		            "row": 0,
		            "id":0
		        },
		        null,
		        null,
		        null
		    ],
		    [
		        null,
		        null,
		        null,
		        {
		            "type": "room",
		            "col": 3,
		            "row": 1,
		            "id":1
		        },
		        null,
		        null,
		        null
		    ],
		    [
		        null,
		        null,
		        null,
		        {
		            "type": "room",
		            "col": 3,
		            "row": 2,
		            "id":2
		        },
		        null,
		        null,
		        {
		            "type": "gate",
		            "col": 6,
		            "row": 2,
		            "id":3
		        }
		    ],
		    [
		        null,
		        null,
		        null,
		        {
		            "type": "center",
		            "col": 3,
		            "row": 3,
		            "id":4
		        },
		        {
		            "type": "room",
		            "col": 4,
		            "row": 3,
		            "id":5
		        },
		        {
		            "type": "room",
		            "col": 5,
		            "row": 3,
		            "id":6
		        },
		        {
		            "type": "room",
		            "col": 6,
		            "row": 3,
		            "id":7
		        }
		    ],
		    [
		        {
		            "type": "gate",
		            "col": 0,
		            "row": 4,
		            "id":8
		        },
		        {
		            "type": "room",
		            "col": 1,
		            "row": 4,
		            "id":9
		        },
		        {
		            "type": "room",
		            "col": 2,
		            "row": 4,
		            "id":10
		        },
		        {
		            "type": "room",
		            "col": 3,
		            "row": 4,
		            "id":11
		        },
		        null,
		        null,
		        null
		    ],
		    [
		        null,
		        null,
		        null,
		        {
		            "type": "room",
		            "col": 3,
		            "row": 5,
		            "id":12
		        },
		        null,
		        null,
		        null
		    ],
		    [
		        null,
		        null,
		        null,
		        {
		            "type": "gate",
		            "col": 3,
		            "row": 6,
		            "id":13
		        },
		        null,
		        null,
		        null
		    ]
		]
	}
}