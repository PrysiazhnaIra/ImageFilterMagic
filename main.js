let image = null;
let originalImage = null;
let canva = document.getElementById("canva");

// Функція для завантаження зображення
function loadImage() {
  let file = document.getElementById("file");
  image = new SimpleImage(file);
  originalImage = new SimpleImage(file);
  image.drawTo(canva);
} 

//Функція для застосування червоного фільтру
function doRed() {
  if (originalImage == null || !originalImage.complete()) {
    alert("Original image not loaded");
    return;
  }

 for (let pixel of image.values()) {
  //  pixel.setRed(256);
  let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
  if (avg < 128) {
    pixel.setRed(avg * 2);
    pixel.setGreen(0);
    pixel.setBlue(0);
  } else {
    pixel.setRed(255);
    pixel.setGreen(avg * 2 - 255);
    pixel.setBlue(avg *2 - 255);
  }
 } 
 image.drawTo(canva);
}

//Функція для застосування відтінків сірого
function doGreyScale() {
  if (originalImage == null || !originalImage.complete()) {
    alert("Original image not loaded");
    return;
  }
    for(let pixel of image.values()) {
        let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
      }
      image.drawTo(canva);
}

//Функція для застосування райдужного фільтру
function doRainbow() {
  if (originalImage == null || !originalImage.complete()) {
    alert("Original image not loaded");
    return;
  }

  let height = image.getHeight();
  for (let pixel of image.values()) {
    let y = pixel.getY();
    let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if(y < height / 7) {
        //red
        turnPixelRed(pixel, avg);
    } else if (y < height * 2 / 7) {
        // Orange
        turnPixelOrange(pixel, avg);
      } else if (y < height * 3 / 7) {
        // Yellow
        turnPixelYellow(pixel, avg);
      } else if (y < height * 4 / 7) {
        // Green
        turnPixelGreen(pixel, avg);
      } else if (y < height * 5 / 7) {
        // Blue
        turnPixelBlue(pixel, avg);
      } else if (y < height * 6 / 7) {
        // Indigo
        turnPixelIndigo(pixel, avg);
      } else {
        // Violet
        turnPixelViolet(pixel, avg);
      }
    }
    image.drawTo(canva);
  }
  
  function turnPixelRed(pixel, avg) {
    if (avg < 128) {
      pixel.setRed(2 * avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(2 * avg - 255);
    }
  }

  function turnPixelOrange(pixel, avg) {
    if (avg < 128) {
      pixel.setRed(2 * avg);
      pixel.setGreen(0.8 * avg);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(1.2 * avg - 51);
      pixel.setBlue(2 * avg - 255);
    }
  }
  
  function turnPixelYellow(pixel, avg) {
    if (avg < 128) {
      pixel.setRed(2 * avg);
      pixel.setGreen(2 * avg);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(255);
      pixel.setBlue(2 * avg - 255);
    }
  }
  
  function turnPixelGreen(pixel, avg) {
    if (avg < 128) {
      pixel.setRed(0);
      pixel.setGreen(2 * avg);
      pixel.setBlue(0);
    } else {
      pixel.setRed(2 * avg - 255);
      pixel.setGreen(255);
      pixel.setBlue(2 * avg - 255);
    }
  }
  
  function turnPixelBlue(pixel, avg) {
    if (avg < 128) {
      pixel.setRed(0);
      pixel.setGreen(0);
      pixel.setBlue(2 * avg);
    } else {
      pixel.setRed(2 * avg - 255);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(255);
    }
  }
  
  function turnPixelIndigo(pixel, avg) {
    if (avg < 128) {
      pixel.setRed(0.8 * avg);
      pixel.setGreen(0);
      pixel.setBlue(2 * avg);
    } else {
      pixel.setRed(1.2 * avg - 51);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(255);
    }
  }
  
  function turnPixelViolet(pixel, avg) {
    if (avg < 128) {
      pixel.setRed(1.6 * avg);
      pixel.setGreen(0);
      pixel.setBlue(1.6 * avg);
    } else {
      pixel.setRed(0.4 * avg + 153);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(0.4 * avg + 153);
    }
  }

// Функція для встановлення сепії
function applySepia() {
  if (originalImage == null || !originalImage.complete()) {
    alert("Original image not loaded");
    return;
  }

  for (let pixel of image.values()) {
    let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(avg + 100 > 255 ? 255 : avg + 100);
    pixel.setGreen(avg + 50 > 255 ? 255 : avg + 50);
    pixel.setBlue(avg);
  }

  image.drawTo(canva);
}

// Функція для встановлення ефекту "негативу"
function applyNegative() {
  if (originalImage == null || !originalImage.complete()) {
    alert("Original image not loaded");
    return;
  }

  for (let pixel of image.values()) {
    pixel.setRed(255 - pixel.getRed());
    pixel.setGreen(255 - pixel.getGreen());
    pixel.setBlue(255 - pixel.getBlue());
  }
  image.drawTo(canva);
}

//Функція для встановлення ефекту "blur"
function applyBlur() {
  if (originalImage == null || !originalImage.complete()) {
    alert("Original image not loaded");
    return;
  }

  let output = new SimpleImage(image.getWidth(), image.getHeight());
  for (let pixel of image.values()) {
    let x = pixel.getX();
    let y = pixel.getY();
    if (Math.random() > 0.5) {
      let dx = Math.floor(Math.random() * 10);
      let dy = Math.floor(Math.random() * 10);
      let newX = ensureInBounds(x + dx, image.getWidth());
      let newY = ensureInBounds(y + dy, image.getHeight());
      let newPixel = image.getPixel(newX, newY);
      output.setPixel(x, y, newPixel);
    } else {
      output.setPixel(x, y, pixel);
    }
  }
  output.drawTo(canva);
}

function ensureInBounds(value, max) {
  if (value < 0) return 0;
  if (value >= max) return max - 1;
  return value;
}
  
//Функція для скидання зображення до оригінального стану
function reset() {
  if (originalImage == null || !originalImage.complete()) {
    alert("Original image not loaded");
    return;
  }
  if (originalImage) {
    originalImage.drawTo(canva);
  }
  
}

//Функція для встановлення ефекту "Solarize"
function applySolarize() {
  if (originalImage == null || !originalImage.complete()) {
    alert("Original image not loaded");
    return;
  }

  for (let pixel of image.values()) {
    pixel.setRed(pixel.getRed() > 128 ? 255 - pixel.getRed() : pixel.getRed());
    pixel.setGreen(pixel.getGreen() > 128 ? 255 - pixel.getGreen() : pixel.getGreen());
    pixel.setBlue(pixel.getBlue() > 128 ? 255 - pixel.getBlue() : pixel.getBlue());
  }
  image.drawTo(canva);
}

//Функція для встановлення ефекту "Posterize"
function applyPosterize() {
  if (originalImage == null || !originalImage.complete()) {
    alert("Original image not loaded");
    return;
  }

  let levels = 5;
  for (let pixel of image.values()) {
    pixel.setRed(Math.floor(pixel.getRed() / 256 * levels) * (256 / levels));
    pixel.setGreen(Math.floor(pixel.getGreen() / 256 * levels) * (256 / levels));
    pixel.setBlue(Math.floor(pixel.getBlue() / 256 * levels) * (256 / levels));
  }
  image.drawTo(canva);
}