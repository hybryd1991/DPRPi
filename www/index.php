<!DOCTYPE html>
<?php
   define('BASE_DIR', dirname(__FILE__));
   require_once(BASE_DIR.'/config.php');
   $config = array();
   $debugString = "";
   
   $options_mm = array('Average' => 'average', 'Spot' => 'spot', 'Backlit' => 'backlit', 'Matrix' => 'matrix');
   $options_em = array('Off' => 'off', 'Auto' => 'auto', 'Night' => 'night', 'Nightpreview' => 'nightpreview', 'Backlight' => 'backlight', 'Spotlight' => 'spotlight', 'Sports' => 'sports', 'Snow' => 'snow', 'Beach' => 'beach', 'Verylong' => 'verylong', 'Fixedfps' => 'fixedfps');
   $options_wb = array('Off' => 'off', 'Auto' => 'auto', 'Sun' => 'sun', 'Cloudy' => 'cloudy', 'Shade' => 'shade', 'Tungsten' => 'tungsten', 'Fluorescent' => 'fluorescent', 'Incandescent' => 'incandescent', 'Flash' => 'flash', 'Horizon' => 'horizon');
   $options_ie = array('None' => 'none', 'Negative' => 'negative', 'Solarise' => 'solarise', 'Sketch' => 'sketch', 'Denoise' => 'denoise', 'Emboss' => 'emboss', 'Oilpaint' => 'oilpaint', 'Hatch' => 'hatch', 'Gpen' => 'gpen', 'Pastel' => 'pastel', 'Watercolour' => 'watercolour', 'Film' => 'film', 'Blur' => 'blur', 'Saturation' => 'saturation', 'Colourswap' => 'colourswap', 'Washedout' => 'washedout', 'Posterise' => 'posterise', 'Colourpoint' => 'colourpoint', 'ColourBalance' => 'colourbalance', 'Cartoon' => 'cartoon');
   $options_ce_en = array('Disabled' => '0', 'Enabled' => '1');
   $options_ro = array('No rotate' => '0', 'Rotate_90' => '90', 'Rotate_180' => '180', 'Rotate_270' => '270');
   $options_fl = array('None' => '0', 'Horizontal' => '1', 'Vertical' => '2', 'Both' => '3');
   $options_bo = array('Off' => '0', 'Background' => '2');
   $options_av = array('V2' => '2', 'V3' => '3');
   $options_at_en = array('Disabled' => '0', 'Enabled' => '1');
   $options_ac_en = array('Disabled' => '0', 'Enabled' => '1');
   $options_ab = array('Off' => '0', 'On' => '1');
   $options_vs = array('Off' => '0', 'On' => '1');
   $options_rl = array('Off' => '0', 'On' => '1');
   
   function initCamPos() {
      $tr = fopen("pipan_bak.txt", "r");
      if($tr){
         while(($line = fgets($tr)) != false) {
           $vals = explode(" ", $line);
           echo '<script type="text/javascript">init_pt(',$vals[0],',',$vals[1],');</script>';
         }
         fclose($tr);
      }
   }
   
   function pipan_controls() {
      initCamPos();
      echo "<div class='container-fluid text-center liveimage'>";
      echo "<input type='button' class='btn btn-primary' value='up' onclick='servo_up();'><br>";
      echo "&nbsp<input type='button' class='btn btn-primary' value='left' onclick='servo_left();'>";
      echo "&nbsp<input type='button' class='btn btn-primary' value='down' onclick='servo_down();'>";
      echo "&nbsp<input type='button' class='btn btn-primary' value='right' onclick='servo_right();'>";
      echo "</div>";   
   }
   
   function pilight_controls() {
      echo "<tr>";
        echo "<td>Pi-Light:</td>";
        echo "<td>";
          echo "R: <input type='text' size=4 id='pilight_r' value='255'>";
          echo "G: <input type='text' size=4 id='pilight_g' value='255'>";
          echo "B: <input type='text' size=4 id='pilight_b' value='255'><br>";
          echo "<input type='button' value='ON/OFF' onclick='led_switch();'>";
        echo "</td>";
      echo "</tr>";
   }
   
   function getExtraStyles() {
      $files = scandir('css');
      foreach($files as $file) {
         if(substr($file,0,3) == 'es_') {
            echo "<option value='$file'>" . substr($file,3, -4) . '</option>';
         }
      }
   }
   
   function getStyle() {
      return 'css/' . file_get_contents(BASE_DIR . '/css/extrastyle.txt');
   }
   
   function makeOptions($options, $selKey) {
      global $config;
      switch ($selKey) {
         case 'flip': 
            $cvalue = (($config['vflip'] == 'true') ? 2:0);
            $cvalue += (($config['hflip'] == 'true') ? 1:0);
            break;
         case 'MP4Box': 
            $cvalue = $config[$selKey];
            if ($cvalue == 'background') $cvalue = 2;
            break;
         default: $cvalue = $config[$selKey]; break;
      }
      if ($cvalue == 'false') $cvalue = 0;
      else if ($cvalue == 'true') $cvalue = 1;
      foreach($options as $name => $value) {
         if ($cvalue != $value) {
            $selected = '';
         } else {
            $selected = ' selected';
         }
         echo "<option value='$value'$selected>$name</option>";
      }
   }
   
   function makeInput($id, $size, $selKey='') {
      global $config, $debugString;
      if ($selKey == '') $selKey = $id;
      switch ($selKey) {
         case 'tl_interval': 
            if (array_key_exists($selKey, $config)) {
               $value = $config[$selKey] / 10;
            } else {
               $value = 3;
            }
            break;
         case 'watchdog_interval':
            if (array_key_exists($selKey, $config)) {
               $value = $config[$selKey] / 10;
            } else {
               $value = 0;
            }
            break;
         default: $value = $config[$selKey]; break;
      }
      echo "<input type='text' size=$size id='$id' value='$value'>";
   }
   
   if (isset($_POST['extrastyle'])) {
      if (file_exists('css/' . $_POST['extrastyle'])) {
         $fp = fopen(BASE_DIR . '/css/extrastyle.txt', "w");
         fwrite($fp, $_POST['extrastyle']);
         fclose($fp);
      }
   }
   
   $toggleButton = "Simple";
   $displayStyle = 'style="display:block;"';
   if(isset($_COOKIE["display_mode"])) {
      if($_COOKIE["display_mode"] == "Simple") {
         $toggleButton = "Full";
         $displayStyle = 'style="display:none;"';
      }
   }
   
   $streamButton = "MJPEG-Stream";
   $mjpegmode = 0;
   if(isset($_COOKIE["stream_mode"])) {
      if($_COOKIE["stream_mode"] == "MJPEG-Stream") {
         $streamButton = "Default-Stream";
         $mjpegmode = 1;
      }
   }
   
   
   $config = readConfig($config, CONFIG_FILE1);
   $config = readConfig($config, CONFIG_FILE2);
   
   $video_fps = $config['video_fps'];
   $divider = $config['divider'];
   $width = $config['width'];
   ?>
