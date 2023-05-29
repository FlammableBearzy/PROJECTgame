#Game Start
insert into board_building values (1, 0, 1, 150, 1);
insert into board_building values (2, 0, 1, 150, 2);

#Player Buildings
insert into board_building values (3, 1, 3, 30, 1);
insert into board_building values (4, 2, 3, 30, 1);
insert into board_building values (5, 3, 4, 50, 1);
insert into board_building values (6, 4, 5, 30, 1);
insert into board_building values (7, 5, 6, 40, 1);
insert into board_building values (8, 6, 8, 50, 1);
#Opponent Buildings
insert into board_building values (9, 1, 3, 30, 2);
insert into board_building values (10, 2, 3, 30, 2);
insert into board_building values (11, 3, 4, 50, 2);
insert into board_building values (12, 4, 5, 30, 2);
insert into board_building values (13, 5, 6, 40, 2);
insert into board_building values (14, 6, 8, 50, 2);
select * from building inner join board_building on bb_build_id = build_id where bb_user_game_id = 1 or bb_user_game_id = 2;

#select * from building;