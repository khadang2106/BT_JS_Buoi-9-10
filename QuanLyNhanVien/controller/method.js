function getEle(id) {
  return document.getElementById(id);
}

function showError(id, sentence) {
  getEle(id).innerHTML = sentence;
  getEle(id).style.display = 'block';
}

function hideError(id, sentence) {
  getEle(id).innerHTML = sentence;
  getEle(id).style.display = 'none';
}
