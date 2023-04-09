<?php

//CROSエラーの解消
header("Access-Control-Allow-Origin: *");
//JSON形式で返却すること、文字形式がUTF-8だということの宣言
header('Content-Type: application/json; charset=UTF-8');

//DAOの読み込み
require_once './LoginDAO.php';
require_once './ScheduleDAO.php';
require_once './IconDAO.php';

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
    $data = $class->create_schedule($_POST['schedule_name'],$_POST['schedule_lat'],$_POST['schedule_lng'],$_POST['schedule_time'],$_POST['icon_id']);
}

//create_iconの引数がある時の処理
if (isset($_POST['create_icon']) == true) {
    $class = new Icon();
    $data = $class->create_icon($_POST['icon_detail']);
}

//arrayの中身をJSON形式に変換している
$json_array = json_encode($data);

print $json_array;
