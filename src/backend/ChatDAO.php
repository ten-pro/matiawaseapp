<?php

require_once './LoginDAO.php';

class Chat
{
    function get_pdo()
    {
        $pdo = new PDO('mysql:host=mysql212.phy.lolipop.lan;dbname=LAA1418138-matiawase;charset=utf8', 'LAA1418138', 'apstdnb');
        return $pdo;
    }

    function create_chat($schedule_id, $user_id, $comment_id)
    {
        try {
            $pdo = $this->get_pdo();
            $sql = "SELECT * FROM appointment_tbl WHERE schedule_id = ? AND user_id = ?";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $schedule_id, PDO::PARAM_INT);
            $ps->bindValue(2, $user_id, PDO::PARAM_INT);
            $ps->execute();
            $search = $ps->fetchAll();
            foreach ($search as $row) {
                if($row['appointment_status']=='到着')
                return array('chat' => false, 'result' => 'have arrived');
            }

            $sql1 = "SELECT * FROM appointment_tbl WHERE schedule_id = ? AND NOT user_id = ?";
            $ps = $pdo->prepare($sql1);
            $ps->bindValue(1, $schedule_id, PDO::PARAM_INT);
            $ps->bindValue(2, $user_id, PDO::PARAM_INT);
            $ps->execute();
            $search = $ps->fetchAll();

            if (!$search) {
                return array('chat' => false, 'result' => 'no schedule');
            }
            foreach ($search as $row) {
                $sql2 = "INSERT INTO chat_tbl (appointment_id,user_id,comment_id) VALUE (?,?,?);";
                $ps2 = $pdo->prepare($sql2);
                $ps2->bindValue(1, $row['appointment_id'], PDO::PARAM_INT);
                $ps2->bindValue(2, $user_id, PDO::PARAM_INT);
                $ps2->bindValue(3, $comment_id, PDO::PARAM_INT);
                $ps2->execute();
            }
            return array('chat' => true);
        } catch (Exception $e) {
            $data = $e->getMessage();
        } catch (Error $e) {
            $data = $e->getMessage();
        }
        return $data;
    }


    function get_chatlist($appointment_id)
    {
        try {
            $pdo = $this->get_pdo();

            $sql = "SELECT * FROM chat_tbl WHERE appointment_id = ? ORDER BY chat_id;";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $appointment_id, PDO::PARAM_INT);
            $ps->execute();
            $search = $ps->fetchAll();
            // データの整形
            $class = new Login();
            foreach ($search as $row) {
                $data[] = array(
                    'user_id' => $row['user_id'],
                    'user_name' => $class->get_username($row['user_id']),
                    'comment_id' => $row['comment_id']
                );
            }
        } catch (PDOException $e) {
            $data = $e->getMessage();
        } catch (Error $e) {
            $data = $e->getMessage();
        }
        return $data;
    }
}
