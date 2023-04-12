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
            $data = $e->getMessage();
        } catch (Error $e) {
            $data = $e->getMessage();
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
                    return true;
                } else {
                    throw new Exception('到着しているため更新できません');
                }
            }

            return false;
        } catch (PDOException $e) {
            $data = $e->getMessage();
        } catch (Exception $e) {
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
                if ($row1['appointment_status'] === '到着') {
                    $sql = "UPDATE schedule_tbl SET comment_id = ? WHERE schedule_id = ?;";
                    $ps = $pdo->prepare($sql);
                    $ps->bindValue(1, $comment_id, PDO::PARAM_INT);
                    $ps->bindValue(2, $row1['schedule_id'], PDO::PARAM_INT);
                    $ps->execute();
                    return true;
                } else {
                    throw new Exception('未到着のため更新できません');
                }
            }

            return false;
        } catch (PDOException $e) {
            $data = $e->getMessage();
        } catch (Exception $e) {
            $data = $e->getMessage();
        }
        return $data;
    }


    function arrival_update($appointment_id, $schedule_id)
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
                    $sql = "UPDATE appointment_tbl SET appointment_status = '到着' WHERE appointment_id = ?;";
                    $ps = $pdo->prepare($sql);
                    $ps->bindValue(1, $appointment_id, PDO::PARAM_INT);
                    $ps->execute();
                    $sql2 = "SELECT * FROM appointment_tbl WHERE appointment_status = '未到着' AND schedule_id = ? AND NOT appointment_id = ?";
                    $ps = $pdo->prepare($sql2);
                    $ps->bindValue(1, $schedule_id, PDO::PARAM_INT);
                    $ps->bindValue(2, $appointment_id, PDO::PARAM_INT);
                    $ps->execute();
                    $search = $ps->fetchAll();
                    if ($search == null) {
                        $sql3 = "UPDATE schedule_tbl SET schedule_status = '完了' WHERE schedule_id = ?;";
                        $ps = $pdo->prepare($sql3);
                        $ps->bindValue(1, $schedule_id, PDO::PARAM_INT);
                        $ps->execute();
                    }

                    return true;
                } else {
                    throw new Exception('すでに到着しているため更新できません');
                }
            }

            return false;
        } catch (PDOException $e) {
            $data = $e->getMessage();
        } catch (Exception $e) {
            $data = $e->getMessage();
        }
        return $data;
    }


    function get_appointmentlist($user_id)
    {
        try {
            $pdo = $this->get_pdo();

            $sql = "SELECT * FROM `appointment_tbl` WHERE user_id = ? AND appointment_status = '未到着';";
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
                    'appointment_status' => $row['appointment_status']
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
