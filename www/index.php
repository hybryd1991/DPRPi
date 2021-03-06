<!DOCTYPE html>
<?php
   define('BASE_DIR', dirname(__FILE__));
   require_once(BASE_DIR.'/config.php');
   require_once($_SERVER['DOCUMENT_ROOT'].'/modules/locals/locals.php');

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

   //настройки
   $jsonPath = $_SERVER['DOCUMENT_ROOT'].'/modules/appconfig.json';
   $configStr = file_get_contents($jsonPath);
   $appconfig = json_decode($configStr);
   ?>
<html>
   <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <title>Delay-Play</title>
      <link rel="stylesheet" href="css/style_minified.css" />
      <link rel="stylesheet" href="<?php echo getStyle(); ?>" />
      <link href="extras/bootstrap3/css/bootstrap.css" rel="stylesheet" media="screen">
      <link href="extras/bootstrap3/css/bootstrap-theme.css" rel="stylesheet" media="screen">
      <link href="extras/jqueryUI/jquery-ui.css" rel="stylesheet" media="screen">
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
      <script type="text/javascript" src="js/publish.js"></script>
      <script type="text/javascript" src="http://vk.com/js/api/share.js?90" charset="windows-1251"></script>
      <script type="text/javascript" src="js/counter.js"></script>
      <script type="text/javascript" src="js/jquery-ui.js"></script>
      <script type="text/javascript" src="js/locals.js"></script>
      <script type="text/javascript" src="js/stream_socialAuthorize.js"></script>
   </head>
   <body onload="setTimeout('init(<?php echo "$mjpegmode, $video_fps, $divider" ?>);', 100);">

   <script type="text/javascript">
      var appconfig = JSON.parse('<?echo $configStr?>');
   </script>

      <div class="container-fluid" style='padding: 0; margin-bottom: 0px !important' >
         <section id="header" class="container-fluid">
            <div id="logo" class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
               <a href="/"><span class="blue">D</span>elay-<span class="blue">P</span>lay</a>
            </div>
            <section id="mainBtnHeader" class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
               <?=$localizations->mainGui->rec?>
            </section>
            <div id="closeButton" class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
               <div id="btnExit"><?=$localizations->mainGui->logout?> <img src="images/cross.png" alt=""></div>
            </div>
            <div style="clear:both"></div>
         </section>
         <section id="mainButtons">
            <div id="MainBtnBmp">
               <img src="images/mainPhoto.png" alt=""> <span><?=$localizations->mainGui->photo?></span>
            </div>
            <div id="MainBtnConf">
               <img src="images/mainConf.png" alt="">
            </div>
            <div id="MainBtnAvi">
               <img src="images/mainVideo.png" alt=""> <span><?=$localizations->mainGui->video?></span>
            </div>
            <div style="clear:both"></div>
         </section>
         <div class="text-center liveimage">
            <div><img id="mjpeg_dest" <?php if(file_exists("pipan_on")) echo "ontouchstart=\"pipan_start()\""; ?> onclick="toggle_fullscreen(this);" src="/loading.jpg"></div>
         </div>
         <section id="subGallery">
            <section id="showGalleryBtn">
               <span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
               <?=$localizations->mainGui->gallery?>
            </section>
            <!-- галерея -->
            <section class="mediaContainer"> 
            </section>
         </section>
         <!-- нижние кнопки -->
         <section id="footerButtons">
            <div class="footerMenuButton" id="footerSelect">
               <?=$localizations->mainGui->select?>
            </div>
            <div class="footerMenuButton clearBtn" id="footerClearAll">
               <?=$localizations->mainGui->clearAll?>
            </div>
            <div class="footerMenuButton" id="footerSelectAction">
               <?=$localizations->mainGui->withSelected?>
            </div>
            <div class="footerMenuButton" id="footerSelectCancel">
               <?=$localizations->mainGui->cancel?>
            </div>
         </section>
         <!-- меню мультивыбора -->
         <div id="multiMenu">
            <div id="multiMenuContent"></div>
            <div id="multiMenuCancel"><?=$localizations->buttons->back?></div>
         </div>
         <!-- форма настроек -->
         <div id="configsForm">
            <div class="configFormControls">
               <h3><?=$localizations->configs->header?></h3>
               <table class="table table-striped">
                  <tr>
                     <td>Resolutions:</td>
                     <td>
                        Load Preset: 
                        <select onchange="set_preset(this.value)">
                           <option value="1280 720 25 25 1280 720">Custom...</option>
                           <option value="1280 720 25 25 1280 720">1280 x 720</option>
                           <option value="720 1280 25 25 720 1280">720 x 1280</option>
                           <option value="1920 1080 25 25 1920 1080">1920 x 1080</option>
                           <option value="1080 1920 25 25 1080 1920">1080 x 1920</option>
                           <option value="640 480 25 25 640 480">640 x 480</option>
                           <option value="480 640 25 25 480 640">480 x 640</option>
                        </select>
                        <select onchange="send_cmd('ro ' + this.value)"><?php makeOptions($options_ro, 'rotation'); ?></select>
                        <br>
                        Custom Values:<br>
                        Video res: <?php makeInput('video_width', 4); ?>x<?php makeInput('video_height', 4); ?>px<br>
                        Video fps: <?php makeInput('video_fps', 2); ?>recording, <?php makeInput('MP4Box_fps', 2); ?>boxing<br>
                        Image res: <?php makeInput('image_width', 4); ?>x<?php makeInput('image_height', 4); ?>px<br>
                        <input type="button" value="OK" onclick="set_res();">
                     </td>
                  </tr>
                  <tr>
                     <td>Rotation, default 0:</td>
                     <td></td>
                  </tr>
                  
                  <tr>
                     <td>Annotation (max 127 characters):</td>
                     <td>
                        Text: <?php makeInput('annotation', 20); ?><input type="button" value="OK" onclick="send_cmd('an ' + encodeURI(document.getElementById('annotation').value))"><input type="button" value="Default" onclick="document.getElementById('annotation').value = 'RPi Cam %Y.%M.%D_%h:%m:%s'; send_cmd('an ' + encodeURI(document.getElementById('annotation').value))"><br>
                        Background: ><select onchange="send_cmd('ab ' + this.value)"><?php makeOptions($options_ab, 'anno_background'); ?></select>
                     </td>
                  </tr>
                  <tr>
                  <td>Delay before photo: <span id="photoDelaySliderVal">3</span></td>
                  <td>
                     <div id="photoDelaySlider"></div>
                     <script type="text/javascript">
                        $( "#photoDelaySlider" ).slider({
                           range: "max",
                           min: 0,
                           max: 10,
                           value: 3,
                           slide: function( event, ui ) {
                             $( "#photoDelaySliderVal" ).html( ui.value );
                           }        
                        });                
                     </script>
                     <br><br><br>
                  </td></tr>
                  
               </table>
               <a class="btn btn-primary" data-toggle="collapse" href="#additionalCongig" aria-expanded="false" aria-controls="collapseExample" style="width: 100%">
                  More...
               </a>
               <div class="collapse" id="additionalCongig">
                  <div class="well">
               <table>
                  <?php if (file_exists("pilight_on")) pilight_controls(); ?>
                  <tr>
                     <td>Buffer (1000... ms), default 0:</td>
                     <td><?php makeInput('video_buffer', 4); ?><input type="button" value="OK" onclick="send_cmd('bu ' + document.getElementById('video_buffer').value)"></td>
                  </tr>
                  <tr>
                     <td>Timelapse-Interval (0.1...3200):</td>
                     <td><?php makeInput('tl_interval', 4); ?>s <input type="button" value="OK" onclick="send_cmd('tv ' + 10 * document.getElementById('tl_interval').value)"></td>
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
               </div></div>
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
               <div class="btnScrClose"><?=$localizations->buttons->back?></div>
            </div>
         </div>
         <div id="videoPlayerSurface"></div>
         <div id="videoPlayer">
            <div class="videoPlayerWinControls">
               <div class="btnVidClose"><?=$localizations->buttons->back?></div>
            </div>
         </div>
         <!-- формы почты-->
         <!-- одно фото -->
         <div id="sendPhotoForm" class="emailForm">
            <h3><?=$localizations->email->headerPhoto?></h3>
            <hr>
            <div class="nameForm">
               <div class="input-group">
                  <span class="input-group-addon"><?=$localizations->email->yourName?></span>
                  <input class="mailInputField emailNameField" id="screenSenderName" type="text" required>
               </div>
            </div>
            <div class="recieverEmailForm">
               <div class="input-group">
                  <span class="input-group-addon"><?=$localizations->email->recieverEmail?></span>
                  <input class="mailInputField emailRecieverField" type="email" id="screenRecieverEmail" type="text" required>
               </div>
            </div>
            <div style="clear:both"></div>
            <div class="mailCommentContainer">
               <h4><?=$localizations->email->emailComment?></h4>
               <textarea style="width:100% !important" class="screenComment emailCommentField" rows="3"></textarea>
            </div>
            <div class="mailScreenPreviewContainer">
               <h4><?=$localizations->email->linkLabelPhoto?></h4>
               <img style="width:100% !important" id="emailScreen" class="photoToEmail" src="">
            </div>
            <div class="mailSendButtons">
               <div class="btnCancelMail" id="btnCancelScreenMail"><?=$localizations->buttons->back?></div>
               <div class="btnSendMail" id="btnSendScreenMail"><?=$localizations->buttons->send?></div>
            </div>
         </div>
         <!-- одно видео -->
         <div id="sendVideoForm" class="emailForm">
            <h3><?=$localizations->email->headerVideo?></h3>
            <hr>
            <div class="nameForm">
               <div class="input-group">
                  <span class="input-group-addon"><?=$localizations->email->yourName?></span>
                  <input class="mailInputField emailNameField" id="videoSenderName" type="text" required>
               </div>
            </div>
            <div class="recieverEmailForm">
               <div class="input-group">
                  <span class="input-group-addon"><?=$localizations->email->recieverEmail?></span>
                  <input class="mailInputField emailRecieverField" type="email" id="videoRecieverEmail" type="text" required>
               </div>
            </div>
            <div style="clear:both"></div>
            <div class="mailCommentContainer">
               <h4><?=$localizations->email->emailComment?></h4>
               <textarea style="width:100% !important" class="videoComment emailCommentField" rows="3"></textarea>
            </div>
            <div class="mailVideoPreviewContainer">
               <h4><?=$localizations->email->linkLabelVideo?> <a target="_blank" id="emailVideo" class="videoToEmail" href="">Link</a></h4>
            </div>
            <div class="mailSendButtons">
               <div class="btnCancelMail" id='btnCancelVideoMail'><?=$localizations->buttons->back?></div>
               <div class="btnSendMail" id="btnSendVideoMail"><?=$localizations->buttons->send?></div>
            </div>
         </div>
         <!-- несколько фото -->
         <div id="multiSendPhotoForm" class="emailForm">
            <h3><?=$localizations->email->headerPhoto?></h3>
            <hr>
            <div class="nameForm">
               <div class="input-group">
                  <span class="input-group-addon"><?=$localizations->email->yourName?></span>
                  <input class="mailInputField emailNameField" id="multiScreenSenderName" type="text" required>
               </div>
            </div>
            <div class="recieverEmailForm">
               <div class="input-group">
                  <span class="input-group-addon"><?=$localizations->email->recieverEmail?></span>
                  <input class="mailInputField emailRecieverField" type="email" id="multiScreenRecieverEmail" type="text" required>
               </div>
            </div>
            <div style="clear:both"></div>
            <div class="mailCommentContainer">
               <h4><?=$localizations->email->emailComment?></h4>
               <textarea style="width:100% !important" class="screenComment emailCommentField"  rows="3"></textarea>
            </div>
            <div class="mailScreenPreviewContainer">
               <h4><?=$localizations->email->linkLabelPhoto?></h4>
               <img style="width:100% !important" id="multiEmailScreen" src="">
            </div>
            <div class="mailSendButtons">
               <div class="btnCancelMail" id="multiBtnCancelScreenMail"><?=$localizations->buttons->back?></div>
               <div class="btnSendMail" id="multiBtnSendScreenMail"><?=$localizations->buttons->send?></div>
            </div>
         </div>
         <!-- несколько видео -->
         <div id="multiSendVideoForm" class="emailForm">
            <h3><?=$localizations->email->headerVideo?></h3>
            <hr>
            <div class="nameForm">
               <div class="input-group">
                  <span class="input-group-addon"><?=$localizations->email->yourName?></span>
                  <input class="mailInputField emailNameField" id="multiVideoSenderName" type="text" required>
               </div>
            </div>
            <div class="recieverEmailForm">
               <div class="input-group">
                  <span class="input-group-addon"><?=$localizations->email->recieverEmail?></span>
                  <input class="mailInputField emailRecieverField" type="email" id="multiVideoRecieverEmail" type="text" required>
               </div>
            </div>
            <div style="clear:both"></div>
            <div class="mailCommentContainer">
               <h4><?=$localizations->email->emailComment?></h4>
               <textarea style="width:100% !important" class="videoComment emailCommentField" rows="3"></textarea>
            </div>
            <div class="mailVideoPreviewContainer">
               <h4><?=$localizations->email->linkLabelVideo?> </h4>
            </div>
            <div class="mailSendButtons">
               <div class="btnCancelMail" id='multiBtnCancelVideoMail'><?=$localizations->buttons->back?></div>
               <div class="btnSendMail" id="multiBtnSendVideoMail"><?=$localizations->buttons->send?></div>
            </div>
         </div>
         <!-- фото и видео -->
         <div id="multiSendPhotoVideoForm" class="emailForm">
            <h3><?=$localizations->email->headerMedia?></h3>
            <hr>
            <div class="nameForm">
               <div class="input-group">
                  <span class="input-group-addon"><?=$localizations->email->yourName?></span>
                  <input class="mailInputField emailNameField" id="multiPhotoVideoSenderName" type="text" required>
               </div>
            </div>
            <div class="recieverEmailForm">
               <div class="input-group">
                  <span class="input-group-addon"><?=$localizations->email->recieverEmail?></span>
                  <input class="mailInputField emailRecieverField" type="email" id="multiPhotoVideoRecieverEmail" type="text" required>
               </div>
            </div>
            <div style="clear:both"></div>
            <div class="mailCommentContainer">
               <h4><?=$localizations->email->emailComment?></h4>
               <textarea style="width:100% !important" class="videoComment emailCommentField" rows="3"></textarea>
            </div>
            <div class="mailVideoPreviewContainer">
               <h4><?=$localizations->email->linkLabelMedia?> </h4>
            </div>
            <div class="mailSendButtons">
               <div class="btnCancelMail" id='multiBtnCancelPhotoVideoMail'><?=$localizations->buttons->back?></div>
               <div class="btnSendMail" id="multiBtnSendPhotoVideoMail"><?=$localizations->buttons->send?></div>
            </div>
         </div>
         <!-- форма выбора соцсети для публикации -->
         <div id="selectSocial">
            <h3><?=$localizations->publish->header?></h3>
            <hr>
            <div id="selectSocialContent">
               <div class="formContent">
                  <div id="vkShare">
                     Vkontakte
                  </div>
                  <div id="fbShare">
                     Facebook
                  </div>
               </div>
            </div>
            <div class="closeSelectSocial"><?=$localizations->buttons->back?></div>
         </div>

         <!-- стартовая форма настроек публикации -->
         <div id="socialAutorize">
            <h3><?=$localizations->groupMode->groupSelect->header?></h3>
            <hr>
            <div id="socialAutorizeBody">
               <h4><span class="blue">Facebook</span></h4>
               <div id="facebookAutorizeBody">
                  
               </div>
               <hr>
               <h4><span class="blue"><?=$localizations->groupMode->groupSelect->vk?></span></h4>
               <div id="vkAutorizeBody">
                  <div id="vkGroups">
                     
                  </div>
                  <div id="vkAlbums">
                     
                  </div>
               </div>
               <hr>
            </div>
            <div id="socialMessage">
               <h4><?=$localizations->groupMode->groupSelect->standartComment?></h4>
               <textarea class="form-control" name="" id="" cols="30" rows="3"></textarea>
            </div>
            <div id="btnStreamBegin"><?=$localizations->buttons->start?></div>
         </div>
         <!-- форма публикации потока -->
         <div id="selectSocialForm">
            <h3><?=$localizations->publish->header?></h3>
            <hr>
            <div id="socialAutorizeBody">
               <div class="btnVKSend"><img src="images/icon_vk.png" width="30" alt=""> <?=$localizations->publish->vk?></div>
               <div class="btnFBSend"><img src="images/icon_fb.png" width="30" alt=""> <?=$localizations->publish->fb?></div>
            </div>
            <div id="defSendSocialMessageContainer">
               <h4><?=$localizations->groupMode->publicationComment?></h4>
               <span class="socialMessagePrefix"></span>
               <span class="socialMessageSelf"></span>
            </div>
            <div class="sendSocialMessage">
               <textarea class="form-control" name="" id="" cols="30" rows="3"></textarea>
            </div>
            <h4><?=$localizations->groupMode->photoPreview?></h4>
            <div id="sendSocialPreview">
               
            </div>
            <div class="modal-footer">
               <button class="btn btn-black" id="btnStreamBegin" data-dismiss="modal"><?=$localizations->buttons->back?></button>
            </div>
            <div class="cancelPublic"><?=$localizations->buttons->back?></div>
         </div>
         <!-- форма групповой публикации потока -->
         <div id="selectSocialFormMulti">
            <h3><?=$localizations->publish->header?></h3>
            <hr>
            <div id="socialAutorizeBody">
               <div class="btnVKSend"><img src="images/icon_vk.png" width="30" alt=""> <?=$localizations->publish->vk?></div>
               <div class="btnFBSend"><img src="images/icon_fb.png" width="30" alt=""> <?=$localizations->publish->fb?></div>
            </div>
            <div id="defSendSocialMessageContainer">
               <h4><?=$localizations->groupMode->publicationComment?></h4>
               <span class="socialMessagePrefix"></span>
               <span class="socialMessageSelf"></span>
            </div>
            <div class="sendSocialMessage">
               <textarea class="form-control" name="" id="" cols="30" rows="3"></textarea>
            </div>
            <h4><?=$localizations->groupMode->photoPreview?></h4>
            <div id="sendSocialPreview">
               
            </div>
            <div class="modal-footer">
               <button class="btn btn-black" id="btnStreamBegin" data-dismiss="modal"><?=$localizations->buttons->back?></button>
            </div>
            <div class="cancelPublic"><?=$localizations->buttons->back?></div>
         </div>

         <div id="choseSocialFormContainer">
            <div id="choseSocialFormModal" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
               <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                     <div class="modal-body container-fluid">
                        <h3><?=$localizations->publish->header?></h3>
                        <hr>
                        <div id="socialAutorizeBody">
                           <div class='btnChoseSocialContainer'>
                              <button class="btn btn-black btnChoseSocial" id="btnFBSend"><?=$localizations->publish->fb?></button>
                           </div>
                           <div class='btnChoseSocialContainer'>
                              <button class="btn btn-black btnChoseSocial" id="btnVKSend"><?=$localizations->publish->vk?></button>
                           </div>
                        </div>
                        <h4><?=$localizations->groupMode->publicationComment?></h4>
                        <div id="defSendSocialMessageContainer">
                           <span id="socialMessagePrefix"></span>
                           <span id="socialMessageSelf"></span>
                        </div>
                        <div id="sendSocialMessage">
                           <textarea class="form-control" name="" id="" cols="30" rows="3"></textarea>
                        </div>
                        <h4><?=$localizations->groupMode->photoPreview?></h4>
                        <div id="sendSocialPreview">
                           
                        </div>
                        <div class="modal-footer">
                           <button class="btn btn-black" id="btnStreamBegin" data-dismiss="modal"><?=$localizations->buttons->back?></button>
                        </div>
                     </div>
                  </div>
               </div>
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