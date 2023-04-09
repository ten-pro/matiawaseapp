<?php
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
                $data = false;
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

                    // ユーザー情報を返す
                    return $user;
                }
            }

            // 認証失敗時はfalseを返す
            return false;
        } catch (PDOException $e) {
            // エラーメッセージを出力する
            echo 'データベースエラー：' . $e->getMessage();
            return false;
        }
    }
}
