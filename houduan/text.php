<?php
include("getKay.php");
$data=json_decode(file_get_contents("php://input"), true);
$user="admin";
$kay="d6893a83d1a0e8fe6c5ea8fd7c21092e";
$page=1;
$return=array(
    "cod"=>"",
    "info"=>"",
    'SQL'=>'',
    'card'=>array()
);
$conn = mysqli_connect("127.0.0.1", "root", "root", "paper");
    if (!$conn) {
        $return["cod"]="100";
        $return["info"]="连接数据库失败";
    }
    mysqli_set_charset($conn, "utf8");
    if (getkay($conn, $user)==$kay) {
        $SQL= "SELECT * FROM sendpaper WHERE seeduser='$user' LIMIT 0,4";
        $return['SQL']=$SQL;
        $res  = mysqli_query($conn, $SQL);
        if (!$res) {
            $return["cod"]="101";
            $return["info"]="查询失败,SQL语句错误";
        } else {
            if (mysqli_num_rows($res) ==0) {
                $return["cod"]="102";
                $return["info"]="无纸片内容";
            } else {
                for ($i=0;$i<mysqli_num_rows($res);$i++) {
                    $row = mysqli_fetch_assoc($res);
                    array_push($return['card'], $row);
                }

                // $return['card'][]=$card;
            }
        }
    } else {
        $return["cod"]="103";
        $return["info"]="kay值校验失败";
    }
    mysqli_close($conn);
    echo json_encode($return);
