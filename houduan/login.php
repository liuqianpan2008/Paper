<?php

$data=json_decode(file_get_contents("php://input"), true);
$user= $data["user"];
$passworld= $data["passworld"];

$return=array(
    "cod"=>"",
    "info"=>"",
    "sex"=>"",
    'kay'=>"",
);


    $conn = mysqli_connect("127.0.0.1", "root", "root", "paper");
    if (!$conn) {
        $return["cod"]="100";
        $return["info"]="连接数据库失败";
    }
    mysqli_set_charset($conn, "utf8");
    $res = mysqli_query($conn, "select sex from user where user='$user' and password='$passworld'");
    
    if (!$res) {
        $return["cod"]="101";
        $return["info"]="查询失败";
    }

    if (mysqli_num_rows($res) ==0) {
        $return["cod"]="102";
        $return["info"]="登录失败,账号或者密码错误";
    } else {
        $row = mysqli_fetch_assoc($res);
        $return['sex']=$row["sex"];
        $kay=md5(rand());
        $SQL="UPDATE  user SET kay='$kay' WHERE user='$user'";
        if (mysqli_query($conn, $SQL)) {
            $return['kay']=$kay;
            $return["cod"]="103";
            $return["info"]="登录成功";
        } else {
            $return["cod"]="104";
            $return["info"]="登录失败,Kay值获取失败";
            $return["SQL"]=$SQL;
        }
    }
    mysqli_free_result($res);
    mysqli_close($conn);
    echo json_encode($return);
