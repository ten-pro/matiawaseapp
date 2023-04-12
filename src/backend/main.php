<?php

//CROSエラーの解消
header("Access-Control-Allow-Origin: *");
//JSON形式で返却すること、文字形式がUTF-8だということの宣言
header('Content-Type: application/json; charset=UTF-8');

//DAOの読み込み
require_once './LoginDAO.php';
require_once './ScheduleDAO.php';
require_once './IconDAO.php';
require_once './CommentDAO.php';
require_once './EmoticonDAO.php';
require_once './FriendDAO.php';

$data = "nosend";

//ログイン処理

//login_userの引数がある時の処理
if (isset($_POST['login_user']) == true) {
    $class = new Login();
    $data = $class->login_user($_POST['name'], $_POST['pass']);
}


//CREATE系処理

//create_userの引数がある時の処理
if (isset($_POST['create_user']) == true) {
    $class = new Login();
    $data = $class->create_user($_POST['name'], $_POST['pass'], $_POST['mail']);
}

//create_scheduleの引数がある時の処理
if (isset($_POST['create_schedule']) == true) {
    $class = new Schedule();
    $data = $class->create_schedule($_POST['schedule_name'],$_POST['schedule_lat'],$_POST['schedule_lng'],$_POST['schedule_time'],$_POST['icon_id'],$_POST['user_ids']);
}

//create_iconの引数がある時の処理
if (isset($_POST['create_icon']) == true) {
    $class = new Icon();
    $data = $class->create_icon($_POST['icon_detail']);
}

//create_commentの引数がある時の処理
if (isset($_POST['create_comment']) == true) {
    $class = new Comment();
    $data = $class->create_comment($_POST['comment_detail']);
}

//create_emoticonの引数がある時の処理
if (isset($_POST['create_emoticon']) == true) {
    $class = new Emoticon();
    $data = $class->create_emoticon($_POST['emoticon_detail']);
}

//create_friendの引数がある時の処理
if (isset($_POST['create_friend']) == true) {
    $class = new Friend();
    $data = $class->create_friend($_POST['follow_id'],$_POST['user_id']);
}

//create_appointmentの引数がある時の処理
if (isset($_POST['create_appointment']) == true) {
    $class = new Appointment();
    $data = $class->create_appointment($_POST['schedule_id'],$_POST['user_ids']);
}


//削除系処理

//deleate_friend
if (isset($_POST['delete_friend']) == true) {
    $class = new Friend();
    $data = $class->delete_friend($_POST['follow_id'],$_POST['user_id']);
}


//arrayの中身をJSON形式に変換している
$json_array = json_encode($data);

print $json_array;
