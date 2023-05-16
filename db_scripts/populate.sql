# Do not change the order or names of states 
#(the code is assuming specific IDs and names)
# You can add more in the end
insert into game_state (gst_state) values ('Waiting');
insert into game_state (gst_state) values ('Started');
insert into game_state (gst_state) values ('Finished');
insert into game_state (gst_state) values ('Canceled');

# Do not change the order, but you can add more in the end
insert into user_game_state (ugst_state) values ('Waiting');
insert into user_game_state (ugst_state) values ('Playing');
insert into user_game_state (ugst_state) values ('Score');
insert into user_game_state (ugst_state) values ('End');

# Possible end game states
insert into scoreboard_state (sbs_state) values ('Tied');
insert into scoreboard_state (sbs_state) values ('Lost');
insert into scoreboard_state (sbs_state) values ('Won');


#---	NEW		---

# Positions
insert into board_positions (bp_id, bp_obstruct) values (0, 0);
insert into board_positions (bp_id, bp_obstruct) values (1, 1);
insert into board_positions (bp_id, bp_obstruct) values (2, 1);
insert into board_positions (bp_id, bp_obstruct) values (3, 1);
insert into board_positions (bp_id, bp_obstruct) values (4, 1);
insert into board_positions (bp_id, bp_obstruct) values (5, 1);
insert into board_positions (bp_id, bp_obstruct) values (6, 1);


# Buildings
#Main Building
insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (0, 0, 100, "Castle", "Its the main building, gives +1 to everything", 1);

# Damage Modifier
insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (3, 5, 15, "Blacksmith 1", "Gives +1 to damage", 1);
insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (3, 5, 20, "Blacksmith 2", "Gives +2 to damage", 2);
insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (3, 5, 25, "Blacksmith 3", "Gives +3 to damage", 3);

# Action Points Modifier
insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (2, 6, 15, "Tavern 1", "Gives +1 to AP", 1);
insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (2, 6, 20, "Tavern 2", "Gives +2 to AP", 2);
insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (2, 6, 25, "Tavern 3", "Gives +3 to AP", 3);

# Resource Points Modifier
insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (3, 3, 15, "Farm 1", "Gives +1 to RP", 1);
insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (3, 3, 15, "Farm 2", "Gives +2 to RP", 2);
insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (3, 3, 15, "Farm 3", "Gives +3 to RP", 3);

# Player vs Player information
INSERT INTO user VALUES (1,'me','$2b$10$Wemfac2wY/7RSCdKxuYUL.GV2clfhXC66OL76uCpDFUmpYZ/bGZtW','48MnTVJ6sKIvanVHbP5Vx5rysbYrVN4EbYmk4D8xESdfm1hx8jDfNFZGNw9OZs'),(2,'me2','$2b$10$6j2xIDnnxv.TLfBSstbbO.qE7wFTf5envx/uijiFjCP3slsy7EE4K','dQ7NrsbPsuF81xFGNioR1K0tiYkjtxOhemcgMhuFIS68VrFUC9gggm3JCgzkqe');
INSERT INTO game VALUES (1,1,2);
INSERT INTO user_game VALUES (1,1,1,1,2),(2,1,2,1,1);

# Cards
insert into card (crd_AP_cost, crd_RP_cost, crd_name, crd_effect, crd_note) values (1, 0, "Attack 1", "Deal 5 damage", null);
insert into card (crd_AP_cost, crd_RP_cost, crd_name, crd_effect, crd_note) values (3, 0, "Attack 2", "Deal 15 damage", null);
insert into card (crd_AP_cost, crd_RP_cost, crd_name, crd_effect, crd_note) values (0, 0, "Attack 3", "Deal 2 damage", null);

#Stats from the board
insert into board_stats (bs_attack, bs_regenAP, bs_ap, bs_regenRP, bs_rp, bs_user_game_id) values (1, 1, 3, 1, 1, 1);
insert into board_stats (bs_attack, bs_regenAP, bs_ap, bs_regenRP, bs_rp, bs_user_game_id) values (1, 1, 3, 1, 1, 2);
