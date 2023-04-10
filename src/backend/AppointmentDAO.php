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
}
