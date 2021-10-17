$(async function() {

  // ヘッダーの高さ取得
  const headerHeight = $("header").height();

  // コンテナに対してマージントップ設定
  $(".container").css("margin-top", headerHeight + 30);

  // URLパラメータを取得
  const region = getParams("region");

  if (!region) {
    // TODO: エラー画面に飛ばす
    throw new Error();
  }

  // データ取得
  let data = await getData(`data/${region}/datalist.json`);

  if (!data || !Array.isArray(data)) {
    // TODO: エラー画面に飛ばす
    throw new Error();
  }

  // テンプレート取得
  const template = $($("template").html());

  // 追加フラグ
  let isAppend = false;

  // 取得したデータをテンプレートの所定の項目に入れていく
  for (const item of data) {

    if (!item.title) {
      continue;
    }

    const _template = template.clone();

    _template.find(".thumbnail").attr("src", `data/${region}/${item.dir}/${item.thumbnail}`);
    _template.find(".title").text(item.title);
    _template.find(".description").text(item.description);
    _template.find(".author").text(item.author);

    // アイコンオブジェクトを追加
    if (item.category === "gourmet") {
      _template.find("i").addClass("fas fa-utensils");
    } else if  (item.category === "store") {
      _template.find("i").addClass("fas fa-store");
    } else {
      _template.find("i").addClass("fas fa-question");
    }

    // 遷移先URLを設定
    _template.find("a").attr("href", `detail.html?region=${region}&dir=${item.dir}`);


    // 子要素として追加
    $("#list").append(_template);

    isAppend = true;
  }

  if (!isAppend) {
    // TODO: エラー画面に飛ばす
    throw new Error();
  }

});