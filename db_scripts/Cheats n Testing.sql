#SET SQL_SAFE_UPDATES = 0;
#update building inner join board_building on bb_build_id = build_id set build_hp = 100 where build_name = "Castle" and bb_user_game_id = 1;
#SET SQL_SAFE_UPDATES = 1;

#update board_building inner join building on build_id = bb_build_id set bb_build_hp = bb_build_hp - 5 where build_name = "Castle" and bb_user_game_id = 2;
#select * from board_building inner join building on build_id = bb_build_id where bb_pos = 0 and bb_user_game_id = 1;
#select * from board_stats where bs_user_game_id = 1;
#select *  from board_building where bb_build_id = 1 and bb_build_hp = 0 and (bb_user_game_id = 1 or bb_user_game_id = 2);

update board_building set bb_build_hp = 5 where bb_user_game_id = 2 and bb_build_id = 1;
select * from board_building where bb_user_game_id = 2 and bb_build_id = 1;