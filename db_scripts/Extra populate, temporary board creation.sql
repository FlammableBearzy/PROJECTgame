#Game Start
insert into board_building values (1, 0, 1, 1);
insert into board_building values (2, 0, 1, 2);

#Player Buildings
insert into board_building values (3, 1, 3, 1);
insert into board_building values (4, 2, 5, 1);
insert into board_building values (5, 3, 7, 1);
insert into board_building values (6, 4, 2, 1);
insert into board_building values (7, 5, 3, 1);
insert into board_building values (8, 6, 4, 1);
#Opponent Buildings
insert into board_building values (9, 0, 4, 2);
insert into board_building values (10, 0, 7, 2);
insert into board_building values (11, 0, 10, 2);
insert into board_building values (12, 0, 6, 2);

#select * from building inner join board_building on bb_build_id = build_id where bb_user_game_id = 1 or bb_user_game_id = 2;

#select * from building;