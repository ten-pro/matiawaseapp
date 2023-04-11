<?php
require_once './AppointmentDAO.php';
class Schedule
{
    function get_pdo()
    {
        $pdo = new PDO('mysql:host=mysql212.phy.lolipop.lan;dbname=LAA1418138-matiawase;charset=utf8', 'LAA1418138', 'apstdnb');
        return $pdo;
    }

    function create_schedule($schedule_name, $schedule_lat, $schedule_lng, $schedule_time, $icon_id, $user_ids)
    {
        try {
            $pdo = $this->get_pdo();

            $sql = "INSERT INTO `schedule_tbl` (`schedule_name`, `schedule_lat`, `schedule_lng`, `schedule_time`, `icon_id`, `schedule_status`) VALUES (?, ?, ?, ?, ?, ?);";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $schedule_name, PDO::PARAM_STR);
            $ps->bindValue(2, $schedule_lat, PDO::PARAM_STR);
            $ps->bindValue(3, $schedule_lng, PDO::PARAM_STR);
            $ps->bindValue(4, $schedule_time, PDO::PARAM_STR);
            $ps->bindValue(5, $icon_id, PDO::PARAM_INT);
            $ps->bindValue(6, 0, PDO::PARAM_INT);
            $ps->execute();
            $schedule_id = $pdo->lastInsertId();

            //待ち合わせ作成処理
            $class = new Appointment();
            $data = $class->create_appointment($schedule_id, $user_ids);
        } catch (PDOException $e) {
            $data = $e;
        } catch (Error $e) {
            $data = $e;
        }
        return $data;
    }


    function update_schedule($schedule_name, $schedule_lat, $schedule_lng, $schedule_time, $schedule_id)
    {
        try {
            $pdo = $this->get_pdo();

            $sql = "UPDATE `schedule_tbl` SET `schedule_name` = ?, `schedule_lat` = ?, `schedule_lng` = ?, `schedule_time` = ? WHERE `schedule_id` = ?;";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $schedule_name, PDO::PARAM_STR);
            $ps->bindValue(2, $schedule_lat, PDO::PARAM_STR);
            $ps->bindValue(3, $schedule_lng, PDO::PARAM_STR);
            $ps->bindValue(4, $schedule_time, PDO::PARAM_STR);
            $ps->bindValue(5, $schedule_id, PDO::PARAM_INT);
            $ps->execute();
            $data = true;
        } catch (PDOException $e) {
            $data = $e;
        } catch (Error $e) {
            $data = $e;
        }
        return $data;
    }


    function get_schedulelist($user_id)
    {
        try {
            $pdo = $this->get_pdo();
            $sql = "SELECT schedule_id FROM `appointment_tbl` WHERE user_id = ?";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $user_id, PDO::PARAM_INT);
            $ps->execute();
            $search = $ps->fetchAll();
            $data = array();

            foreach ($search as $row1) {
                $sql2 = "SELECT * FROM `schedule_tbl` WHERE schedule_id = ?";
                $ps2 = $pdo->prepare($sql2);
                $ps2->bindValue(1, $row1['schedule_id'], PDO::PARAM_INT);
                $ps2->execute();
                $search2 = $ps2->fetchAll();

                // データの整形
                foreach ($search2 as $row2) {
                    $data[] = array(
                        "schedule_id" => $row2["schedule_id"],
                        "schedule_name" => $row2["schedule_name"],
                        "schedule_lat" => $row2["schedule_lat"],
                        "schedule_lng" => $row2["schedule_lng"],
                        "schedule_time" => $row2["schedule_time"],
                        "schedule_status" => $row2["schedule_status"]
                    );
                }

            }
        } catch (PDOException $e) {
            $data = $e;
        } catch (Error $e) {
            $data = $e;
        }
        return $data;
    }


}
