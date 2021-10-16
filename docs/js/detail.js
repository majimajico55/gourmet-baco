$(function() {

  // =======================
  // 初期化処理
  // =======================
  const init = function() {
    // 地図表示領域の高さ設定
    setMapHeight();
  };

  // =======================
  // 地図表示領域の高さ設定
  // =======================
  const setMapHeight = function() {
    $("#mapid").height($("#mapid").parent().width());
  };
  
  // 初期化処理
  init();

  // 地図表示
  var map = L.map('mapid', {
    center: [43.079063241110724, 141.4976941472691],
    zoom: 16,
  });
  var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  });
  tileLayer.addTo(map);

  // マーカー画像の場所を指定する
  L.marker([43.079063241110724, 141.4976941472691]).addTo(map);   

  // 画面サイズ変更時処理
  $(window).resize(function() {
    // 地図表示領域の高さ設定
    setMapHeight();
  });  
});