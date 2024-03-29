//ユーザテーブル
CREATE TABLE user_tbl(
    user_id         INT             AUTO_INCREMENT  ,
    user_name       VARCHAR(30)     NOT NULL        ,
    user_pass       VARCHAR(255)    NOT NULL        ,
    user_mail       VARCHAR(50)     NOT NULL        ,
    PRIMARY KEY     (user_id)
);

//予定テーブル
CREATE TABLE schedule_tbl(
    schedule_id     INT             AUTO_INCREMENT  ,
    schedule_name   VARCHAR(50)     NOT NULL        ,
    schedule_lat    VARCHAR(100)    NOT NULL        ,
    schedule_lng    VARCHAR(100)    NOT NULL        ,
    schedule_time   DATETIME        NOT NULL        ,
    emoticon_id     INT                             ,
    comment_id      INT                             ,
    icon_id         INT             NOT NULL        ,
    schedule_status VARCHAR(30)                     ,
    PRIMARY KEY     (schedule_id)                   ,
    FOREIGN KEY (icon_id) REFERENCES icon_tbl(icon_id)
);

//待ち合わせテーブル
CREATE TABLE appointment_tbl(
    appointment_id  INT             AUTO_INCREMENT  ,
    schedule_id     INT             NOT NULL        ,
    user_id         INT             NOT NULL        ,
    appointment_lat VARCHAR(100)    NOT NULL        ,
    appointment_lng VARCHAR(100)    NOT NULL        ,
    emoticon_id     INT                             ,
    comment_id      INT                             ,
    appointment_status VARCHAR(30)                     ,
    PRIMARY KEY     (appointment_id)                ,
    FOREIGN KEY (schedule_id) REFERENCES schedule_tbl(schedule_id),
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id)
);

//フレンドテーブル
CREATE TABLE friend_tbl(
    friend_id       INT             AUTO_INCREMENT  ,
    follow_id       INT             NOT NULL        ,
    follower_id     INT             NOT NULL        ,
    friend_status   VARCHAR(20)                     ,
    PRIMARY KEY     (friend_id)                     
);


//顔文字テーブル
CREATE TABLE emoticon_tbl(
    emoticon_id     INT             AUTO_INCREMENT  ,
    emoticon_detail VARCHAR(200)    NOT NULL        ,
    PRIMARY KEY     (emoticon_id)
);


//コメントテーブル
CREATE TABLE comment_tbl(
    comment_id      INT             AUTO_INCREMENT  ,
    comment_detail  VARCHAR(200)    NOT NULL        ,
    PRIMARY KEY     (comment_id)
);


//アイコンテーブル
CREATE TABLE icon_tbl(
    icon_id         INT             AUTO_INCREMENT  ,
    icon_detail     VARCHAR(200)    NOT NULL        ,
    PRIMARY KEY     (icon_id)
);

//チャットテーブル
CREATE TABLE chat_tbl(
chat_id         INT             AUTO_INCREMENT  ,
appointment_id  INT                             ,
user_id         INT                             ,
comment_id      INT             NOT NULL        ,
PRIMARY KEY     (chat_id)                ,
FOREIGN KEY (appointment_id) REFERENCES appointment_tbl(appointment_id),
FOREIGN KEY (user_id) REFERENCES user_tbl(user_id)
);

SELECT A.appointment_id,A.user_id,A.schedule_id,A.appointment_status,S.schedule_status
FROM appointment_tbl AS A LEFT OUTER JOIN schedule_tbl AS S
ON A.schedule_id = S.schedule_id
WHERE A.user_id =  AND S.schedule_status = '未完了';