<html>
   <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
      <title>Delay-Play</title>
      <link rel="stylesheet" href="css/style_minified.css" />
      <link rel="stylesheet" href="<?php echo getStyle(); ?>" />
      <link href="extras/bootstrap3/css/bootstrap.css" rel="stylesheet" media="screen">
      <link href="extras/bootstrap3/css/bootstrap-theme.css" rel="stylesheet" media="screen">
      <link rel="stylesheet" type="text/css" href="css/dp.css">
      <script src="js/jquery-latest.js"></script>
      <script src="js/style_minified.js"></script>
      <script src="js/script.js"></script>
      <script src="js/pipan.js"></script>
      <script src="extras/bootstrap3/js/bootstrap.js"></script>
      <script type="text/javascript" src="js/mjpegGallery.js"></script>
      <script type="text/javascript" src="js/uiScripts.js"></script>
      <script type="text/javascript" src="js/videoboxPositioning.js"></script>
      <script type="text/javascript" src="js/multiselect.js"></script>
      <script type="text/javascript" src="js/mjpegPlayer.js"></script>
      <script type="text/javascript" src="js/bootstrap-confirmation.js"></script>
      <script type="text/javascript" src="extras/codoPlayer/CodoPlayer.js"></script>
      <script type="text/javascript" src="js/delete.js"></script>
      <script type="text/javascript" src="js/mail.js"></script>
   </head>
   <body onload="setTimeout('init(<?php echo "$mjpegmode, $video_fps, $divider" ?>);', 100);">
      <div class="container-fluid" style='padding: 0; margin-bottom: 0px !important' >
         <section id="header" class="container-fluid">
            <div id="logo" class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
               <a href="/"><span class="blue">D</span>elay-<span class="blue">P</span>lay</a>
            </div>
            <section id="mainBtnHeader" class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
               <span class="blue">R</span>ecord
            </section>
            <div id="closeButton" class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
               <div id="btnExit">Logout <img src="images/cross.png" alt=""></div>
            </div>
            <div style="clear:both"></div>
         </section>
         <section id="mainButtons">
            <div id="MainBtnBmp">
               <img src="images/mainPhoto.png" alt=""> <span>Photo</span>
            </div>
            <div id="MainBtnConf">
               <img src="images/mainConf.png" alt="">
            </div>
            <div id="MainBtnAvi">
               <img src="images/mainVideo.png" alt=""> <span>Video</span>
            </div>
            <div style="clear:both"></div>
         </section>
         <!--
            <input id="toggle_display" type="button" class="btn btn-primary" value="<?php echo $toggleButton; ?>" style="position:absolute;top:60px;right:10px;" onclick="set_display(this.value);">
            -->
         <div class="text-center liveimage">
            <div><img id="mjpeg_dest" <?php if(file_exists("pipan_on")) echo "ontouchstart=\"pipan_start()\""; ?> onclick="toggle_fullscreen(this);" src="/loading.jpg"></div>
            <!-- <div id="main-buttons" <?php echo $displayStyle; ?> >
               <input id="video_button" type="button" class="btn btn-primary">
               <input id="image_button" type="button" class="btn btn-primary">
               <input id="timelapse_button" type="button" class="btn btn-primary">
               <input id="md_button" type="button" class="btn btn-primary">
               <input id="halt_button" type="button" class="btn btn-danger">
               </div> -->
         </div>
         <section id="subGallery">
            <section id="showGalleryBtn">
               <span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
               <span class="blue">G</span>allery
            </section>
            <!-- галерея -->
            <section class="mediaContainer"> 
            </section>
         </section>
         <!-- нижние кнопки -->
         <section id="footerButtons">
            <div class="footerMenuButton" id="footerSelect">
               <span class="blue">S</span>elect   
            </div>
            <div class="footerMenuButton clearBtn" id="footerClearAll">
               <span class="blue">C</span>lear
            </div>
            <div class="footerMenuButton" id="footerSelectAction">
               <span class="blue">S</span>elected
            </div>
            <div class="footerMenuButton" id="footerSelectCancel">
               <span class="blue">C</span>ancel
            </div>
         </section>
         <!-- меню мультивыбора -->
         <div id="multiMenu">
            <div id="multiMenuContent"></div>
            <div id="multiMenuCancel">Back</div>
         </div>
         <!-- форма настроек -->
         <div id="configsForm">
            <div class="configFormControls">
               <h3><span class="blue">C</span>onfiguration</h3>
               <table class="table table-striped">
                  <tr>
                     <td>Resolutions:</td>
                     <td>
                        Load Preset: 
                        <select onchange="set_preset(this.value)">
                           <option value="1920 1080 25 25 2592 1944">Select option...</option>
                           <option value="1920 1080 25 25 2592 1944">Std FOV</option>
                           <option value="1296 730 25 25 2592 1944">16:9 wide FOV</option>
                           <option value="1296 976 25 25 2592 1944">4:3 full FOV</option>
                           <option value="1920 1080 01 30 2592 1944">Std FOV, x30 Timelapse</option>
                        </select>
                        <br>
                        Custom Values:<br>
                        Video res: <?php makeInput('video_width', 4); ?>x<?php makeInput('video_height', 4); ?>px<br>
                        Video fps: <?php makeInput('video_fps', 2); ?>recording, <?php makeInput('MP4Box_fps', 2); ?>boxing<br>
                        Image res: <?php makeInput('image_width', 4); ?>x<?php makeInput('image_height', 4); ?>px<br>
                        <input type="button" value="OK" onclick="set_res();">
                     </td>
                  </tr>
                  <tr>
                     <td>Timelapse-Interval (0.1...3200):</td>
                     <td><?php makeInput('tl_interval', 4); ?>s <input type="button" value="OK" onclick="send_cmd('tv ' + 10 * document.getElementById('tl_interval').value)"></td>
                  </tr>
                  <tr>
                     <td>Annotation (max 127 characters):</td>
                     <td>
                        Text: <?php makeInput('annotation', 20); ?><input type="button" value="OK" onclick="send_cmd('an ' + encodeURI(document.getElementById('annotation').value))"><input type="button" value="Default" onclick="document.getElementById('annotation').value = 'RPi Cam %Y.%M.%D_%h:%m:%s'; send_cmd('an ' + encodeURI(document.getElementById('annotation').value))"><br>
                        Background: ><select onchange="send_cmd('ab ' + this.value)"><?php makeOptions($options_ab, 'anno_background'); ?></select>
                     </td>
                  </tr>
                  <?php if (file_exists("pilight_on")) pilight_controls(); ?>
                  <tr>
                     <td>Buffer (1000... ms), default 0:</td>
                     <td><?php makeInput('video_buffer', 4); ?><input type="button" value="OK" onclick="send_cmd('bu ' + document.getElementById('video_buffer').value)"></td>
                  </tr>
                  <tr>
                     <td>Sharpness (-100...100), default 0:</td>
                     <td><?php makeInput('sharpness', 4); ?><input type="button" value="OK" onclick="send_cmd('sh ' + document.getElementById('sharpness').value)"></td>
                  </tr>
                  <tr>
                     <td>Contrast (-100...100), default 0:</td>
                     <td><?php makeInput('contrast', 4); ?><input type="button" value="OK" onclick="send_cmd('co ' + document.getElementById('contrast').value)">
                     </td>
                  </tr>
                  <tr>
                     <td>Brightness (0...100), default 50:</td>
                     <td><?php makeInput('brightness', 4); ?><input type="button" value="OK" onclick="send_cmd('br ' + document.getElementById('brightness').value)"></td>
                  </tr>
                  <tr>
                     <td>Saturation (-100...100), default 0:</td>
                     <td><?php makeInput('saturation', 4); ?><input type="button" value="OK" onclick="send_cmd('sa ' + document.getElementById('saturation').value)"></td>
                  </tr>
                  <tr>
                     <td>ISO (100...800), default 0:</td>
                     <td><?php makeInput('iso', 4); ?><input type="button" value="OK" onclick="send_cmd('is ' + document.getElementById('iso').value)"></td>
                  </tr>
                  <tr>
                     <td>Metering Mode, default 'average':</td>
                     <td><select onchange="send_cmd('mm ' + this.value)"><?php makeOptions($options_mm, 'metering_mode'); ?></select></td>
                  </tr>
                  <tr>
                     <td>Video Stabilisation, default: 'off'</td>
                     <td><select onchange="send_cmd('vs ' + this.value)"><?php makeOptions($options_vs, 'video_stabilisation'); ?></select></td>
                  </tr>
                  <tr>
                     <td>Exposure Compensation (-10...10), default 0:</td>
                     <td><?php makeInput('exposure_compensation', 4); ?><input type="button" value="OK" onclick="send_cmd('ec ' + document.getElementById('exposure_compensation').value)"></td>
                  </tr>
                  <tr>
                     <td>Exposure Mode, default 'auto':</td>
                     <td><select onchange="send_cmd('em ' + this.value)"><?php makeOptions($options_em, 'exposure_mode'); ?></select></td>
                  </tr>
                  <tr>
                     <td>White Balance, default 'auto':</td>
                     <td><select onchange="send_cmd('wb ' + this.value)"><?php makeOptions($options_wb, 'white_balance'); ?></select></td>
                  </tr>
                  <tr>
                     <td>Image Effect, default 'none':</td>
                     <td><select onchange="send_cmd('ie ' + this.value)"><?php makeOptions($options_ie, 'image_effect'); ?></select></td>
                  </tr>
                  <tr>
                     <td>Colour Effect, default 'disabled':</td>
                     <td><select id="ce_en"><?php makeOptions($options_ce_en, 'colour_effect_en'); ?></select>
                        u:v = <?php makeInput('ce_u', 4, 'colour_effect_u'); ?>:<?php makeInput('ce_v', 4, 'colour_effect_v'); ?>
                        <input type="button" value="OK" onclick="set_ce();">
                     </td>
                  </tr>
                  <tr>
                     <td>Rotation, default 0:</td>
                     <td><select onchange="send_cmd('ro ' + this.value)"><?php makeOptions($options_ro, 'rotation'); ?></select></td>
                  </tr>
                  <tr>
                     <td>Flip, default 'none':</td>
                     <td><select onchange="send_cmd('fl ' + this.value)"><?php makeOptions($options_fl, 'flip'); ?></select></td>
                  </tr>
                  <tr>
                     <td>Sensor Region, default 0/0/65536/65536:</td>
                     <td>
                        x<?php makeInput('roi_x', 5, 'sensor_region_x'); ?> y<?php makeInput('roi_y', 5, 'sensor_region_y'); ?> w<?php makeInput('roi_w', 5, 'sensor_region_w'); ?> h<?php makeInput('roi_h', 4, 'sensor_region_h'); ?> <input type="button" value="OK" onclick="set_roi();">
                     </td>
                  </tr>
                  <tr>
                     <td>Shutter speed (0...330000), default 0:</td>
                     <td><?php makeInput('shutter_speed', 4); ?><input type="button" value="OK" onclick="send_cmd('ss ' + document.getElementById('shutter_speed').value)">
                     </td>
                  </tr>
                  <tr>
                     <td>Image quality (0...100), default 85:</td>
                     <td>
                        <?php makeInput('image_quality', 4); ?><input type="button" value="OK" onclick="send_cmd('qu ' + document.getElementById('image_quality').value)">
                     </td>
                  </tr>
                  <tr>
                     <td>Preview quality (0...100) Default 25:<br>Width (128...1024) Default 512:<br>Divider (1-16) Default 1:</td>
                     <td>
                        Qu: <?php makeInput('quality', 4); ?>
                        Wi: <?php makeInput('width', 4); ?>
                        Di: <?php makeInput('divider', 4); ?>
                        <input type="button" value="OK" onclick="set_preview();">
                     </td>
                  </tr>
                  <tr>
                     <td>Raw Layer, default: 'off'</td>
                     <td><select onchange="send_cmd('rl ' + this.value)"><?php makeOptions($options_rl, 'raw_layer'); ?></select></td>
                  </tr>
                  <tr>
                     <td>Video bitrate (0...25000000), default 17000000:</td>
                     <td>
                        <?php makeInput('video_bitrate', 10); ?><input type="button" value="OK" onclick="send_cmd('bi ' + document.getElementById('video_bitrate').value)">
                     </td>
                  </tr>
                  <tr>
                     <td>MP4 Boxing mode :</td>
                     <td><select onchange="send_cmd('bo ' + this.value)"><?php makeOptions($options_bo, 'MP4Box'); ?></select></td>
                  </tr>
                  <tr>
                     <td>Annotation size(0-99):</td>
                     <td>
                        <?php makeInput('anno_text_size', 3); ?><input type="button" value="OK" onclick="send_cmd('as ' + document.getElementById('anno_text_size').value)">
                     </td>
                  </tr>
                  <tr>
                     <td>Custom text color:</td>
                     <td><select id="at_en"><?php makeOptions($options_at_en, 'anno3_custom_text_colour'); ?></select>
                        y:u:v = <?php makeInput('at_y', 3, 'anno3_custom_text_Y'); ?>:<?php makeInput('at_u', 4, 'anno3_custom_text_U'); ?>:<?php makeInput('at_v', 4, 'anno3_custom_text_V'); ?>
                        <input type="button" value="OK" onclick="set_at();">
                     </td>
                  </tr>
                  <tr>
                     <td>Custom background color:</td>
                     <td><select id="ac_en"><?php makeOptions($options_ac_en, 'anno3_custom_background_colour'); ?></select>
                        y:u:v = <?php makeInput('ac_y', 3, 'anno3_custom_background_Y'); ?>:<?php makeInput('ac_u', 4, 'anno3_custom_background_U'); ?>:<?php makeInput('ac_v', 4, 'anno3_custom_background_V'); ?>
                        <input type="button" value="OK" onclick="set_ac();">
                     </td>
                  </tr>
                  <tr>
                     <td>Watchdog, default interval 3s, errors 3</td>
                     <td>Interval <?php makeInput('watchdog_interval', 3); ?>s&nbsp;&nbsp;&nbsp;&nbsp;Errors <?php makeInput('watchdog_errors', 3); ?>
                        <input type="button" value="OK" onclick="send_cmd('wd ' + 10 * document.getElementById('watchdog_interval').value + ' ' + document.getElementById('watchdog_errors').value)">
                     </td>
                  </tr>
               </table>
               <div class="btnConfigClose">Close</div>
            </div>
         </div>
         <div id="secondary-buttons" class="container-fluid text-center hideBtns" <?php echo $displayStyle; ?> >
            <?php  if (file_exists("pipan_on")) pipan_controls(); ?>
            <a href="preview.php" class="btn btn-default">Download Videos and Images</a>
            &nbsp;&nbsp;
            <a href="motion.php" class="btn btn-default">Edit motion settings</a>
            &nbsp;&nbsp;
            <a href="schedule.php" class="btn btn-default">Edit schedule settings</a>
         </div>
         <!-- плееры -->
         <div id="screenPlayerSurface"></div>
         <div id="screenPlayer">
            <div class="screenPlayerControls">
               <div class="btnScrLeft"></div>
               <div class="btnScrRight"></div>
               <div class="clear"></div>
            </div>
            <div class="screenPlayerWinControls">
               <div class="btnScrClose">Back</div>
            </div>
         </div>
         <div id="videoPlayerSurface"></div>
         <div id="videoPlayer">
            <div class="videoPlayerWinControls">
               <div class="btnVidClose">Back</div>
            </div>
         </div>
         <!-- формы почты-->
         <!-- одно фото -->
         <div id="sendPhotoForm" class="emailForm">
            <h3><span class="blue">S</span>end photo by E-mail</h3>
            <hr>
            <div class="nameForm">
               <div class="input-group">
                  <span class="input-group-addon">Your name</span>
                  <input class="mailInputField emailNameField" id="screenSenderName" type="text" required>
               </div>
            </div>
            <div class="recieverEmailForm">
               <div class="input-group">
                  <span class="input-group-addon">Reciever E-Mail</span>
                  <input class="mailInputField emailRecieverField" type="email" id="screenRecieverEmail" type="text" required>
               </div>
            </div>
            <div style="clear:both"></div>
            <div class="mailCommentContainer">
               <h4>Comment</h4>
               <textarea style="width:100% !important" class="screenComment emailCommentField" rows="3"></textarea>
            </div>
            <div class="mailScreenPreviewContainer">
               <h4>Photo:</h4>
               <img style="width:100% !important" id="emailScreen" class="photoToEmail" src="">
            </div>
            <div class="mailSendButtons">
               <div class="btnCancelMail" id="btnCancelScreenMail">Back</div>
               <div class="btnSendMail" id="btnSendScreenMail">Send</div>
            </div>
         </div>
         <!-- одно видео -->
         <div id="sendVideoForm" class="emailForm">
            <h3><span class="blue">S</span>end video by E-mail</h3>
            <hr>
            <div class="nameForm">
               <div class="input-group">
                  <span class="input-group-addon">Your name</span>
                  <input class="mailInputField emailNameField" id="videoSenderName" type="text" required>
               </div>
            </div>
            <div class="recieverEmailForm">
               <div class="input-group">
                  <span class="input-group-addon">Reciever E-Mail</span>
                  <input class="mailInputField emailRecieverField" type="email" id="videoRecieverEmail" type="text" required>
               </div>
            </div>
            <div style="clear:both"></div>
            <div class="mailCommentContainer">
               <h4>Comment</h4>
               <textarea style="width:100% !important" class="videoComment emailCommentField" rows="3"></textarea>
            </div>
            <div class="mailVideoPreviewContainer">
               <h4>Video: <a target="_blank" id="emailVideo" class="videoToEmail" href="">Link</a></h4>
            </div>
            <div class="mailSendButtons">
               <div class="btnCancelMail" id='btnCancelVideoMail'>Back</div>
               <div class="btnSendMail" id="btnSendVideoMail">Send</div>
            </div>
         </div>
         <!-- несколько фото -->
         <div id="multiSendPhotoForm" class="emailForm">
            <h3><span class="blue">S</span>end photos by E-mail</h3>
            <hr>
            <div class="nameForm">
               <div class="input-group">
                  <span class="input-group-addon">Your name</span>
                  <input class="mailInputField emailNameField" id="multiScreenSenderName" type="text" required>
               </div>
            </div>
            <div class="recieverEmailForm">
               <div class="input-group">
                  <span class="input-group-addon">Reciever E-Mail</span>
                  <input class="mailInputField emailRecieverField" type="email" id="multiScreenRecieverEmail" type="text" required>
               </div>
            </div>
            <div style="clear:both"></div>
            <div class="mailCommentContainer">
               <h4>Comment</h4>
               <textarea style="width:100% !important" class="screenComment emailCommentField"  rows="3"></textarea>
            </div>
            <div class="mailScreenPreviewContainer">
               <h4>Photos: </h4>
               <img style="width:100% !important" id="multiEmailScreen" src="">
            </div>
            <div class="mailSendButtons">
               <div class="btnCancelMail" id="multiBtnCancelScreenMail">Back</div>
               <div class="btnSendMail" id="multiBtnSendScreenMail">Send</div>
            </div>
         </div>
         <!-- несколько видео -->
         <div id="multiSendVideoForm" class="emailForm">
            <h3><span class="blue">S</span>end videos by E-mail</h3>
            <hr>
            <div class="nameForm">
               <div class="input-group">
                  <span class="input-group-addon">Your name</span>
                  <input class="mailInputField emailNameField" id="multiVideoSenderName" type="text" required>
               </div>
            </div>
            <div class="recieverEmailForm">
               <div class="input-group">
                  <span class="input-group-addon">Reciever E-Mail</span>
                  <input class="mailInputField emailRecieverField" type="email" id="multiVideoRecieverEmail" type="text" required>
               </div>
            </div>
            <div style="clear:both"></div>
            <div class="mailCommentContainer">
               <h4>Comment</h4>
               <textarea style="width:100% !important" class="videoComment emailCommentField" rows="3"></textarea>
            </div>
            <div class="mailVideoPreviewContainer">
               <h4>Videos: </h4>
            </div>
            <div class="mailSendButtons">
               <div class="btnCancelMail" id='multiBtnCancelVideoMail'>Back</div>
               <div class="btnSendMail" id="multiBtnSendVideoMail">Send</div>
            </div>
         </div>
         <!-- фото и видео -->
         <div id="multiSendPhotoVideoForm" class="emailForm">
            <h3><span class="blue">S</span>end videos and photos by E-mail</h3>
            <hr>
            <div class="nameForm">
               <div class="input-group">
                  <span class="input-group-addon">Your name</span>
                  <input class="mailInputField emailNameField" id="multiPhotoVideoSenderName" type="text" required>
               </div>
            </div>
            <div class="recieverEmailForm">
               <div class="input-group">
                  <span class="input-group-addon">Reciever E-mail</span>
                  <input class="mailInputField emailRecieverField" type="email" id="multiPhotoVideoRecieverEmail" type="text" required>
               </div>
            </div>
            <div style="clear:both"></div>
            <div class="mailCommentContainer">
               <h4>Comment</h4>
               <textarea style="width:100% !important" class="videoComment emailCommentField" rows="3"></textarea>
            </div>
            <div class="mailVideoPreviewContainer">
               <h4>Media: </h4>
            </div>
            <div class="mailSendButtons">
               <div class="btnCancelMail" id='multiBtnCancelPhotoVideoMail'>Back</div>
               <div class="btnSendMail" id="multiBtnSendPhotoVideoMail">Send</div>
            </div>
         </div>
         <div class="container-fluid text-center hideBtns">
            <div class="panel-group" id="accordion" <?php echo $displayStyle; ?> >
               <div class="panel panel-default">
                  <div class="panel-heading">
                     <h2 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Camera Settings</a>
                     </h2>
                  </div>
               </div>
               <div class="panel panel-default">
                  <div class="panel-heading">
                     <h2 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">System</a>
                     </h2>
                  </div>
                  <div id="collapseTwo" class="panel-collapse collapse">
                     <div class="panel-body">
                        <input id="toggle_stream" type="button" class="btn btn-primary" value="<?php echo $streamButton; ?>" onclick="set_stream_mode(this.value);">
                        <input id="shutdown_button" type="button" value="shutdown system" onclick="sys_shutdown();" class="btn btn-danger">
                        <input id="reboot_button" type="button" value="reboot system" onclick="sys_reboot();" class="btn btn-danger">
                        <input id="reset_button" type="button" value="reset settings" onclick="send_cmd('rs 1');setTimeout(function(){location.reload(true);}, 1000);" class="btn btn-danger">
                        <form action='<?php echo ROOT_PHP; ?>' method='POST'>
                           <br>Style
                           <select name='extrastyle' id='extrastyle'>
                           <?php getExtraStyles(); ?>
                           </select>
                           &nbsp;<button type="submit" name="OK" value="OK" >OK</button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <?php if ($debugString != "") echo "$debugString<br>"; ?>
      </div>
   </body>
</html>