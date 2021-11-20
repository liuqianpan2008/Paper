<?php
include("getKay.php");
$data=json_decode(file_get_contents("php://input"), true);
$user=$data['user'];
$kay=$data['kay'];
$page=$data['page'];
$return=array(
    "cod"=>"",
    "info"=>"",
    'SQL'=>'',
    'number'=>'',
    'card'=>array()
);
$conn = mysqli_connect("127.0.0.1", "root", "root", "paper");
    if (!$conn) {
        $return["cod"]="100";
        $return["info"]="连接数据库失败";
    }
    mysqli_set_charset($conn, "utf8");
    if (getkay($conn, $user)==$kay) {
        $SQL= "SELECT * FROM sendpaper WHERE recipient='$user'  order by id desc LIMIT ".strval(($page-1)*4).",4";
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
                $return["cod"]="103";
                $return["info"]="查询成功";
                $return['number']=ceil(mysqli_num_rows($res)/4);
                for ($i=0;$i<mysqli_num_rows($res);$i++) {
                    $row = mysqli_fetch_assoc($res);
                    array_push($return['card'], $row);
                }
            }
        }
    } else {
        $return["cod"]="103";
        $return["info"]="kay值校验失败";
    }
    mysqli_close($conn);
    echo json_encode($return);
