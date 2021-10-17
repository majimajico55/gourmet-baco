$(function() {

  /** =======================
   * 初期化処理
   * ======================= */
  const init = async function() {

    // ヘッダーの高さ取得
    const headerHeight = $("header").height();

    // コンテナに対してマージントップ設定
    $(".container").css("margin-top", headerHeight + 30);

    // URLパラメータを取得
    const region = getParams("region");
    const dir = getParams("dir");

    if (!region || !dir) {
      // TODO: エラー画面に飛ばす
      throw new Error();
    }

    // データ取得
    let data = await getData(`data/${region}/${dir}/data.json`);

    if (!data) {
      // TODO: エラー画面に飛ばす
      throw new Error();
    }

    // 取得したデータをテンプレートに設定
    $(".title").text(data.title);
    $(".description").text(data.description);
    $(".descriptionDetail").text(data.descriptionDetail);
    $(".author").text(data.author);
    $("#btnBack").attr("href", `list.html?region=${region}`)

    // カルーセルに画像を追加
    for (const [index, item]  of data.images.entries()) {
      const template = $('<div class="carousel-item"><img src="" class="d-block w-100"></div>');

      template.find("img").attr("src", `data/${region}/${dir}/${item}`);
      if (index === 0) {
        template.addClass("active");
      }
      $("#carouselItem").append(template);
    }

    // 地図表示領域の高さ設定
    setMapHeight();

    // 地図表示
    var map = L.map('mapid', {
      center: [data.lat, data.lon],
      zoom: 16,
    });
    var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    });
    tileLayer.addTo(map);

    // マーカー画像の場所を指定する
    L.marker([data.lat, data.lon]).addTo(map);   

  };

  /** =======================
   * 地図表示領域の高さ設定
   * ======================= */
  const setMapHeight = function() {
    $("#mapid").height($("#mapid").parent().width());
  };
  
  // 初期化処理
  init();

  // 画面サイズ変更時処理
  $(window).resize(function() {
    // 地図表示領域の高さ設定
    setMapHeight();
  });  
});