<?php
include("getKay.php");
$data=json_decode(file_get_contents("php://input"), true);
$user=$data['user'];
$title=$data['title'];
$content=$data['content'];
$kay=$data['kay'];
$return=array(
    "cod"=>"",
    "info"=>"",
    'SQL'=>''
);
$conn = mysqli_connect("127.0.0.1", "root", "root", "paper");
    if (!$conn) {
        $return["cod"]="100";
        $return["info"]="连接数据库失败";
    }
    if (getkay($conn, $user)==$kay) {
        mysqli_set_charset($conn, "utf8");
        $SQL="INSERT INTO sendpaper(`title`,`content`,`seeduser`,time) values('$title','$content','$user',now())";
        if (mysqli_query($conn, $SQL)) {
            $return["cod"]="102";
            $return["info"]="发送成功";
        } else {
            $return["cod"]="101";
            $return["info"]="发送失败,SQL语句失败";
            $return["SQL"]=$SQL;
        }
    } else {
        $return["cod"]="103";
        $return["info"]="kay值校验失败";
    }
    
    mysqli_close($conn);
    echo json_encode($return);
