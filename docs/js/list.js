/** =======================
 * URLパラメータ取得処理
 * ======================= */
const getParams = function() {

  // URLパラメータから対象リージョンを取得
  const url = window.location.href;
  const regex = new RegExp("[?&]region(=([^&#]*)|&|#|$)");
  return regex.exec(url);
}

/** =======================
 * データ取得処理
 * ======================= */
const getData = async function() {

  // URLパラメータを取得
  const results = getParams();

  if (!results || !results[2]) {
    // TODO: エラー画面に飛ばす
    throw new Error();
  }

  const region = results[2];

  // 一覧データ取得
  const fileData = await fetch(`data/${region}/datalist.json`)
    .then(response => response.text());

  return JSON.parse(fileData);
};

$(async function() {

  // データ取得
  let data = await getData();

  if (!data || !Array.isArray(data)) {
    // データが取得できなかった場合
    // および、取得したデータが配列でない場合、何もしない
    return;
  }

  // URLパラメータを取得
  const results = getParams();
  const region = results[2];

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

    // 子要素として追加
    $("#list").append(_template);

  }

});