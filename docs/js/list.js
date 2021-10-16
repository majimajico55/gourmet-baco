$(async function() {

  // URLパラメータを取得
  const region = getParams("region");

  if (!region) {
    // TODO: エラー画面に飛ばす
    throw new Error();
  }

  // データ取得
  let data = await getData(`data/${region}/datalist.json`);

  if (!data || !Array.isArray(data)) {
    // データが取得できなかった場合
    // および、取得したデータが配列でない場合、何もしない
    return;
  }

  // テンプレート取得
  const template = $($("template").html());

  // 取得したデータをテンプレートの所定の項目に入れていく
  for (const item of data) {

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

  }

});