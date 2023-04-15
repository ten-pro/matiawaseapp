<?php


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
                $data = array(
                    'create_acount' => true,
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

            // ユーザーが存在しない場合はログイン失敗とする
            if (!$search) {
                return array('login' => false, 'result' => 'name mismatch');
            }

            foreach ($search as $row) {
                // パスワードの照合
                if (password_verify($pass, $row['user_pass'])) {
                    $class1 = new Appointment();
                    $class2 = new Schedule();
                    $class3 = new Friend();
                    $data = array(
                        'login' => true,
                        'user_information' => $this->user_information($row['user_id']),
                        'appointmentlist' => $class1->get_appointmentlist($row['user_id']),
                        'get_schedulelist' => $class2->get_schedulelist($row['user_id']),
                        'get_friendlist' => $class3->get_friendlist($row['user_id'])
                    );
                    // ユーザー情報を返す
                    return $data;
                }
            }

            // 認証失敗時はログイン失敗とする
            return array('login' => false, 'result' => 'password mismatch');
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }


    function update_user($user_id, $newname, $newmail)
    {
        try {
            $pdo = $this->get_pdo();

            $sql2 = "SELECT * FROM user_tbl WHERE user_name = ? AND NOT user_id = ?";
            $ps = $pdo->prepare($sql2);
            $ps->bindValue(1, $newname, PDO::PARAM_STR);
            $ps->bindValue(2, $user_id, PDO::PARAM_INT);
            $ps->execute();
            $search2 = $ps->fetchAll();
            if ($search2 == null) {
                $sql3 = "UPDATE user_tbl SET user_name = ?,user_mail = ? WHERE user_id = ?";
                $ps = $pdo->prepare($sql3);
                $ps->bindValue(1, $newname, PDO::PARAM_STR);
                $ps->bindValue(2, $newmail, PDO::PARAM_STR);
                $ps->bindValue(3, $user_id, PDO::PARAM_INT);
                $ps->execute();
                return array('update' => true);
            } else {
                return array('update' => false, 'result' => 'name mismatch');
            }
        } catch (PDOException $e) {
            $data = $e->getMessage();
        }
        return $data;
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
