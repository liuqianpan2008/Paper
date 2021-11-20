<?php
$data=json_decode(file_get_contents("php://input"), true);
$user= $data["user"];
$passworld= $data["passworld"];
$sex=$data["sex"];

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
    mysqli_set_charset($conn, "utf8");
    //INSERT INTO user(`user`, `password`, sex) VALUES ('liu1', '123', '男');
    $SQL="INSERT INTO user(`user`,`password`,sex) values('$user','$passworld','$sex')";
    if (mysqli_query($conn, $SQL)) {
        $return["cod"]="102";
        $return["info"]="注册成功";
    } else {
        $return["cod"]="101";
        $return["info"]="注册失败,数据库写入失败(可能是用户名重名)";
    }
    mysqli_close($conn);
    echo json_encode($return);
