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
      // エラー画面に飛ばす
      window.location.href = "error.html";
    }

    // データ取得
    let data = await getData(`data/${region}/${dir}/data.json`);

    if (!data) {
      // エラー画面に飛ばす
      window.location.href = "error.html";
    }

    if (!data.title) {
      // エラー画面に飛ばす
      window.location.href = "error.html";
    }


    // テンプレート取得
    const template = $($("template").html());

    // 取得したデータをテンプレートに設定
    template.find(".title").text(data.title);
    template.find(".description").text(data.description);
    template.find(".descriptionDetail").text(data.descriptionDetail);
    template.find("#btnBack").attr("href", `list.html?region=${region}`);

    if (Array.isArray(data.author)) {
      let isAdd = false;
      const authorTemplate = template.find(".author").clone()
      for (const authorItem of data.author) {
        const author = authorTemplate.clone();
        if (isAdd) {
          author.text(authorItem);
          author.attr("href", `https://twitter.com/${authorItem.substring(1)}`);

          template.find(".author").parent().append(author, '\n');
        } else {
          template.find(".author").text(authorItem);
          template.find(".author").attr("href", `https://twitter.com/${authorItem.substring(1)}`);
          isAdd = true;
        }
      }
    } else {
      template.find(".author").text(data.author);
      template.find(".author").attr("href", `https://twitter.com/${data.author.substring(1)}`);
    }    

    // カルーセルに画像を追加
    for (const [index, item]  of data.images.entries()) {
      const carouselTemplate = $('<div class="carousel-item"><img src="" class="d-block w-100"></div>');

      carouselTemplate.find("img").attr("src", `data/${region}/${dir}/${item}`);
      if (index === 0) {
        carouselTemplate.addClass("active");
      }
      template.find("#carouselItem").append(carouselTemplate);
    }

    // 要素を追加
    $(".detail").append(template);

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