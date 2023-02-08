import { toPng } from 'html-to-image';



var node = document.getElementById('my-node');

htmlToImage.toPng(node)
  .then(function (dataUrl) {
    download(dataUrl, 'my-node.png');
  });