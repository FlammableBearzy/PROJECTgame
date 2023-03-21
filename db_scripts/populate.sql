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

#
insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (0, 0, 100, "Castle", "Its the main building, gives +1 to everything", 1);

insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (3, 5, 15, "Blacksmith 1", "Gives +1 to damage", 1);
insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (3, 5, 20, "Blacksmith 2", "Gives +2 to damage", 2);
insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (3, 5, 25, "Blacksmith 3", "Gives +3 to damage", 3);

insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (2, 6, 15, "Tavren 1", "Gives +1 to AP", 1);
insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (2, 6, 20, "Tavren 2", "Gives +2 to AP", 2);
insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (2, 6, 25, "Tavren 3", "Gives +3 to AP", 3);

insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (3, 3, 15, "Farm 1", "Gives +1 to RP", 1);
insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (3, 3, 15, "Farm 2", "Gives +2 to RP", 2);
insert into building (build_ap, build_rp, build_hp, build_name, build_effect, build_level) values (3, 3, 15, "Farm 3", "Gives +3 to RP", 3);


INSERT INTO user VALUES (1,'me','$2b$10$Wemfac2wY/7RSCdKxuYUL.GV2clfhXC66OL76uCpDFUmpYZ/bGZtW','48MnTVJ6sKIvanVHbP5Vx5rysbYrVN4EbYmk4D8xESdfm1hx8jDfNFZGNw9OZs'),(2,'me2','$2b$10$6j2xIDnnxv.TLfBSstbbO.qE7wFTf5envx/uijiFjCP3slsy7EE4K','dQ7NrsbPsuF81xFGNioR1K0tiYkjtxOhemcgMhuFIS68VrFUC9gggm3JCgzkqe');
INSERT INTO game VALUES (1,1,2);
INSERT INTO user_game VALUES (1,1,1,2),(2,2,1,1);

# insert into board_building values (8, 0, 1, 2), (9, 1, null, 2), (10, 2, 3, 2), (11, 3, 4, 2), (12, 4, 1, 2), (13, 5, null, 2), (14, 6, null, 2);

