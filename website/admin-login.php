<?php
    session_start();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/style.css">
    <title>Login</title>
</head>
<body>
    <div class="container">
        <div class="box form-box">
            <?php
            include("php/config.php");
            if(isset($_POST['submit'])){
                $email = mysqli_real_escape_string($con,$_POST['email']);
                $password = mysqli_real_escape_string($con,$_POST['password']);
                
                $result = mysqli_query($con,"SELECT * FROM admins WHERE Email ='$email' AND Password='$password'") or die("Select Error");
                $row = mysqli_fetch_assoc($result);

                if(is_array($row) && !empty($row)){
                    $_SESSION['valid'] = $row['Email'];
                    $_SESSION['username'] = $row['Username'];
                    $_SESSION['passkey'] = $row['Passkey'];
                    $_SESSION['id'] = $row['Id'];

                }else{
                    echo "<div class='message'>
                                <p>Wrong Email or Password</p>
                            </div><br>";
                    echo "<a href='admin-login.php'><button class='btn'>Go Back</button>";
                }
                if(isset($_SESSION['valid'])){
                    header("location: admin-home.php");
                }

            }else{
            ?>
            <header>Admin Login</header>
            <form action="" method="POST">
                <div class="field input">
                    <label for="email">Email</label>
                    <input type="text" name="email" id="email" autocomplete="off" required>
                </div>
                <div class="field input">
                    <label for="passkey">Passkey</label>
                    <input type="text" name="passkey" id="passkey" autocomplete="off" required>
                </div>
                <div class="field input">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" autocomplete="off" required>
                </div>
                <div class="field input">
                    <input type="submit" name="submit" class="btn" value="Login" required>
                </div>
                <div class="links">
                    Don't have an account? <a href="admin-register.php">Sign Up Now!</a>
                </div>
            </form>
            <a href="landing.php"><button class="btn">Go Back</button></a>
        </div>
        <?php } ?>
    </div>
</body>
</html>