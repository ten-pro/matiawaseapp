<?php
class Friend
{
    function get_pdo()
    {
        $pdo = new PDO('mysql:host=mysql212.phy.lolipop.lan;dbname=LAA1418138-matiawase;charset=utf8', 'LAA1418138', 'apstdnb');
        return $pdo;
    }

    function create_friend($follow_id, $follower_id)
    {
        try {

            $pdo = $this->get_pdo();

            if ($follow_id == $follower_id) {
                throw new Exception('自分自身をフォローすることはできません。');
            }

            //既に同じidが登録されていないかの確認
            $sql =  "SELECT * FROM friend_tbl WHERE follow_id = ? AND follower_id = ?";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $follow_id, PDO::PARAM_INT);
            $ps->bindValue(2, $follower_id, PDO::PARAM_INT);
            $ps->execute();
            $search = $ps->fetchColumn();

            if ($search == 0) {
                $sql2 = "INSERT INTO friend_tbl (follow_id,follower_id) VALUE (?,?);";
                $ps = $pdo->prepare($sql2);
                $ps->bindValue(1, $follow_id, PDO::PARAM_INT);
                $ps->bindValue(2, $follower_id, PDO::PARAM_INT);
                $ps->execute();
                $sql3 = "INSERT INTO friend_tbl (follow_id,follower_id) VALUE (?,?);";
                $ps = $pdo->prepare($sql3);
                $ps->bindValue(1, $follower_id, PDO::PARAM_INT);
                $ps->bindValue(2, $follow_id, PDO::PARAM_INT);
                $ps->execute();
                $data = true;
            } else {
                $data = false;
            }
        } catch (Exception $e) {
            $data = $e->getMessage();
        } catch (PDOException $e) {
            $data = $e->getMessage();
        }
        return $data;
    }


    function delete_friend($follow_id, $follower_id)
    {
        try {
            $pdo = $this->get_pdo();

            if ($follow_id == $follower_id) {
                throw new Exception('自分自身を削除することはできません。');
            }

            //送られたidが登録されているかの確認
            $sql = "SELECT COUNT(*) FROM friend_tbl WHERE follow_id = ? AND follower_id = ?";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $follow_id, PDO::PARAM_INT);
            $ps->bindValue(2, $follower_id, PDO::PARAM_INT);
            $ps->execute();
            $count = $ps->fetchColumn();

            if ($count > 0) {
                $sql2 = "DELETE FROM friend_tbl WHERE follow_id = ? AND follower_id = ?";
                $ps = $pdo->prepare($sql2);
                $ps->bindValue(1, $follow_id, PDO::PARAM_INT);
                $ps->bindValue(2, $follower_id, PDO::PARAM_INT);
                $ps->execute();
                $data = true;
            } else {
                $data = false;
            }
        } catch (Exception $e) {
            $data = $e->getMessage();
        } catch (PDOException $e) {
            $data = $e->getMessage();
        }
        return $data;
    }


    function get_friendlist($user_id)
    {
        try {
            $pdo = $this->get_pdo();

            $sql = "SELECT F.follow_id AS friend_id,F.follower_id,U.user_name AS 'friend_name' FROM friend_tbl AS F
            LEFT OUTER JOIN user_tbl AS U
            ON F.follow_id = U.user_id WHERE F.follower_id = ?;";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $user_id, PDO::PARAM_INT);
            $ps->execute();
            $search = $ps->fetchAll();
            foreach ($search as $row1) {
                $data[] = array('friend_id'=>$row1['friend_id'],'friend_name'=>$row1['friend_name']);
            }

            return $data;
        } catch (PDOException $e) {
            $data = $e->getMessage();
        } catch (Exception $e) {
            $data = $e->getMessage();
        }
        return $data;
    }

}
