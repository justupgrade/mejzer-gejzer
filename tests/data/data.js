function GameData() {
	this.rawMapData =
	{
		"room": [
		         [2,2,2,2,1,2,2,2,2,2,2,2,2,2],
		         [2,0,0,0,0,3,5,2,4,0,0,0,0,1],
		         [2,3,2,2,2,2,2,2,2,3,2,2,2,2],
		         [2,0,0,0,0,2,5,3,0,0,0,3,0,2],
		         [2,2,2,2,0,2,2,2,0,2,0,2,0,2],
		         [1,0,4,2,0,3,0,0,0,2,0,2,0,2],
		         [2,0,2,2,0,2,2,2,2,2,0,2,0,2],
		         [2,0,3,0,0,2,5,3,0,0,0,2,6,2],
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
		  ]
	}
}