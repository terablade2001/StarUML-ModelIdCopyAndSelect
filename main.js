let copiedElementId

function writeToClipboard(text) { // ►[AAAAAAGKEmqT4myHQr8=]
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

function readFromClipboard() { // ►[AAAAAAGKEm0onmzB6eY=]
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


function copyModelId () { // ►[AAAAAAGKEmXE1WxPrIQ=]
  let selected = app.selections.getSelected(); // ►[AAAAAAGKEmZnCmxi5z8=]
  if (typeof(selected) == 'undefined') { // ►[AAAAAAGKEmarnGxvsHM=]
    window.alert('No element has been selected!'); // ►[AAAAAAGKEmdIOWx7WNM=]
    return -1;
  }
  
  var err = writeToClipboard(selected._id); // ►[AAAAAAGKEmqT4myHQr8=]
  if (err != 0) { // ►[AAAAAAGKEmuXOmylTXQ=]
      app.toast.error("Failed to copy selected id to clipboard!"); // ►[AAAAAAGKEmdIOWx7WNM=]
    return -1;
  }
  app.toast.info("Id [ "+selected._id+" ] copied to clipboard.") // ►[AAAAAAGKEnPloW2p+So=]
  return 0;
}

function selectModelById () { // ►[AAAAAAGKEmXyvmxY9W0=]
  var err = readFromClipboard(); // ►[AAAAAAGKEm0onmzB6eY=]
  if (err != 0) { // ►[AAAAAAGKEm3EK2zQQ6M=]
    app.toast.error("Failed to read selected id from clipboard!"); // ►[AAAAAAGKEoQA+24U5RA=]
    return -1;
  }
  let modelById = app.repository.get(copiedElementId) // ►[AAAAAAGKEoTEIm4j0DE=]
  if (typeof(modelById) == "undefined") { // ►[AAAAAAGKEoYutG4w/SE=]
    app.toast.error("Model with id [ "+copiedElementId+" ] was not found!") // ►[AAAAAAGKEoQA+24U5RA=]
    return -1;
  }

  app.selections.deselectAll(); // ►[AAAAAAGKEobrs249/2A=]
  app.selections.selectModel(modelById); // ►[AAAAAAGKEofCcG5YpqI=]
  app.modelExplorer.select(modelById, true); // ►[AAAAAAGKEohwfW5j31o=]
  app.toast.info("Model with id [ "+modelById._id+ "] selected."); // ►[AAAAAAGKEnPloW2p+So=]
  return 0;
}


function init () { // ► [AAAAAAGKEmNUc2wtwRk=]
  copiedElementId = ""
  app.commands.register('ModelIdCopyAndSelect:copyModelId', copyModelId)
  app.commands.register('ModelIdCopyAndSelect:selectModelById', selectModelById)
}

exports.init = init;