<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>GM dialog widget</title>
    <link rel="stylesheet" href="style.min.css"/>
</head>

<body>

<?php
$dialog_txt = "msg-data.php";
include_once($dialog_txt);
?>

<div class="msg-chat">
    <div class="msg-chat__block">

        <div class="msg-chat__screen">

            <div class="msg-chat__screen-header">
                <img src="img/top-panel.svg">
            </div>

            <div class="msg-chat__screen-dialogs">
                <?php $count = count($dialog);
                foreach ($dialog as $i => $item):
                ++$i; ?>
                <div id="index-<?php echo $i; ?>">
                    <div class="dialog">
                        <?php echo $item['text'] ?>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>

            <div class="msg-chat__screen-footer">
                <img src="img/low-pannel.svg">
            </div>

        </div>

        <img src="img/msg-chat.png"/>

    </div>
</div>

</body>

<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="js/msg-widget.js"></script>

</html>