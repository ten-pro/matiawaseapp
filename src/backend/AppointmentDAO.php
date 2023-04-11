<?php
class Appointment
{
    function get_pdo()
    {
        $pdo = new PDO('mysql:host=mysql212.phy.lolipop.lan;dbname=LAA1418138-matiawase;charset=utf8', 'LAA1418138', 'apstdnb');
        return $pdo;
    }

    function create_appointment($schedule_id, $user_id)
    {
        try {
            $pdo = $this->get_pdo();

            if (is_array($user_id)) {
                foreach ($user_id as $id) {
                    $sql = "INSERT INTO appointment_tbl (schedule_id,user_id,appointment_status) VALUE (?,?,?);";
                    $ps = $pdo->prepare($sql);
                    $ps->bindValue(1, $schedule_id, PDO::PARAM_INT);
                    $ps->bindValue(2, $id, PDO::PARAM_INT);
                    $ps->bindValue(3, '未到着', PDO::PARAM_STR);
                    $ps->execute();
                }
            } else {
                $sql = "INSERT INTO appointment_tbl (schedule_id,user_id,appointment_status) VALUE (?,?,?);";
                $ps = $pdo->prepare($sql);
                $ps->bindValue(1, $schedule_id, PDO::PARAM_INT);
                $ps->bindValue(2, $user_id, PDO::PARAM_INT);
                $ps->bindValue(3, '未到着', PDO::PARAM_STR);
                $ps->execute();
            }
            $data = true;
        } catch (PDOException $e) {
            $data = $e;
        } catch (Error $e) {
            $data = $e;
        }
        return $data;
    }


    function update_currentlocation($appointment_id, $appointment_lat, $appointment_lng)
    {
        try {
            $pdo = $this->get_pdo();

            $sql = "UPDATE appointment_tbl SET appointment_lat = ?,appointment_lng = ? WHERE appointment_id = ?;";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $appointment_lat, PDO::PARAM_STR);
            $ps->bindValue(2, $appointment_lng, PDO::PARAM_STR);
            $ps->bindValue(3, $appointment_id, PDO::PARAM_INT);
            $ps->execute();

            $data = true;
        } catch (PDOException $e) {
            $data = $e->getMessage();
        } catch (Error $e) {
            $data = $e->getMessage();
        }
        return $data;
    }


    function update_emoticon($appointment_id, $emoticon_id)
    {
        try {
            $pdo = $this->get_pdo();

            $sql = "SELECT * FROM appointment_tbl WHERE appointment_id = ?;";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $appointment_id, PDO::PARAM_INT);
            $ps->execute();
            $search = $ps->fetchAll();
            foreach ($search as $row1) {
                if ($row1['appointment_status'] == '未到着') {
                    $sql = "UPDATE schedule_tbl SET emoticon_id = ? WHERE schedule_id = ?;";
                    $ps = $pdo->prepare($sql);
                    $ps->bindValue(1, $emoticon_id, PDO::PARAM_INT);
                    $ps->bindValue(2, $row1['schedule_id'], PDO::PARAM_INT);
                    $ps->execute();
                }
            }

            $data = true;
        } catch (PDOException $e) {
            $data = $e->getMessage();
        } catch (Error $e) {
            $data = $e->getMessage();
        }
        return $data;
    }


    function update_comment($appointment_id, $comment_id)
    {
        try {
            $pdo = $this->get_pdo();

            $sql = "SELECT * FROM appointment_tbl WHERE appointment_id = ?;";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $appointment_id, PDO::PARAM_INT);
            $ps->execute();
            $search = $ps->fetchAll();
            foreach ($search as $row1) {
                if ($row1['appointment_status'] == '未到着') {
                    $sql = "UPDATE schedule_tbl SET comment_id = ? WHERE schedule_id = ?;";
                    $ps = $pdo->prepare($sql);
                    $ps->bindValue(1, $comment_id, PDO::PARAM_INT);
                    $ps->bindValue(2, $row1['schedule_id'], PDO::PARAM_INT);
                    $ps->execute();
                }
            }

            $data = true;
        } catch (PDOException $e) {
            $data = $e->getMessage();
        } catch (Error $e) {
            $data = $e->getMessage();
        }
        return $data;
    }

    function get_appointmentlist($user_id)
    {
        try {
            $pdo = $this->get_pdo();

            $sql = "SELECT * FROM `appointment_tbl` WHERE user_id = ?";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $user_id, PDO::PARAM_INT);
            $ps->execute();
            $search = $ps->fetchAll();
            // データの整形
            $data = array();
            foreach ($search as $row) {
                $data[] = array(
                    'appointment_id' => $row['appointment_id'],
                    'schedule_id' => $row['schedule_id'],
                    "appointment_lat" => $row["appointment_lat"],
                    "appointment_lng" => $row["appointment_lng"],
                    'appointment_status' => $row['appointment_status']
                );
            }
        } catch (PDOException $e) {
            $data = $e;
        } catch (Error $e) {
            $data = $e;
        }
        return $data;
    }
}
