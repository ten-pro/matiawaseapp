<?php
require_once './AppointmentDAO.php';
class Schedule
{
    function get_pdo()
    {
        $pdo = new PDO('mysql:host=mysql212.phy.lolipop.lan;dbname=LAA1418138-matiawase;charset=utf8', 'LAA1418138', 'apstdnb');
        return $pdo;
    }

    function create_schedule($schedule_name, $schedule_lat, $schedule_lng, $schedule_time, $icon_id)
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
            $sch = true;
            if($sch){

            }
        } catch (PDOException $e) {
            $data = $e;
        } catch (Error $e) {
            $data = $e;
        }
        return $data;
    }
}
