<?php
class Friend
{
    function get_pdo()
    {
        $pdo = new PDO('mysql:host=mysql212.phy.lolipop.lan;dbname=LAA1418138-matiawase;charset=utf8', 'LAA1418138', 'apstdnb');
        return $pdo;
    }

    function create_friend($follow_id, $user_id)
    {
        try {

            $pdo = $this->get_pdo();

            if ($follow_id == $user_id) {
                throw new Exception('自分自身をフォローすることはできません。');
            }

            //既に同じidが登録されていないかの確認
            $sql =  "SELECT * FROM friend_tbl WHERE follow_id = ? AND follower_id = ?";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $follow_id, PDO::PARAM_INT);
            $ps->bindValue(2, $user_id, PDO::PARAM_INT);
            $ps->execute();
            $search = $ps->fetchColumn();

            if ($search == 0) {
                $sql2 = "INSERT INTO friend_tbl (follow_id,follower_id) VALUE (?,?);";
                $ps = $pdo->prepare($sql2);
                $ps->bindValue(1, $follow_id, PDO::PARAM_INT);
                $ps->bindValue(2, $user_id, PDO::PARAM_INT);
                $ps->execute();
                $data = true;
            } else {
                $data = false;
            }
        } catch (Exception $e) {
            $data = $e;
        } catch (PDOException $e) {
            $data = $e;
        }
        return $data;
    }
}
