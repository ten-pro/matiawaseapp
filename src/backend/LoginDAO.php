<?php

use JetBrains\PhpStorm\Internal\ReturnTypeContract;

require_once './ScheduleDAO.php';
require_once './AppointmentDAO.php';
require_once './FriendDAO.php';
class Login
{
    function get_pdo()
    {
        $pdo = new PDO('mysql:host=mysql212.phy.lolipop.lan;dbname=LAA1418138-matiawase;charset=utf8', 'LAA1418138', 'apstdnb');
        return $pdo;
    }

    function create_user($name, $pass, $mail)
    {
        try {
            $pdo = $this->get_pdo();

            //既に同じメールで登録されていないかの確認
            $sql =  "SELECT * FROM user_tbl WHERE user_name = ?";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $name, PDO::PARAM_STR);
            $ps->execute();
            $search = $ps->fetchAll();

            if ($search == null) {
                $sql2 = "INSERT INTO user_tbl (user_name,user_pass,user_mail) VALUE (?,?,?);";
                $ps = $pdo->prepare($sql2);
                $ps->bindValue(1, $name, PDO::PARAM_STR);
                $ps->bindValue(2, password_hash($pass, PASSWORD_DEFAULT), PDO::PARAM_STR);
                $ps->bindValue(3, $mail, PDO::PARAM_STR);
                $ps->execute();
                $id = $pdo->lastInsertId();
                $class1 = new Appointment();
                $class2 = new Schedule();
                $class3 = new Friend();
                return $data = array(
                    'login' => array('create_acount' => true),
                    'user_information' => $this->user_information($id),
                    'appointmentlist' => $class1->get_appointmentlist($id),
                    'get_schedulelist' => $class2->get_schedulelist($id),
                    'get_friendlist' => $class3->get_friendlist($id)
                );
            } else {
                $data = array("create_acount" => false, "result" => "duplication");
            }
        } catch (PDOException $e) {
            $data = $e->getMessage();
        }
        return $data;
    }

    function login_user($name, $pass)
    {
        try {
            $pdo = $this->get_pdo();

            // ユーザー名に一致するユーザーを取得する
            $sql = "SELECT * FROM user_tbl WHERE user_name = ?";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $name, PDO::PARAM_STR);
            $ps->execute();
            $search = $ps->fetchAll();
            if($search == null)
            return array('login' => array('login' => false, 'result' => 'name mismatch'));

            foreach ($search as $row) {
                // パスワードの照合
                if (password_verify($pass, $row['user_pass'])) {
                    $class1 = new Appointment();
                    $class2 = new Schedule();
                    $class3 = new Friend();
                    $data = array(
                        'login' => array('login' => false, 'result' => 'password mismatch'),
                        'user_information' => $this->user_information($row['user_id']),
                        'appointmentlist' => $class1->get_appointmentlist($row['user_id']),
                        'get_schedulelist' => $class2->get_schedulelist($row['user_id']),
                        'get_friendlist' => $class3->get_friendlist($row['user_id'])
                    );
                    // ユーザー情報を返す
                    return $data;
                } else {
                    return $data = array("login" => false, "result" => "password mismatch");
                }
            }

            // 認証失敗時はfalseを返す
            return false;
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }

    function user_information($user_id)
    {
        try {
            $pdo = $this->get_pdo();

            // ユーザー名に一致するユーザーを取得する
            $sql = "SELECT * FROM user_tbl WHERE user_id = ?";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $user_id, PDO::PARAM_INT);
            $ps->execute();
            $search = $ps->fetchAll();
            // データの整形
            $data = array();
            foreach ($search as $row) {
                $data = array(
                    'user_id' => $row['user_id'],
                    'user_name' => $row['user_name'],
                    'user_mail' => $row['user_mail']
                );
            }
        } catch (PDOException $e) {
            // エラーメッセージを出力する
            return $e->getMessage();
        }
        return $data;
    }
}
