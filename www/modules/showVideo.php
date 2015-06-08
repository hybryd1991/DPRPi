<?
$script = '<script>var player = CodoPlayer("media/'.$_GET['video'].'",{
				                  width: 600,
				                  height: 338,
				                  controls: {
				                     show: "auto" / "always" / "never",
				                     hideDelay: 5,
				                     play: true,
				                     playBtn: true,
				                     seek: true,
				                     volume: false / "orizontal" / "vertical",
				                     fullscreen: true,
				                     title: true,
				                     time: true
				                  }
				              });</script>';
echo $script;
?>