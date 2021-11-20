<?php
include("getKay.php");
$data=json_decode(file_get_contents("php://input"), true);
$user=$data['user'];
$kay=$data['kay'];

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
        //SELECT * FROM sendpaper WHERE  seeduser != 'admin' AND recipient = '0'
        $SQL= "SELECT * FROM sendpaper WHERE recipient = '0' AND seeduser != '$user' ";
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
                $Temporary=array();
                for ($i=0;$i<mysqli_num_rows($res);$i++) {
                    $row = mysqli_fetch_assoc($res);
                    array_push($Temporary, $row);
                }
                if (shuffle($Temporary)) {
                    $return['card']=array_shift($Temporary);
                    $id=$return['card']["id"];
                    $SQL="UPDATE  sendpaper SET recipient='$user' WHERE id='$id'";
                    $return['SQL']=$SQL;
                    if (mysqli_query($conn, $SQL)) {
                        $return["cod"]="103";
                        $return["info"]="查询成功";
                    } else {
                        $return["cod"]="106";
                        $return["info"]="修改失败";
                    }
                } else {
                    $return["cod"]="104";
                    $return["info"]="随机失败";
                }
            }
        }
    } else {
        $return["cod"]="105";
        $return["info"]="kay值校验失败";
    }
    mysqli_close($conn);
    echo json_encode($return);
