<?php
class Icon
{
    function get_pdo()
    {
        $pdo = new PDO('mysql:host=mysql212.phy.lolipop.lan;dbname=LAA1418138-matiawase;charset=utf8', 'LAA1418138', 'apstdnb');
        return $pdo;
    }

    function create_icon($icon_detail){
        try {
            $pdo = $this->get_pdo();

            $sql = "INSERT INTO icon_tbl (icon_detail) VALUE (?);";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $icon_detail, PDO::PARAM_STR);
            $ps->execute();
            $data = true;
        } catch (Exception $e) {
            $data = $e;
        } catch (Error $e) {
            $data = $e;
        }
        return $data;
    }

}