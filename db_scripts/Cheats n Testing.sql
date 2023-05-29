
#update board_building inner join building on build_id = bb_build_id set bb_build_hp = bb_build_hp - 5 where build_name = "Castle" and bb_user_game_id = 2;
#select * from board_building inner join building on build_id = bb_build_id where bb_pos = 0 and bb_user_game_id = 1;
#select * from board_stats where bs_user_game_id = 1;
#select *  from board_building where bb_build_id = 1 and bb_build_hp = 0 and (bb_user_game_id = 1 or bb_user_game_id = 2);

#update board_building set bb_build_hp = 5 where bb_user_game_id = 2 and bb_build_id = 1;
#select * from board_building where bb_build_id = 1 and bb_build_hp = 0 and (bb_user_game_id = 1 or bb_user_game_id = 2);
#use mygame;

#select * from board_stats;
#select * from building inner join board_building on bb_build_id = build_id where (bb_user_game_id = 1 or bb_user_game_id = 2) and bb_id = 1;

#update board_stats set bs_ap = bs_ap + bs_regenAP where bs_user_game_id = 1;

#select * from board_building;

use mygame;
update board_building inner join building on build_id = bb_build_id set bb_build_hp = 22 where bb_pos = 1 and bb_user_game_id = 1;

select * from building inner join board_building on bb_build_id = build_id where bb_user_game_id = 1 or bb_user_game_id = 2;