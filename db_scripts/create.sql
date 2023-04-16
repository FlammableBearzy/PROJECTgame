#DROP DATABASE mygame;

create database mygame;

use mygame;

create table user (
    usr_id int not null auto_increment,
    usr_name varchar(60) not null,
    usr_pass varchar(200) not null, 
    usr_token varchar(200),
    primary key (usr_id));

create table game (
    gm_id int not null auto_increment,
    gm_turn int not null default 1,
    gm_state_id int not null,
    primary key (gm_id));

create table game_state (
    gst_id int not null auto_increment,
    gst_state varchar(60) not null,
    primary key (gst_id));

create table user_game (
    ug_id int not null auto_increment,
    ug_order int,
    ug_user_id int not null,
    ug_game_id int not null,
    ug_state_id int not null,
    primary key (ug_id));

create table user_game_state (
    ugst_id int not null auto_increment,
    ugst_state varchar(60) not null,
    primary key (ugst_id));


create table scoreboard (
    sb_id int not null auto_increment,
    sb_user_game_id int not null,
    sb_state_id int not null,
    sb_points int not null,
    primary key (sb_id));

 create table scoreboard_state (
    sbs_id int not null auto_increment,
    sbs_state varchar(60) not null,
    primary key (sbs_id));

#---	NEW		---
#--- Buildings
create table building (
	build_id int not null auto_increment,
    build_ap int not null,
    build_rp int not null,
    build_hp int not null,
    build_name varchar(50) not null,
    build_effect varchar(150) not null,
    build_level int not null,
    primary key (build_id)
);

create table board_building (
	bb_id int not null auto_increment,
    bb_pos int not null, #need to make this a "not null". ill also need to change the populate for it to not have Null values.
    bb_build_id int not null,
    bb_user_game_id int not null,
    primary key (bb_id)
);

create table board_positions (
bp_id int not null,
primary key (bp_id)
);


#--- Cards
create table card (
crd_id int not null auto_increment,
crd_AP_cost int not null,
crd_RP_cost int not null,
crd_name varchar(50) not null,
crd_effect varchar(200) not null,
primary key (crd_id)
);

create table user_game_card (
ugc_id int not null auto_increment,
ugc_user_game_id int not null,
ugc_crd_id int not null,
ugc_active tinyint(1) not null,
primary key (ugc_id)
);

#Need to make a card to building interaction
#create table card_board_building (
#cbb_id int not null auto_increment,
#
#
#
#
#);

# Foreign Keys1

alter table game add constraint game_fk_match_state
            foreign key (gm_state_id) references game_state(gst_id) 
			ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table user_game add constraint user_game_fk_user
            foreign key (ug_user_id) references user(usr_id) 
			ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table user_game add constraint user_game_fk_game
            foreign key (ug_game_id) references game(gm_id) 
			ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table user_game add constraint user_game_fk_user_game_state
            foreign key (ug_state_id) references user_game_state(ugst_id) 
			ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table scoreboard add constraint scoreboard_fk_user_game
            foreign key (sb_user_game_id) references user_game(ug_id) 
			ON DELETE NO ACTION ON UPDATE NO ACTION;  

alter table scoreboard add constraint scoreboard_fk_scoreboard_state
            foreign key (sb_state_id) references scoreboard_state(sbs_id) 
			ON DELETE NO ACTION ON UPDATE NO ACTION;  


#---	NEW		---

alter table board_building add constraint board_building_fk_building
			foreign key (bb_build_id) references building(build_id)
            ON DELETE NO ACTION ON UPDATE NO ACTION;
            
alter table board_building add constraint board_building_fk_user_game
			foreign key (bb_user_game_id) references user_game(ug_id)
            ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table board_building add constraint board_building_fk_board_positions
			foreign key (bb_pos) references board_positions(bp_id)
            ON DELETE NO ACTION ON UPDATE NO ACTION;
            
alter table user_game_card add constraint user_game_card_fk_user_game
            foreign key (ugc_user_game_id) references user_game(ug_id) 
			ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table user_game_card add constraint user_game_card_fk_card
            foreign key (ugc_crd_id) references card(crd_id) 
			ON DELETE NO ACTION ON UPDATE NO ACTION;

#alter table card add constraint card_fk_card_type
#            foreign key (crd_type_id) references card_type(ct_id) 
#			ON DELETE NO ACTION ON UPDATE NO ACTION;
            
            