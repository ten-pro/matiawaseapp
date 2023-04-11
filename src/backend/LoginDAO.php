<?php
require_once './ScheduleDAO.php';
require_once './AppointmentDAO.php';
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
                $data = $id ? $id : false;
            } else {
                $data = array("login" => false, "result" => "duplication");
            }
        } catch (PDOException $e) {
            // エラーメッセージを出力する
            echo 'データベースエラー：' . $e->getMessage();
            $data = false;
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
            $user = $ps->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                // パスワードの照合
                if (password_verify($pass, $user['user_pass'])) {
                    $class1 = new Appointment();
                    $class2 = new Schedule();
                    $data = array(
                        'user_information' => $this->user_information($_POST['user_id']),
                        'appointmentlist' => $class1->get_appointmentlist($_POST['user_id']),
                        'get_schedulelist' => $class2->get_schedulelist($_POST['user_id'])
                    );
                    // ユーザー情報を返す
                    return $data;
                }
            }

            // 認証失敗時はfalseを返す
            return false;
        } catch (PDOException $e) {
            // エラーメッセージを出力する
            $data = $e->getMessage();
            return $data;
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
            $data = $e->getMessage();
            return $data;
        }
        return $data;
    }
}
