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
  }
  document.body.removeChild(textarea);
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
  }
  copiedElementId = textarea.value
  document.body.removeChild(textarea);
}


function copyModelId () {
  let selected = app.selections.getSelected()
  if (typeof(selected) == 'undefined') {
    window.alert('No element has been selected!')
    return
  }
  
  writeToClipboard(selected._id)
  app.toast.info("Id [ "+selected._id+" ] copied to clipboard.")
}

function selectModelById () {
  readFromClipboard()
  let modelById = app.repository.get(copiedElementId)
  if (modelById == "undefined") {
    app.toast.info("ERROR: ** Model with id [ "+copiedElementId+" ] was not found! **")
    return
  }

  app.selections.deselectAll()  
  app.selections.selectModel(modelById)
  app.toast.info("► Model with id [ "+modelById._id+ "] selected.")
}


function init () {
  copiedElementId = ""
  app.commands.register('ModelIdCopyAndSelect:copyModelId', copyModelId)
  app.commands.register('ModelIdCopyAndSelect:selectModelById', selectModelById)
}

exports.init = init;