let copiedElementId

function writeToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);

  textarea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Unable to copy text to clipboard:', err);
    document.body.removeChild(textarea);
    return -1;
  }
  document.body.removeChild(textarea);
  return 0;
}

function readFromClipboard() {
  const textarea = document.createElement('textarea');
  textarea.value = "";
  document.body.appendChild(textarea);

  textarea.select();
  try {
    document.execCommand('paste');
  } catch (err) {
    console.error('Unable to copy text from clipboard:', err);
    copiedElementId='';
    document.body.removeChild(textarea);
    return -1;
  }
  copiedElementId = textarea.value;
  document.body.removeChild(textarea);
  return 0;
}


function copyModelId () {
  let selected = app.selections.getSelected();
  if (typeof(selected) == 'undefined') {
    window.alert('No element has been selected!');
    return -1;
  }
  
  var err = writeToClipboard(selected._id);
  if (err != 0) {
    app.toast.error("Failed to copy selected id to clipboard!");
    return -1;
  }
  app.toast.info("Id [ "+selected._id+" ] copied to clipboard.")
  return 0;
}

function selectModelById () {
  var err = readFromClipboard();
  if (err != 0) {
    app.toast.error("Failed to read selected id from clipboard!");
    return -1;
  }
  let modelById = app.repository.get(copiedElementId)
  if (typeof(modelById) == "undefined") {
    app.toast.error("Model with id [ "+copiedElementId+" ] was not found!")
    return -1;
  }

  app.selections.deselectAll();
  app.selections.selectModel(modelById);
  app.toast.info("► Model with id [ "+modelById._id+ "] selected.");
  app.modelExplorer.select(modelById, true);
  return 0;
}


function init () {
  copiedElementId = ""
  app.commands.register('ModelIdCopyAndSelect:copyModelId', copyModelId)
  app.commands.register('ModelIdCopyAndSelect:selectModelById', selectModelById)
}

exports.init = init;