<?php
class Comment
{
    function get_pdo()
    {
        $pdo = new PDO('mysql:host=mysql212.phy.lolipop.lan;dbname=LAA1418138-matiawase;charset=utf8', 'LAA1418138', 'apstdnb');
        return $pdo;
    }

    function create_comment($comment_detail){
        try {
            $pdo = $this->get_pdo();

            $sql = "INSERT INTO comment_tbl (comment_detail) VALUE (?);";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $comment_detail, PDO::PARAM_STR);
            $ps->execute();
            $data = true;
        } catch (Exception $e) {
            $data = $e->getMessage();
        } catch (Error $e) {
            $data = $e->getMessage();
        }
        return $data;
    }

}