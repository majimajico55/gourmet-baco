/** =======================
 * URLパラメータ取得処理
 * 
 * @param  name {string} パラメータのキー文字列
 * @param  url {url} 対象のURL文字列（任意） * 
 * @return  URLパラメータ * 
 * ======================= */
 const getParams = function(name, url) {

  if (!url) url = window.location.href;

  // URLパラメータから指定の値を取得する
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results =  regex.exec(url);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return '';
  } 

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/** =======================
 * データ取得処理
 * 
 * @param  url {url} 対象のURL文字列 * 
 * @return  取得したファイル内容 * 
 * ======================= */
 const getData = async function(url) {

  // 一覧データ取得
  const fileData = await fetch(url)
    .then(response => {

      if (response.status >= 400) {
        return null;
      }

      return response.text();
    })
    .catch(error => {
      console.error(error);
      return null;
    });

  if (!fileData) {
    return null;
  }

  return JSON.parse(fileData);
};

$(function() {
  window.onerror = function(errorMessage, filePath, rowNumber, columnNumber, errorObject) {
    console.error(errorMessage, filePath, rowNumber, columnNumber, errorObject);
    window.location.href = "error.html";
  };
})
