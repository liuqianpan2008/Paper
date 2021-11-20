<?php
function getkay($conn, $user)
{
    $res = mysqli_query($conn, "select kay from user where user='$user'");
    $row = mysqli_fetch_assoc($res);
    return $row["kay"];
}
